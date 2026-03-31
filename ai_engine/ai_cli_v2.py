#!/usr/bin/env python3

import click
import yaml
import subprocess
from pathlib import Path
from slugify import slugify
import datetime
import json

def run(cmd):
    print("> " + " ".join(cmd))
    subprocess.check_call(cmd)

def load_config():
    return yaml.safe_load(open("config.yml"))

def create_song_folder(prompt, cfg):
    slug = slugify(prompt)[:50]
    ts = datetime.datetime.now().strftime("%H%M%S")
    folder = Path(cfg["output_root"]) / f"{slug}-{ts}"
    folder.mkdir(parents=True, exist_ok=True)
    return folder

@click.group()
def cli():
    pass

@cli.command()
@click.option("--prompt", required=True)
@click.option("--genre", default="hiphop")
@click.option("--tempo", default=95)
@click.option("--voice-ratio", default=0.6)
@click.option("--duration", default=45)
def generate(prompt, genre, tempo, voice_ratio, duration):

    cfg = load_config()
    song_dir = create_song_folder(prompt, cfg)

    lyrics = song_dir / "lyrics.txt"
    instrumental = song_dir / "instrumental.wav"
    base_vocal = song_dir / "base_vocal.wav"
    blended_vocal = song_dir / "blended_vocal.wav"
    final = song_dir / "final_master.mp3"

    print("Output folder:", song_dir)

    # 1 Lyrics
    txt = subprocess.check_output(
        ["ollama", "run", cfg["models"]["lyrics"], f"Write rap lyrics: {prompt}"]
    ).decode()

    lyrics.write_text(txt)

    # 2 MusicGen instrumental
    run([
        "python","-m","audiocraft.generate",
        "--model",cfg["models"]["music"],
        "--prompt",f"{genre} beat {tempo} bpm",
        "--duration",str(duration),
        "--output_dir",str(song_dir)
    ])

    # assume output saved
    for f in song_dir.glob("*.wav"):
        if "instrumental" not in str(f):
            f.rename(instrumental)

    # 3 Bark vocal
    run([
        "bark-cli",
        "--text",txt,
        "--output",str(base_vocal)
    ])

    # 4 RVC blend
    run([
        "python","rvc_infer.py",
        "--input",str(base_vocal),
        "--model1",cfg["models"]["rvc_model_a"],
        "--model2",cfg["models"]["rvc_model_b"],
        "--ratio",str(voice_ratio),
        "--output",str(blended_vocal)
    ])

    # 5 Mix
    run([
        "ffmpeg","-y",
        "-i",str(instrumental),
        "-i",str(blended_vocal),
        "-filter_complex",
        "[0:a][1:a]amix=inputs=2:duration=shortest",
        str(final)
    ])

    # metadata
    meta = {
        "prompt":prompt,
        "genre":genre,
        "tempo":tempo,
        "duration":duration,
        "audio":str(final)
    }

    (song_dir/"metadata.json").write_text(json.dumps(meta,indent=2))

    print("\nDONE:", final)

if __name__ == "__main__":
    cli()
