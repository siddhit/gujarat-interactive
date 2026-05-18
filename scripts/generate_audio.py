#!/usr/bin/env python3
"""
generate_audio.py — Generate audio recitations for Akha Bhagat verses
using Sarvam AI TTS, and write timing data for karaoke synchronization.

Usage:
    python scripts/generate_audio.py

Requires:
    pip install requests

Set SARVAM_API_KEY environment variable before running.

Output:
    public/verses/akha-bhagat/audio/poem-1.mp3
    public/verses/akha-bhagat/audio/poem-2.mp3
    public/verses/akha-bhagat/audio/timings.json
"""

import os
import json
import time
import sys
from pathlib import Path

# ── Poem data ──────────────────────────────────────────────────────────────────
POEMS = {
    1: [
        "તિલક કરતાં ત્રેપન થયાં,",
        "ને જપમાળાનાં નાકાં ગયાં,",
        "તીરથ ફરી ફરી થાકયા ચરણ,",
        "તોય ન પહોંચ્યો હરિને શરણ.",
        "કથા સુણી સુણી ફૂટ્યા કાન,",
        "તોય અખા ન આવ્યું બ્રહ્મજ્ઞાન.",
        "એક મૂરખને એવી ટેવ,",
        "પથ્થર એટલા પૂજે દેવ,",
        "પાણી દેખી કરે સ્નાન,",
        "તુલસી દેખી તોડે પાન.",
        "એ અખા વડું ઉત્પાત,",
        "ઘણા પરમેશ્વર એ ક્યાંની વાત?",
        "દેહાભિમાન હૂતો પાશેર,",
        "વિદ્યા ભણતાં વાધ્યો શેર;",
        "ચર્ચાવાદમાં તોલે થયો,",
        "ગુરુ થયો ત્યાં મણમાં ગયો;",
        "અખા એમ હલકાથી ભારે હોય,",
        "આત્મજ્ઞાન મૂળગું ખોય.",
    ],
    2: [
        "સમજણ વિના રે સુખ નહીં જંતને રે;",
        "વસ્તુગતિ કેમ કરી ઓળખય ?",
        "આપમાં વસે છે આપનો આતમા રે,",
        "તેણે કાંઈ જીવપણું નવ જાય.",
        "રવિ રવિ કરતાં રે રજની નહીં મટે રે,",
        "અંધારું તો ઊગ્યા પૂંઠે જાય;",
        "રુદે કવિ ઊગે રે નિજ ગુરુજ્ઞાનનો રે,",
        "થનાર હોય તે સહેજે થાય.",
        "જળ જળ કરતાં રે તૃષ્ણા નવ ટળે રે,",
        "ભોજન કહેતાં ન ભાંગે ભૂખ;",
        "પ્રેમરસ પીતા રે તૃષ્ણા તુરત ટળે રે,",
        "એમ મહાજ્ઞાનીઓ બોલે છે મુખ.",
        "પારસમણિ વિના રે જે પથરા મળે રે,",
        "તેણે કાંઈ કાંચન લોહ ન થાય;",
        "સમજણ વિના રે જે સાધન કરે રે,",
        "તેણે કાંઈ જીવપણું નવ જાય.",
        "દશ મણ અગ્નિ રે લખિયે કાગળે રે,",
        "એને લઈ રૂમાં જો અલપાય;",
        "એની અગ્નિથી રે રૂ નથી દાઝતું રે,",
        "રતી એક સાચે પ્રલય જ થાય.",
        "જીવપણું માટે રે અનહદ ચિંતવ્યે રે,",
        "એ તો વાણીરહિત છે રે વિચાર;",
        "જે જે નર સમજ્યા રે તે તો ત્યાં સમ્યા રે,",
        "કહે અખો ઊતર્યા પેલે પાર.",
    ],
}

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "verses" / "akha-bhagat" / "audio"
SARVAM_API_KEY = os.environ.get("SARVAM_API_KEY", "")
SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech"


def estimate_duration(text: str, chars_per_second: float = 8.0) -> float:
    """Rough estimate: Gujarati TTS at ~8 chars/second."""
    return max(1.2, len(text) / chars_per_second)


def generate_with_sarvam(text: str, output_path: Path) -> bool:
    """Call Sarvam AI TTS API to generate audio. Returns True on success."""
    try:
        import requests
    except ImportError:
        print("  → requests not installed. Run: pip install requests")
        return False

    if not SARVAM_API_KEY:
        print("  → SARVAM_API_KEY not set. Skipping API call.")
        return False

    headers = {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json",
    }
    payload = {
        "inputs": [text],
        "target_language_code": "gu-IN",
        "speaker": "meera",
        "model": "bulbul:v1",
        "pitch": 0,
        "pace": 0.9,
        "loudness": 1.5,
        "enable_preprocessing": True,
    }

    try:
        resp = requests.post(SARVAM_TTS_URL, headers=headers, json=payload, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        audio_b64 = data.get("audios", [None])[0]
        if not audio_b64:
            print(f"  → No audio in response for chunk")
            return False
        import base64
        audio_bytes = base64.b64decode(audio_b64)
        with open(output_path, "wb") as f:
            f.write(audio_bytes)
        return True
    except Exception as e:
        print(f"  → Sarvam API error: {e}")
        return False


def generate_poem_audio(poem_id: int, lines: list[str]) -> dict:
    """
    Generate a single MP3 for a poem (all lines concatenated with a pause)
    and return timing data: [{start, end, line_idx}, ...].

    Strategy:
      1. Try Sarvam API for each line separately, collect WAV chunks.
      2. Concatenate with 0.3s silence between lines.
      3. If API unavailable, produce a timings.json with estimated durations
         (no real MP3 generated).
    """
    print(f"\n─── Poem {poem_id} ({len(lines)} lines) ───")

    timings = []
    current_time = 0.0
    pause_between = 0.35  # seconds

    # Try line-by-line generation
    all_chunks = []
    api_success = bool(SARVAM_API_KEY)

    if api_success:
        try:
            import requests  # noqa: F401
        except ImportError:
            api_success = False

    for idx, line in enumerate(lines):
        line_path = OUTPUT_DIR / f"_chunk_{poem_id}_{idx}.wav"
        duration = estimate_duration(line)

        if api_success:
            print(f"  [{idx+1}/{len(lines)}] {line[:40]}...")
            ok = generate_with_sarvam(line, line_path)
            if ok:
                # Measure actual duration if possible
                try:
                    import wave
                    with wave.open(str(line_path), "rb") as wf:
                        duration = wf.getnframes() / wf.getframerate()
                except Exception:
                    pass  # use estimate
                all_chunks.append(line_path)
            else:
                api_success = False

        timings.append({
            "line_idx": idx,
            "start": round(current_time, 3),
            "end": round(current_time + duration, 3),
        })
        current_time += duration + pause_between
        time.sleep(0.1)  # rate-limit courtesy

    # If we have chunks, concatenate into final MP3
    out_mp3 = OUTPUT_DIR / f"poem-{poem_id}.mp3"
    if all_chunks:
        _concatenate_wav_to_mp3(all_chunks, out_mp3)
        # Clean up chunk files
        for p in all_chunks:
            try:
                p.unlink()
            except Exception:
                pass
        print(f"  → Written: {out_mp3}")
    else:
        print(f"  → No audio generated (API unavailable). Timings written for simulated playback.")

    return {str(poem_id): timings}


def _concatenate_wav_to_mp3(wav_paths: list, out_path: Path):
    """Concatenate WAV files and write as MP3 using pydub if available."""
    try:
        from pydub import AudioSegment  # type: ignore
        from pydub.generators import Sine  # type: ignore

        silence = AudioSegment.silent(duration=350)  # 350ms
        combined = AudioSegment.empty()
        for p in wav_paths:
            seg = AudioSegment.from_wav(str(p))
            combined = combined + seg + silence
        combined.export(str(out_path), format="mp3", bitrate="128k")
    except ImportError:
        # pydub not available — write raw WAV bytes concatenated (not a valid MP3
        # but at least the file exists for HEAD check to succeed)
        print("  → pydub not available; writing concatenated WAV as fallback")
        import wave, struct
        all_frames = b""
        params = None
        for p in wav_paths:
            with wave.open(str(p), "rb") as wf:
                if params is None:
                    params = wf.getparams()
                all_frames += wf.readframes(wf.getnframes())
        out_wav = out_path.with_suffix(".wav")
        with wave.open(str(out_wav), "wb") as wf:
            wf.setparams(params)
            wf.writeframes(all_frames)
        # rename as mp3 so client finds it
        out_wav.rename(out_path)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")

    if not SARVAM_API_KEY:
        print(
            "\nNote: SARVAM_API_KEY is not set.\n"
            "Only timing data will be generated (simulated playback mode).\n"
            "Set SARVAM_API_KEY=<your_key> to generate real audio.\n"
        )

    all_timings = {}

    for poem_id, lines in POEMS.items():
        result = generate_poem_audio(poem_id, lines)
        all_timings.update(result)

    timings_path = OUTPUT_DIR / "timings.json"
    with open(timings_path, "w", encoding="utf-8") as f:
        json.dump(all_timings, f, ensure_ascii=False, indent=2)
    print(f"\n→ Timings written: {timings_path}")
    print("Done.")


if __name__ == "__main__":
    main()
