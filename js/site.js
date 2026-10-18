/* =========================================================
   SITE SETTINGS — your links, used in the header everywhere
   ========================================================= */
const SITE = {
  links: [
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/ilisha-dabas-84b07b27b/" },
    { label: "BEHANCE",  href: "https://www.behance.net/ilishadabas" },
    { label: "EMAIL",    href: "mailto:ilishadabas@gmail.com" },
    { label: "RESUME",   href: "assets/Ilisha-Dabas-Resume.pdf" },
  ],
  // works = scrolls down the homepage; projects & profile are their own pages
  dock: [
    { id: "works",    label: "works",    href: "index.html#works", icon: "assets/img/icon-works.png" },
    { id: "projects", label: "projects", href: "projects.html",    icon: "assets/img/icon-projects.png" },
    { id: "profile",  label: "profile",  href: "profile.html",     icon: "assets/img/icon-profile.png" },
  ],
};

/* ---------------------------------------------------------
   Everything below builds the shared UI.
   --------------------------------------------------------- */
(function () {
  const body = document.body;
  const root = body.dataset.root || "";          // "../" on case-study pages
  const page = body.dataset.page || "";
  const fix = (href) => (/^(https?:|mailto:|tel:|#)/.test(href) ? href : root + href);
  const isExternal = (href) => /^(https?:|mailto:)/.test(href) || /\.pdf$/i.test(href);

  // ---- scale Figma frames (1680px wide) to the window ----
  const setScale = () => {
    const w = document.documentElement.clientWidth;
    const s = w <= 760 ? 1 : Math.min(w, 1920) / 1680;
    document.documentElement.style.setProperty("--s", s.toFixed(4));
  };
  setScale();
  addEventListener("resize", setScale);

  // ---- header: star + name + links + music player ----
  const header = document.querySelector("[data-site-header]");
  if (header) {
    const minimal = header.hasAttribute("data-minimal");
    header.className = "site-header" + (minimal ? " site-header--minimal" : "");
    header.innerHTML = `
      <a class="brand" href="${fix("index.html")}" aria-label="Ilisha Dabas — home">
        <img class="brand__logo" src="${fix("assets/img/logo-star.png")}" alt="" width="55" height="55">
        <span class="brand__name"><b>ILISHA</b><span>dabas</span></span>
      </a>
      <button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span></button>
      <nav class="site-nav" aria-label="Contact">
        ${SITE.links.map((l) => `<a href="${fix(l.href)}"${isExternal(l.href) ? ' target="_blank" rel="noopener"' : ""}>${l.label}</a>`).join("")}
      </nav>
      <button class="music" data-music aria-pressed="false" aria-label="Play music" title="Play music">
        <img src="${fix("assets/img/header-deco.png")}" alt="" width="98" height="94">
        <span class="music__notes" aria-hidden="true"><span>♪</span><span>♫</span><span>♪</span></span>
        <span class="music__hint">tap to play ♪</span>
      </button>`;
    const toggle = header.querySelector(".menu-toggle");
    toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", body.classList.toggle("menu-open")));
  }

  // ---- dock (works / projects / profile) ----
  const dock = document.querySelector("[data-dock]");
  if (dock) {
    dock.className = "dock";
    dock.setAttribute("aria-label", "Main");
    const onHome = page === "home";
    dock.innerHTML = SITE.dock
      .map((d) => `
        <a class="dock__item dock__item--${d.id}" data-id="${d.id}" href="${onHome && d.id === "works" ? "#works" : fix(d.href)}"${d.id === page ? ' aria-current="page"' : ""}>
          <img src="${fix(d.icon)}" alt="">
          <span>${d.label}</span>
        </a>`)
      .join("");

    // on the homepage, "works" lights up once you scroll down to the work
    if (onHome) {
      const works = document.getElementById("works");
      const item = dock.querySelector('[data-id="works"]');
      const update = () => item.toggleAttribute("aria-current", works.getBoundingClientRect().top < innerHeight * 0.5);
      addEventListener("scroll", update, { passive: true });
      update();
    }
  }

  // ---- missing images: show the expected filename instead ----
  function markMissing(img) {
    if (img.dataset.missingHandled) return;
    img.dataset.missingHandled = "1";
    const ph = document.createElement("div");
    ph.className = "img-missing " + img.className;
    ph.textContent = img.getAttribute("src").split("/").pop();
    const w = img.getAttribute("width"), h = img.getAttribute("height");
    if (w && h) ph.style.aspectRatio = `${w} / ${h}`;
    img.replaceWith(ph);
  }
  document.querySelectorAll("img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
    else img.addEventListener("error", () => markMissing(img));
  });

  // ---- fade things in as they scroll into view ----
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---- popup windows: any element with data-open="dialog-id" ----
  function closeWindow(dlg) {
    if (!dlg.open) return;
    dlg.classList.add("is-closing");
    setTimeout(() => { dlg.classList.remove("is-closing"); dlg.close(); }, 190);
  }
  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open]");
    if (opener) {
      const dlg = document.getElementById(opener.dataset.open);
      if (dlg) { e.preventDefault(); dlg.showModal(); dlg.querySelector(".window__body").scrollTop = 0; }
      return;
    }
    const closer = e.target.closest(".window__close");
    if (closer) closeWindow(closer.closest("dialog"));
  });
  document.querySelectorAll("dialog.window").forEach((dlg) => {
    dlg.addEventListener("click", (e) => { if (e.target === dlg) closeWindow(dlg); });
    dlg.addEventListener("cancel", (e) => { e.preventDefault(); closeWindow(dlg); });
  });

  // ---- case studies: reading progress + click image to enlarge ----
  const bar = document.querySelector(".progress");
  if (bar) {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener("scroll", update, { passive: true });
    update();
  }
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".case figure img");
    if (!img) return;
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    const close = () => { box.remove(); removeEventListener("keydown", onKey); };
    const onKey = (ev) => { if (ev.key === "Escape") close(); };
    box.addEventListener("click", close);
    addEventListener("keydown", onKey);
    body.appendChild(box);
  });

  // ---- BACK on case studies: return to the exact spot in Works ----
  // Opening a project from Works remembers the scroll position. BACK then
  // steps back in history (same spot, no reload). If someone landed on a
  // case study directly, BACK opens the homepage at that project's card.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const remember = (k, v) => { try { sessionStorage.setItem(k, v); } catch (err) {} };
  const recall = (k) => { try { return sessionStorage.getItem(k); } catch (err) { return null; } };

  if (page === "home") {
    document.querySelectorAll(".card[href]").forEach((card) =>
      card.addEventListener("click", () => {
        remember("works-scroll", String(scrollY));
        remember("works-card", card.getAttribute("href"));
        remember("from-works", "1");
      })
    );
    const savedY = recall("works-scroll");
    const cameBack = recall("returning") === "1" || location.hash === "#works";
    const cardHref = recall("works-card");
    if (cameBack && savedY == null && cardHref) {
      addEventListener("load", () => {
        const el = document.querySelector(`.card[href="${cardHref}"]`);
        if (el) scrollTo(0, el.getBoundingClientRect().top + scrollY - innerHeight * 0.2);
        history.replaceState(null, "", location.pathname);
        remember("returning", "0");
      }, { once: true });
    }
    if (cameBack && savedY != null) {
      remember("returning", "0");
      const go = () => {
        const html = document.documentElement;
        html.style.scrollBehavior = "auto";
        scrollTo(0, +savedY);
        html.style.scrollBehavior = "";
      };
      if (location.hash) history.replaceState(null, "", location.pathname);
      go();
      addEventListener("load", () => { go(); setTimeout(go, 60); }, { once: true });
    }
  }
  // keep the current scroll remembered on the homepage (for history.back)
  if (page === "home") addEventListener("pagehide", () => { if (scrollY > 0) remember("works-scroll", String(scrollY)); });

  document.querySelectorAll("[data-back]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      body.classList.add("is-leaving");
      remember("returning", "1");
      const fromWorks = recall("from-works") === "1";
      remember("from-works", "0");
      setTimeout(() => {
        if (fromWorks && history.length > 1) history.back();
        else {
          // direct visit: open Works at this project's card
          const slug = location.pathname.split("/").pop();
          remember("works-card", "work/" + slug);
          location.href = btn.href;
        }
      }, 180);
    }, true)
  );

  // ---- smooth fade between pages ----
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || /\.(pdf|png|jpe?g)$/i.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.hash) return;   // same-page jump
    e.preventDefault();
    try { window.__music && window.__music.save(); } catch (err) {}
    body.classList.add("is-leaving");
    setTimeout(() => (location.href = a.href), 220);
  });
  addEventListener("pageshow", () => body.classList.remove("is-leaving"));
})();
