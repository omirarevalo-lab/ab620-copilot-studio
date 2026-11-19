"""Sentence-level narration for a topic video (Kokoro, local and free).

Writes video/<id>/narration.mp3 and video/<id>/beats.json:
  {id, duration, scenes: [{title, start, end, sentences: [{text, start, end}]}]}
Each sentence is synthesized on its own, so the video can animate exactly when a sentence starts.

Usage: .venv-tts/Scripts/python tools/video/narrate.py F01 [--voice af_heart] [--speed 1.0]
"""
import argparse, json, os, re, subprocess, sys, tempfile
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODELS = os.path.join(ROOT, 'tools', 'tts-models')
LEAD, SENT_GAP, SCENE_GAP, TAIL = 0.8, 0.28, 0.9, 1.2  # seconds of silence


def load_topic(tid):
    # CERT=ab400 reads data/ab400/ (default ab620 -> data/); course files load in name order
    js = ("global.window={};const fs=require('fs'),d=process.env.CERT&&process.env.CERT!=='ab620'?'./data/'+process.env.CERT+'/':'./data/';"
          "for(const f of fs.readdirSync(d).filter(f=>/^course-m[\\w-]*\\.js$/.test(f)).sort())require(d+f);"
          "process.stdout.write(JSON.stringify(window.AB620_COURSE.find(t=>t.id===%s)||null))" % json.dumps(tid))
    out = subprocess.run(['node', '-e', js], cwd=ROOT, capture_output=True, text=True, encoding='utf-8', check=True)
    t = json.loads(out.stdout)
    if not t:
        sys.exit('topic not found: ' + tid)
    return t


def sentences(text):
    return [s.strip() for s in re.split(r'(?<=[.!?])\s+', text.strip()) if s.strip()]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('id')
    ap.add_argument('--voice', default='af_heart')
    ap.add_argument('--speed', type=float, default=1.0)
    a = ap.parse_args()
    t = load_topic(a.id)
    out_dir = os.path.join(ROOT, 'video', a.id)
    os.makedirs(out_dir, exist_ok=True)
    k = Kokoro(os.path.join(MODELS, 'kokoro-v1.0.onnx'), os.path.join(MODELS, 'voices-v1.0.bin'))
    sr, parts, cur, scenes = 24000, [], 0.0, []

    def silence(sec):
        nonlocal cur
        parts.append(np.zeros(int(sec * sr), dtype=np.float32)); cur += sec

    silence(LEAD)
    for si, sc in enumerate(t['scenes']):
        if si:
            silence(SCENE_GAP)
        s_start, sents = cur, []
        for j, text in enumerate(sentences(sc['say'])):
            if j:
                silence(SENT_GAP)
            samples, sr = k.create(text, voice=a.voice, speed=a.speed, lang='en-us')
            samples = np.asarray(samples, dtype=np.float32)
            sents.append({'text': text, 'start': round(cur, 3), 'end': round(cur + len(samples) / sr, 3)})
            parts.append(samples); cur += len(samples) / sr
        scenes.append({'title': sc['title'], 'start': round(s_start, 3), 'end': round(cur, 3), 'sentences': sents})
        print(a.id, si, sc['title'], '%.1fs' % (cur - s_start), flush=True)
    silence(TAIL)
    wav = os.path.join(tempfile.gettempdir(), 'narr-%s.wav' % a.id)
    sf.write(wav, np.concatenate(parts), sr)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-ac', '1', '-b:a', '96k', os.path.join(out_dir, 'narration.mp3')], check=True)
    os.remove(wav)
    beats = {'id': a.id, 'title': t['title'], 'voice': a.voice, 'speed': a.speed, 'duration': round(cur, 3), 'scenes': scenes}
    json.dump(beats, open(os.path.join(out_dir, 'beats.json'), 'w', encoding='utf-8'), indent=1)
    print('duration %.1fs -> %s' % (cur, out_dir))


if __name__ == '__main__':
    main()
