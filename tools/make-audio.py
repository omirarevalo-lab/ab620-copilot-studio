"""Narration for every course topic with Kokoro TTS (local, free, Apache-2.0).

For each topic: audio/<id>.mp3 (mono, 48 kbps) with all scenes joined, plus audio/<id>.json
{id, hash, voice, speed, duration, scenes:[{start, end}]} with the measured time of each scene.
Also writes data/audio-index.js (window.AB620_AUDIO) so the app knows which topics have audio.
Idempotent: a topic is skipped when the hash of its narration (+ voice, speed) did not change.

Setup (once):  python -m venv .venv-tts && .venv-tts/Scripts/python -m pip install kokoro-onnx soundfile
               model files in tools/tts-models/ (kokoro-v1.0.onnx, voices-v1.0.bin from github.com/thewh1teagle/kokoro-onnx releases)
Usage:         .venv-tts/Scripts/python tools/make-audio.py [--only F01,L12] [--voice af_heart] [--speed 1.0] [--force]
"""
import argparse, hashlib, json, os, subprocess, sys, tempfile
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS = os.path.join(ROOT, 'tools', 'tts-models')
AUDIO = os.path.join(ROOT, 'audio')
GAP = 0.6  # seconds of silence between scenes

def load_topics(from_en=False):
    if from_en:  # translation in progress: read tools/en/en/<id>.json directly
        d = os.path.join(ROOT, 'tools', 'en', 'en')
        return [{'id': t['id'], 'say': [s['say'] for s in t['scenes']]}
                for t in (json.load(open(os.path.join(d, f), encoding='utf-8')) for f in sorted(os.listdir(d)) if f[0] in 'FL' and f.endswith('.json'))]
    # CERT=ab400 reads data/ab400/ (default ab620 -> data/); course files load in name order
    js =("global.window={};const fs=require('fs'),d=process.env.CERT&&process.env.CERT!=='ab620'?'./data/'+process.env.CERT+'/':'./data/';"
          "for(const f of fs.readdirSync(d).filter(f=>/^course-m[\\w-]*\\.js$/.test(f)).sort())require(d+f);"
          "process.stdout.write(JSON.stringify(window.AB620_COURSE.map(t=>({id:t.id,say:t.scenes.map(s=>s.say)}))))")
    out = subprocess.run(['node', '-e', js], cwd=ROOT, capture_output=True, text=True, encoding='utf-8', check=True)
    return json.loads(out.stdout)

def write_index(ids):
    idx = {}
    for f in sorted(os.listdir(AUDIO)):
        if f.endswith('.json') and f[:-5] in ids and os.path.exists(os.path.join(AUDIO, f[:-5] + '.mp3')):
            m = json.load(open(os.path.join(AUDIO, f), encoding='utf-8'))
            idx[m['id']] = {'src': 'audio/' + m['id'] + '.mp3', 'duration': m['duration'], 'scenes': m['scenes']}
    cert = os.environ.get('CERT', 'ab620')
    with open(os.path.join(ROOT, 'data', *([] if cert == 'ab620' else [cert]), 'audio-index.js'), 'w', encoding='utf-8') as fh:
        fh.write('// Narration index (Kokoro TTS). Built by tools/make-audio.py; do not edit.\n')
        fh.write('window.AB620_AUDIO = ' + json.dumps(idx, separators=(',', ':')) + ';\n')
    return len(idx)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--only', default='')
    ap.add_argument('--voice', default='af_heart')
    ap.add_argument('--speed', type=float, default=1.0)
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--from-en', action='store_true', help='read tools/en/en/*.json instead of data/course-*.js')
    a = ap.parse_args()
    os.makedirs(AUDIO, exist_ok=True)
    only = set(x.strip() for x in a.only.split(',') if x.strip())
    topics = [t for t in load_topics(a.from_en) if not only or t['id'] in only]
    kokoro = None
    for t in topics:
        mp3, meta = os.path.join(AUDIO, t['id'] + '.mp3'), os.path.join(AUDIO, t['id'] + '.json')
        h = hashlib.sha1(json.dumps([a.voice, a.speed, t['say']]).encode('utf-8')).hexdigest()[:12]
        if not a.force and os.path.exists(mp3) and os.path.exists(meta):
            try:
                if json.load(open(meta, encoding='utf-8')).get('hash') == h:
                    print(t['id'], 'unchanged'); continue
            except Exception:
                pass
        if kokoro is None:
            kokoro = Kokoro(os.path.join(MODELS, 'kokoro-v1.0.onnx'), os.path.join(MODELS, 'voices-v1.0.bin'))
        parts, scenes, cur, sr = [], [], 0.0, 24000
        for i, text in enumerate(t['say']):
            samples, sr = kokoro.create(text, voice=a.voice, speed=a.speed, lang='en-us')
            dur = len(samples) / sr
            scenes.append({'start': round(cur, 2), 'end': round(cur + dur, 2)})
            parts.append(samples)
            cur += dur
            if i < len(t['say']) - 1:
                parts.append(np.zeros(int(GAP * sr), dtype=samples.dtype)); cur += GAP
        wav = os.path.join(tempfile.gettempdir(), 'ab620-' + t['id'] + '.wav')
        sf.write(wav, np.concatenate(parts), sr)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-ac', '1', '-b:a', '48k', mp3], check=True)
        os.remove(wav)
        with open(meta, 'w', encoding='utf-8') as fh:
            json.dump({'id': t['id'], 'hash': h, 'voice': a.voice, 'speed': a.speed, 'duration': round(cur, 2), 'scenes': scenes}, fh)
        print(t['id'], f'{cur:.1f}s', f'{os.path.getsize(mp3) / 1e6:.2f} MB', flush=True)
    print('index:', write_index(set(t['id'] for t in load_topics(a.from_en))), 'topics with audio')

if __name__ == '__main__':
    sys.exit(main())
