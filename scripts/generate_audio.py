#!/usr/bin/env python3
"""
generate_audio.py — Generate audio for Akha Bhagat verses via Sarvam TTS
and write timing data for karaoke sync.

Usage:
    export SARVAM_API_KEY=your_key_here
    python scripts/generate_audio.py

Output:
    public/verses/akha-bhagat/audio/poem-1.mp3
    public/verses/akha-bhagat/audio/poem-2.mp3
    public/verses/akha-bhagat/audio/timings.json
"""

import base64
import json
import os
import time
from pathlib import Path

try:
    import requests
except ImportError:
    raise SystemExit("requests not installed — run: pip install requests")

# ── Config ────────────────────────────────────────────────────────────────────
API_KEY   = os.environ.get("SARVAM_API_KEY", "")
API_URL   = "https://api.sarvam.ai/text-to-speech/stream"
OUT_DIR   = Path(__file__).parent.parent / "public" / "verses" / "akha-bhagat" / "audio"

# Gujarati TTS speaking rate — chars per second at pace 0.94
CHARS_PER_SECOND = 9.5
PAUSE_BETWEEN_LINES = 0.32   # seconds of silence between lines

# ── Poem data ─────────────────────────────────────────────────────────────────
POEMS: dict[int, list[str]] = {
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


def estimate_timings(lines: list[str], total_seconds: float) -> list[dict]:
    """Apportion total_seconds across lines by character count."""
    char_counts = [max(1, len(ln.strip())) for ln in lines]
    total_chars  = sum(char_counts)
    timings, cursor = [], 0.0
    for i, n in enumerate(char_counts):
        dur = (n / total_chars) * total_seconds
        timings.append({"line": i, "start": round(cursor, 3), "end": round(cursor + dur, 3)})
        cursor += dur
    if timings:
        timings[-1]["end"] = round(total_seconds, 3)
    return timings


def mp3_duration(path: Path) -> float:
    """Best-effort MP3 duration. Falls back to char-based estimate."""
    # Try mutagen (optional)
    try:
        from mutagen.mp3 import MP3  # type: ignore
        return MP3(str(path)).info.length
    except Exception:
        pass
    # Rough estimate from file size: 128 kbps → 16 000 bytes/sec
    size = path.stat().st_size
    return size / 16_000


def call_sarvam(text: str, out_path: Path) -> bool:
    """Stream one TTS call to out_path. Returns True on success."""
    headers = {
        "api-subscription-key": API_KEY,
        "Content-Type": "application/json",
    }
    payload = {
        "text": text,
        "target_language_code": "gu-IN",
        "speaker": "roopa",
        "model": "bulbul:v3",
        "pace": 0.94,
        "speech_sample_rate": 22050,
        "output_audio_codec": "mp3",
        "enable_preprocessing": True,
    }
    try:
        with requests.post(API_URL, headers=headers, json=payload, stream=True, timeout=60) as r:
            if not r.ok:
                print(f"  ✗ {r.status_code} {r.reason}: {r.text[:300]}")
                return False
            with open(out_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
        return True
    except Exception as e:
        print(f"  ✗ Request error: {e}")
        return False


def process_poem(poem_id: int, lines: list[str]) -> dict:
    print(f"\n── Poem {poem_id} ({len(lines)} lines) ──")
    out_mp3 = OUT_DIR / f"poem-{poem_id}.mp3"

    if not API_KEY:
        print("  ⚠ SARVAM_API_KEY not set — writing estimated timings only.")
        est_total = sum(max(1, len(l)) / CHARS_PER_SECOND + PAUSE_BETWEEN_LINES for l in lines)
        return {str(poem_id): estimate_timings(lines, est_total)}

    # Send whole poem as one call (newlines become natural pauses)
    full_text = "\n".join(lines)
    print(f"  → Calling Sarvam TTS ({len(full_text)} chars)…")
    ok = call_sarvam(full_text, out_mp3)

    if ok:
        duration = mp3_duration(out_mp3)
        print(f"  ✓ {out_mp3.name}  ({duration:.1f}s)")
        timings = estimate_timings(lines, duration)
    else:
        print("  ⚠ Falling back to estimated timings (no audio file written).")
        est_total = sum(max(1, len(l)) / CHARS_PER_SECOND + PAUSE_BETWEEN_LINES for l in lines)
        timings = estimate_timings(lines, est_total)

    return {str(poem_id): timings}


def main():
    if not API_KEY:
        print("SARVAM_API_KEY not set — only timing estimates will be written.\n"
              "Set it with:  export SARVAM_API_KEY=your_key_here")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output: {OUT_DIR}")

    all_timings: dict = {}
    for poem_id, lines in POEMS.items():
        result = process_poem(poem_id, lines)
        all_timings.update(result)
        time.sleep(0.5)   # brief pause between poems

    timings_path = OUT_DIR / "timings.json"
    timings_path.write_text(json.dumps(all_timings, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n✓ timings.json written")
    print("\nNext steps:")
    print("  git add public/verses/akha-bhagat/audio/")
    print("  git commit -m 'Add Sarvam TTS audio for Akha Bhagat'")
    print("  git push")


if __name__ == "__main__":
    main()
