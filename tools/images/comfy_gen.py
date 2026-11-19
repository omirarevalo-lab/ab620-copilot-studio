"""Generate an image with the local ComfyUI server (SDXL base 1.0). Free, runs on the local GPU.

Start the server first:  python main.py   # run from your ComfyUI folder   (http://127.0.0.1:8188)
Usage: python tools/images/comfy_gen.py "prompt" -o out.png [--neg "..."] [--w 1344 --h 768] [--steps 28] [--seed 1]
Good for illustrations/covers. Not for diagrams or product screens (models invent text and UI).
"""
import argparse, json, random, time, urllib.request, urllib.parse

API = 'http://127.0.0.1:8188'


def call(path, data=None):
    req = urllib.request.Request(API + path, data=json.dumps(data).encode() if data is not None else None,
                                 headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('prompt')
    ap.add_argument('-o', '--out', default='comfy.png')
    ap.add_argument('--neg', default='text, letters, watermark, logo, blurry, lowres, deformed')
    ap.add_argument('--w', type=int, default=1344)
    ap.add_argument('--h', type=int, default=768)
    ap.add_argument('--steps', type=int, default=28)
    ap.add_argument('--cfg', type=float, default=6.5)
    ap.add_argument('--seed', type=int, default=None)
    a = ap.parse_args()
    seed = a.seed if a.seed is not None else random.randint(1, 2**31)
    wf = {
        '1': {'class_type': 'CheckpointLoaderSimple', 'inputs': {'ckpt_name': 'sd_xl_base_1.0.safetensors'}},
        '2': {'class_type': 'CLIPTextEncode', 'inputs': {'text': a.prompt, 'clip': ['1', 1]}},
        '3': {'class_type': 'CLIPTextEncode', 'inputs': {'text': a.neg, 'clip': ['1', 1]}},
        '4': {'class_type': 'EmptyLatentImage', 'inputs': {'width': a.w, 'height': a.h, 'batch_size': 1}},
        '5': {'class_type': 'KSampler', 'inputs': {'model': ['1', 0], 'positive': ['2', 0], 'negative': ['3', 0], 'latent_image': ['4', 0],
                                                   'seed': seed, 'steps': a.steps, 'cfg': a.cfg, 'sampler_name': 'dpmpp_2m', 'scheduler': 'karras', 'denoise': 1.0}},
        '6': {'class_type': 'VAEDecode', 'inputs': {'samples': ['5', 0], 'vae': ['1', 2]}},
        '7': {'class_type': 'SaveImage', 'inputs': {'images': ['6', 0], 'filename_prefix': 'ab620'}},
    }
    pid = json.loads(call('/prompt', {'prompt': wf}))['prompt_id']
    t0 = time.time()
    while True:
        h = json.loads(call('/history/' + pid))
        if pid in h and h[pid].get('outputs'):
            img = h[pid]['outputs']['7']['images'][0]
            q = urllib.parse.urlencode({'filename': img['filename'], 'subfolder': img['subfolder'], 'type': img['type']})
            open(a.out, 'wb').write(call('/view?' + q))
            print('saved', a.out, 'seed', seed, '%.0fs' % (time.time() - t0))
            return
        if pid in h and h[pid].get('status', {}).get('status_str') == 'error':
            raise SystemExit('ComfyUI error: ' + json.dumps(h[pid]['status'])[:800])
        time.sleep(2)


if __name__ == '__main__':
    main()
