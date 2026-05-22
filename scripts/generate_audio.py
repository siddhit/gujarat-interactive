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
    public/verses/akha-bhagat/audio/poem-3.mp3
    public/verses/akha-bhagat/audio/poem-4.mp3
    public/verses/akha-bhagat/audio/poem-5.mp3
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
        # Stanza 1
        "તિલક કરતાં ત્રેપન થયાં,",
        "ને જપમાળાનાં નાકાં ગયાં,",
        "તીરથ ફરી ફરી થાકયા ચરણ,",
        "તોય ન પહોંચ્યો હરિને શરણ.",
        "કથા સુણી સુણી ફૂટ્યા કાન,",
        "તોય અખા ન આવ્યું બ્રહ્મજ્ઞાન.",
        # Stanza 2
        "એક મૂરખને એવી ટેવ,",
        "પથ્થર એટલા પૂજે દેવ,",
        "પાણી દેખી કરે સ્નાન,",
        "તુલસી દેખી તોડે પાન.",
        "એ અખા વડું ઉત્પાત,",
        "ઘણા પરમેશ્વર એ ક્યાંની વાત?",
        # Stanza 3
        "દેહાભિમાન હૂતો પાશેર,",
        "વિદ્યા ભણતાં વાધ્યો શેર;",
        "ચર્ચાવાદમાં તોલે થયો,",
        "ગુરુ થયો ત્યાં મણમાં ગયો;",
        "અખા એમ હલકાથી ભારે હોય,",
        "આત્મજ્ઞાન મૂળગું ખોય.",
        # Stanza 4
        "અંગ આળસ ને તપસી થયો,",
        "ઘર મેલીને વનમાં ગયો.",
        "કામબાણ ન શક્યો જાળવી,",
        "પછે રડવડતી એક આણી નવી.",
        "શ્વાન ભસાવે હીંડે છક્યો,",
        "અખા હગ્યો નહીં ને ઘર નવ રખ્યો.",
        # Stanza 5
        "અખા બ્રહ્મ છે બાધું નામ,",
        "તે મધ્યે અળગાં અળગાં ગામ.",
        "જ્યમ બાધું જોતાં એક જ ઝાડ,",
        "વિગતે જોતાં ભાગે જાડ્ય.",
        "રંગ સ્વાદ પત્ર ફળ ફૂલ,",
        "સદ્ગુરુ મળે તો ભાગે ભૂલ.",
        # Stanza 6
        "પોતે ટળીને સઘળું પ્રીછ,",
        "વાટે ચાલતાં આંખ મ વીંચ.",
        "અદ્વૈત દ્વૈતનાં કરે છે કામ,",
        "સગુણ નિર્ગુણ ધાર્યા નામ.",
        "સગુણ નિર્ગુણ એ બે છે જોગ,",
        "પોતે ટળશે તેને પડશે ભોગ.",
        # Stanza 7
        "પોતે ટળ્યા તે પ્રીછ્યા જાણ,",
        "તેને શોભે સઘળી વાણ.",
        "પોતે ટળ્યા વિના શા કામના?",
        "એ તો અકૃતે વધારી કામના.",
        "કહે અખો કાં ફોકટ ફૂલ?",
        "ભણ્યાગણ્યા પણ ન ટળી ભૂલ.",
        # Stanza 8
        "અહંકાર તજીને આશે રહ્યો,",
        "મન કર્મ વચને તમારો થયો.",
        "જેમ કાષ્ઠની પૂતળી નાચે નરી,",
        "તે કળ સુતારે તમારે કરી.",
        "વાજું વજાડો તો વાજે તદા,",
        "વણ વજાડ્યું ન વાજે કદા.",
        # Stanza 9
        "આરત વિના ન ઊપજે હેત,",
        "આરત વિના પૂજારો પ્રેત.",
        "પૂંછળી ભેંસ ન માંડે પગ,",
        "જોર કરીને થાક્યા ઠગ.",
        "ઉપાડે ઘણા પણ ઊભી ન થાય,",
        "અખા જોર કરનારા પાછા જાય.",
        # Stanza 10
        "નથી વાંક વિશ્વંભર તણો,",
        "જે કહીએ તે વાંક આપણો.",
        "જેમ કોઈ ભોજન જમાડવા કરે,",
        "ત્યાં રિસાણો તે રીસે ફરે.",
        "પૂર્ણાનંદ પીરસનારો રહે,",
        "અખા અભાગિયાને કોણ કહે?",
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
    3: [
        "મારે એમ પડ્યું પાધરું, હુંપણું મટ્યું એ જ આદર્યું,",
        "કર્મ અહંકાર તણું ગયું મૂળ, જેમ અરકનાં ઊડે તૂલ;",
        "ન લહ્યા સરખું મેં ત્યાં લહ્યું, એમ અખા યથારથે થયું.",
        "વાંકું સમું જાણું ત્યાં હરિ, હું તો મારે બેઠો ઠરી;",
        "ભલા ગૃહસ્થની વાડે ગાય, એમ આપ સોંપ્યું હરિમાંય;",
        "છીંડું ખોળતાં લાધી પોળ, હવે અખા કર ઝાઝ મઝોળ.",
        "મારે મોટો હું નર જડ્યો, જે ઈશ્વરરૂપી જહાજે ચડ્યો,",
        "પચ સહિત ઉતારિયો પાર, પગ નહિ બોળું જળ સંસાર;",
        "હું હસ્તો રમ્તતો હરિમાં ભળ્યો, આખો જાણે તે વળણે વળ્યો.",
        "એ સુખ મારગ મેલીને શઠ, કાયકલેશ કરે કાં હઠ?",
        "ગીતામાં ગોવિંદ મુખ કહે, 'જે મારું શરણ ગ્રહીને રહે;",
        "મુજ વાયક જે માને અખા, તેને સ્કંધ લઈ ઉતારું સખા.'",
        "પ્રત્યક્ષ મૂકી જુએ પરોક્ષ, કર્તવ્યને શિર મૂકે દોષ,",
        "સભર ભરાઈ રહ્યો છે નાથ, હીંડતાં લાગે હરિને હાથ;",
        "અખો કહે ફેરવવું મન, જે જાણે તો જાણો જન.",
        "એમ જાણે તે હરિનો જન, મારે પોતે ક્યાંથું મન;",
        "દેહ હરિ ઇચ્છાયે થયો, અણછતો હું આવી ગયો;",
        "તારું કર્યું ને તું છે નાથ, એમ જાણી અખે ઝાટક્યા હાથ.",
    ],
    4: [
        "કુળ અધિકાર અધ્યયન ચાતુરી, પાપી મૂર્ખ ત્યાં ન જુએ હરિ.",
        "જેમ વાયાની વળણે લાગે લાય, પણ ડાબું જમણું ન ગણે વાય;",
        "ત્યમ ઊંચ નીચ ન ગણે નારાણ, અખા એમ ખરાખરી જાણ.",
        "ભૂત પંચનો આ સંસાર, મૂરખ વહે તે વર્ણ અહંકાર;",
        "ભાત ચલાવા વર્ણાવર્ણ, કોઈ મસ્તક હસ્ત કટિ ચર્ણ;",
        "બ્રાહ્મણ ક્ષત્રિય વૈશ્ય ને શૂદ્ર, હરિનો પિંડ અખા કોણ શૂદ્ર?",
        "ઊંચ ખરા તે ઊંચ ન જાણ, નીચ તે નો રે નીચ નિર્વાણ;",
        "ઊંચ માં રામ બમણો નથી ભર્યો, અને નીચ પિંડ ઠાલો નથી કર્યો;",
        "કહે અખો સ્વપ્નામાં બક્યો, જેમ છે તેમ જોઈ નવ શક્યો.",
        "જેમ શિલા એક ટાંકી ચીતરી, અણઘડી બીજી મેલે ભરી;",
        "બે નાંખી ઊંડા જળ વિષે, પણ સરખી બેઉ તરવા વિષે;",
        "પંડિત મૂરખ સરખા નીવડે, અખા દ્વૈતને રૂપક ચડે.",
        "પંડિતને પંડિતાઈનું જોર, પણ અંતઃકરણમાં અંધારું ઘોર;",
        "અખા તે થકી પ્રાકૃત ભલા, જો આવે સમજ્યાની કળા.",
        "શબરી સંસ્કૃત શું ભણી હતી ભાઈ? ક્યા વેદ વાંચ્યા કરમાબાઈ?",
        "વ્યાધ તે શું ભણ્યો'તો વેદ? ગણકા શું સમજતી હતી ભેદ?",
        "ભાષાને શું વળગે ભૂર? જે રણમાં જીતે તે શૂર;",
        "સંસ્કૃત બોલે તે શું થયું? કાંઈ પ્રાકૃતમાંથી નાસી ગયું?",
        "બાવનનો સઘળો વિસ્તાર, અખા ત્રેપનમો જાણે પાર.",
    ],
    5: [
        "ધામધૂમ તે ધનનો ધગા, મોહઅહંકાર મેલીને ગા;",
        "માવઠે મે' વરસે ગડગડે, ફળ ન ઊમટે ને લાગ્યાં પડે.",
        "રત વિના કરશણ ક્યાંથી ફળે? એમ અખા હરિ ક્યાંથી મળે?",
        "ખટપટને ખટપટવા દે, તું અળગે આવી પ્રીછી લે.",
        "જંગી ઢોલ ઘણા ગડગડે, ત્યાં ઝીણી વાત ન કાને પડે;",
        "નિરદાવાના જનને ખોળ, તે અખે બેસારે બોલે બોલ.",
        "પાને પોથે લખિયા હરિ, જેમ વેળુમાં ખાંડ વીખરી;",
        "સંતે ખાધી કીડી થઈ અને વંચકે તે સબુધી વહી.",
        "તે માટે તે તેવા રહ્યા, અખા સંત પારંગત થયા.",
        "વાત અલૌકિક અનુભવ તણી, પ્રપંચ પારે રહેણ આપણી;",
        "પંખી ઓછાયો પડિયો જાળ, પણ પોતે ઊડે અલગ નિરાળ;",
        "અખા જ્ઞાનીની એવી કળા, વર્ત્યા જાય તે ઉપરછલા.",
        "ઉપરછલો મારગ લે અખા, નહિ કો સાથી, નહિ કો સખા,",
        "ધણી થયામાં સઘળો ધંધ, જેમ રૂપ નહિ દેખે અંધ;",
        "ગગનગામીને નહિ અટકાવ, ભૂવર્તીને બહુ ભેદભાવ.",
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


MAX_RETRIES   = 4
RETRY_DELAYS  = [2, 4, 8, 16]   # seconds between retries (exponential backoff)
POEM_GAP      = 3.0              # seconds between successful poem calls


def call_sarvam(text: str, out_path: Path) -> bool:
    """Stream one TTS call to out_path. Retries on rate-limit. Returns True on success."""
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
    for attempt in range(MAX_RETRIES):
        try:
            with requests.post(API_URL, headers=headers, json=payload, stream=True, timeout=60) as r:
                if r.status_code == 429:
                    wait = RETRY_DELAYS[min(attempt, len(RETRY_DELAYS) - 1)]
                    print(f"  ⏳ Rate limited — waiting {wait}s then retrying (attempt {attempt+1}/{MAX_RETRIES})…")
                    time.sleep(wait)
                    continue
                if not r.ok:
                    print(f"  ✗ {r.status_code} {r.reason}: {r.text[:300]}")
                    return False
                with open(out_path, "wb") as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
            return True
        except Exception as e:
            wait = RETRY_DELAYS[min(attempt, len(RETRY_DELAYS) - 1)]
            print(f"  ✗ Request error: {e}  (retrying in {wait}s…)")
            time.sleep(wait)
    print(f"  ✗ All {MAX_RETRIES} attempts failed.")
    return False


def process_poem(poem_id: int, lines: list[str], force: bool = False) -> dict:
    print(f"\n── Poem {poem_id} ({len(lines)} lines) ──")
    out_mp3 = OUT_DIR / f"poem-{poem_id}.mp3"

    if not API_KEY:
        print("  ⚠ SARVAM_API_KEY not set — writing estimated timings only.")
        est_total = sum(max(1, len(l)) / CHARS_PER_SECOND + PAUSE_BETWEEN_LINES for l in lines)
        return {str(poem_id): estimate_timings(lines, est_total)}

    if out_mp3.exists() and not force:
        duration = mp3_duration(out_mp3)
        print(f"  ✓ {out_mp3.name} already exists ({duration:.1f}s) — skipping API call. Use --force to regenerate.")
        return {str(poem_id): estimate_timings(lines, duration)}

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
    import sys
    force = "--force" in sys.argv

    if not API_KEY:
        print("SARVAM_API_KEY not set — only timing estimates will be written.\n"
              "Set it with:  export SARVAM_API_KEY=your_key_here")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output: {OUT_DIR}")
    if force:
        print("--force: regenerating all poems even if mp3 already exists")

    # Load existing timings so we preserve entries for poems we skip
    timings_path = OUT_DIR / "timings.json"
    all_timings: dict = {}
    if timings_path.exists():
        try:
            all_timings = json.loads(timings_path.read_text(encoding="utf-8"))
        except Exception:
            pass

    for poem_id, lines in POEMS.items():
        result = process_poem(poem_id, lines, force=force)
        all_timings.update(result)
        time.sleep(POEM_GAP)

    timings_path.write_text(json.dumps(all_timings, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n✓ timings.json written")
    print("\nNext steps:")
    print("  git add public/verses/akha-bhagat/audio/")
    print("  git commit -m 'Add Sarvam TTS audio for Akha Bhagat'")
    print("  git push")


if __name__ == "__main__":
    main()
