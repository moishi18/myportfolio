/* =========================================================
   VIDEO + SLIDESHOW behaviour

   [data-hover-video]  a card/tile containing a <video>:
                       plays while hovered (desktop) or while on
                       screen (phones), shows the still image otherwise.
   video[data-autoplay] plays whenever it's visible (case-study hero).
   [data-slideshow]    cycles through its <img> children.
   Videos inside a popup play when the popup opens.
   ========================================================= */
(function () {
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  const start = (v) => {
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
    v.closest("[data-hover-video], .vid")?.classList.add("is-playing");
  };
  const stop = (v, rewind = true) => {
    if (!v) return;
    v.pause();
    if (rewind) { try { v.currentTime = 0; } catch (e) {} }
    v.closest("[data-hover-video], .vid")?.classList.remove("is-playing");
  };

  // ---- cards / tiles: play on hover ----
  const hoverables = document.querySelectorAll("[data-hover-video]");
  if (canHover) {
    hoverables.forEach((el) => {
      const v = el.querySelector("video");
      el.addEventListener("mouseenter", () => start(v));
      el.addEventListener("mouseleave", () => stop(v));
      el.addEventListener("focus", () => start(v));
      el.addEventListener("blur", () => stop(v));
    });
  } else {
    // phones/tablets: play the one that's in the middle of the screen
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? start : stop)(e.target.querySelector("video"))),
      { rootMargin: "-30% 0px -30% 0px" }
    );
    hoverables.forEach((el) => io.observe(el));
  }

  // ---- autoplay videos (case-study hero): play while visible ----
  const auto = document.querySelectorAll("video[data-autoplay]");
  if (auto.length) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? start(e.target) : stop(e.target, false))),
      { threshold: 0.2 }
    );
    auto.forEach((v) => io.observe(v));
  }

  // ---- popups: play their video while open ----
  document.querySelectorAll("dialog").forEach((dlg) => {
    const v = dlg.querySelector("video");
    if (!v || dlg.querySelector("[data-slideshow]")) return;   // slideshows run themselves
    new MutationObserver(() => (dlg.open ? start(v) : stop(v))).observe(dlg, { attributes: true, attributeFilter: ["open"] });
  });

  // ---- slideshows: pictures 3 s each, videos play to the end, then loop ----
  // Markup: <div data-slideshow> <figure class="slide">img or video</figure> … </div>
  // Pauses while off-screen (or while its popup is closed).
  const PIC_MS = 3000;
  document.querySelectorAll("[data-slideshow]").forEach((box) => {
    const slides = [...box.querySelectorAll(".slide")];
    if (!slides.length) return;
    let i = 0, timer = null, visible = false, current = null;

    const clear = () => {
      clearTimeout(timer);
      if (current) { current.onended = null; current.onerror = null; current.pause(); }
      current = null;
    };
    const next = () => { show((i + 1) % slides.length); };

    function show(n) {
      clear();
      slides[i].classList.remove("is-active");
      i = n;
      const s = slides[i];
      s.classList.add("is-active");
      if (!visible || slides.length < 2) return;
      const v = s.querySelector("video");
      if (!v) { timer = setTimeout(next, PIC_MS); return; }
      current = v;
      v.muted = true;
      if (v.preload !== "auto") { v.preload = "auto"; v.load(); }
      try { v.currentTime = 0; } catch (e) {}
      v.onended = next;
      v.onerror = () => { timer = setTimeout(next, PIC_MS); };
      const p = v.play();
      if (p && p.catch) p.catch(() => { timer = setTimeout(next, PIC_MS); });
      // safety net in case "ended" never fires
      const guard = () => { if (v.duration && isFinite(v.duration)) { clearTimeout(timer); timer = setTimeout(next, (v.duration + 1.5) * 1000); } };
      if (v.readyState >= 1) guard(); else v.addEventListener("loadedmetadata", guard, { once: true });
    }

    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const was = visible;
        visible = e.isIntersecting;
        if (visible && !was) show(i);        // start / resume on the current slide
        if (!visible && was) clear();         // pause when off-screen or popup closed
      });
    }, { threshold: 0.15 }).observe(box);

    slides[0].classList.add("is-active");
  });
})();
