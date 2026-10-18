/* =========================================================
   STICKERS (like cindyly.design)
   - Drag any sticker out of the box: a COPY drops on the page,
     the original stays in the box, so each can be used many times.
   - Drag a placed sticker to move it; double-click to remove it.
   - RESET removes every placed sticker.
   - Placed stickers are remembered in this browser.
   ========================================================= */
(function () {
  const box = document.getElementById("stickers");
  const frame = box && box.closest(".frame");
  if (!box || !frame) return;

  const layer = document.createElement("div");
  layer.className = "placed-layer";
  frame.appendChild(layer);

  const isPhone = () => document.documentElement.clientWidth <= 760;
  const KEY = () => "stickers-placed-" + (isPhone() ? "phone" : "desktop");
  // frame is scaled with CSS zoom; convert screen px <-> frame px
  const scale = () => (isPhone() ? 1 : parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--s")) || 1);
  const toFrame = (clientX, clientY) => {
    const r = frame.getBoundingClientRect(), s = scale();
    return { x: (clientX - r.left) / s, y: (clientY - r.top) / s };
  };

  let placed = [];
  const load = () => { try { placed = JSON.parse(localStorage.getItem(KEY())) || []; } catch (e) { placed = []; } };
  const save = () => {
    placed = [...layer.querySelectorAll(".placed")].map((el) => ({
      src: el.getAttribute("src"), x: parseFloat(el.style.left), y: parseFloat(el.style.top),
      w: parseFloat(el.style.width), r: parseFloat(el.dataset.rot) || 0,
    }));
    try { localStorage.setItem(KEY(), JSON.stringify(placed)); } catch (e) {}
  };

  function makePlaced({ src, x, y, w, r }) {
    const el = document.createElement("img");
    el.className = "placed";
    el.src = src;
    el.alt = "";
    el.draggable = false;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.width = w + "px";
    el.dataset.rot = r;
    el.style.rotate = r + "deg";
    el.addEventListener("pointerdown", (e) => drag(e, el, false));
    el.addEventListener("dblclick", () => { el.remove(); save(); });
    layer.appendChild(el);
    return el;
  }

  // shared drag routine: follows the pointer in frame px
  function drag(e, el, isNew) {
    e.preventDefault();
    getSelection()?.removeAllRanges();
    document.body.classList.add("is-sticker-dragging");
    const s = scale();
    const start = { cx: e.clientX, cy: e.clientY, x: parseFloat(el.style.left), y: parseFloat(el.style.top) };
    let moved = false;
    el.classList.add("is-dragging");
    layer.appendChild(el); // bring to front
    const move = (ev) => {
      const dx = (ev.clientX - start.cx) / s, dy = (ev.clientY - start.cy) / s;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      el.style.left = start.x + dx + "px";
      el.style.top = start.y + dy + "px";
    };
    const up = () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
      removeEventListener("pointercancel", up);
      el.classList.remove("is-dragging");
      document.body.classList.remove("is-sticker-dragging");
      if (isNew && !moved) el.remove();   // a click without dragging adds nothing
      else if (isNew) el.classList.add("is-new");
      save();
    };
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    addEventListener("pointercancel", up);
  }

  // pick up a copy from the box
  box.querySelectorAll(".sticker").forEach((src) => {
    src.draggable = false;
    src.addEventListener("pointerdown", (e) => {
      const r = src.getBoundingClientRect();
      const p = toFrame(r.left, r.top), s = scale();
      const el = makePlaced({
        src: src.getAttribute("src"), x: p.x, y: p.y, w: r.width / s,
        r: Math.round((Math.random() - 0.5) * 24),
      });
      drag(e, el, true);
    });
  });

  document.getElementById("reset-stickers")?.addEventListener("click", () => {
    layer.querySelectorAll(".placed").forEach((el, i) => {
      el.style.transition = "opacity 0.25s ease, scale 0.25s ease";
      el.style.opacity = "0";
      el.style.scale = "0.6";
      setTimeout(() => el.remove(), 260);
    });
    setTimeout(save, 300);
  });

  // restore stickers placed on an earlier visit
  load();
  placed.forEach(makePlaced);
})();
