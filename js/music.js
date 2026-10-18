/* =========================================================
   MUSIC — assets/audio/music.mp3 plays on loop from the moment
   the site opens. The music-player doodle (top right) pauses /
   plays it.

   To change the song: replace assets/audio/music.mp3 with
   another mp3 of the same name. Volume: VOLUME below.

   - The song carries on from the same spot when visitors move
     between pages.
   - If someone pauses it, it stays paused on the other pages
     until they press play.
   - Browsers only allow sound once a visitor has interacted
     with a site. Where a browser blocks it on the very first
     page, the song starts on the visitor's first click, tap,
     key press or scroll-wheel.
   ========================================================= */
(function () {
  const VOLUME = 0.4;
  const btn = document.querySelector("[data-music]");
  if (!btn) return;
  const root = document.body.dataset.root || "";

  const ss = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  };
  const userPaused = () => ss.get("music-paused") === "1";

  const audio = new Audio(root + "assets/audio/music.mp3");
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = VOLUME;

  // continue from where the previous page left off
  try {
    const p = JSON.parse(ss.get("music-pos") || "null");
    if (p) {
      const resume = () => {
        let t = p.sec + (p.playing ? (Date.now() - p.at) / 1000 : 0);
        if (audio.duration) t = t % audio.duration;
        if (t > 0.5) audio.currentTime = t;
      };
      if (audio.readyState >= 1) resume(); else audio.addEventListener("loadedmetadata", resume, { once: true });
    }
  } catch (e) {}
  const savePos = () => ss.set("music-pos", JSON.stringify({ sec: audio.currentTime, at: Date.now(), playing: !audio.paused }));
  addEventListener("pagehide", savePos);
  setInterval(() => { if (!audio.paused) savePos(); }, 1000);

  function setUI(on) {
    btn.classList.toggle("is-playing", on);
    btn.setAttribute("aria-pressed", on);
    btn.setAttribute("aria-label", on ? "Pause music" : "Play music");
    btn.title = on ? "Pause music" : "Play music";
    const hint = btn.querySelector(".music__hint");
    if (hint) hint.textContent = on ? "pause" : "tap to play ♪";
  }
  audio.addEventListener("play", () => setUI(true));
  audio.addEventListener("pause", () => setUI(false));

  // fade in so it doesn't start abruptly
  function fadeIn() {
    audio.volume = 0;
    let v = 0;
    const id = setInterval(() => { v = Math.min(VOLUME, v + VOLUME / 20); audio.volume = v; if (v >= VOLUME) clearInterval(id); }, 50);
  }
  async function play() {
    try { fadeIn(); await audio.play(); ss.set("music-paused", "0"); return true; }
    catch (e) { audio.volume = VOLUME; return false; }
  }
  function pause() { audio.pause(); ss.set("music-paused", "1"); savePos(); }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    disarm();
    audio.paused ? play() : pause();
  });

  /* ---------- start as soon as the site opens ---------- */
  const EVENTS = ["pointerdown", "keydown", "touchstart", "wheel"];
  const onFirst = (ev) => {
    if (ev.target.closest && ev.target.closest("[data-music]")) return; // the button handles itself
    if (!audio.paused || userPaused()) return disarm();
    play().then((ok) => { if (ok) disarm(); });
  };
  function arm() { EVENTS.forEach((t) => addEventListener(t, onFirst, { capture: true, passive: true })); }
  function disarm() { EVENTS.forEach((t) => removeEventListener(t, onFirst, { capture: true })); }

  if (!userPaused()) {
    play().then((ok) => { if (!ok) arm(); });
  }

  window.__music = { save: savePos };
})();
