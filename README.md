# Ilisha Dabas — Portfolio

The homepage scrolls **landing → works → about me**. The dock's *archive* opens
`projects.html`; each Works card opens a case study in `work/`.

## Layout = your Figma, exactly

Each page is built at its Figma frame size (1680px wide) with every element at its
Figma x / y. `js/site.js` scales the whole frame to the browser width, so the
placement always matches Figma. To move something, change its `left` / `top` in
`css/style.css` — they're the same numbers you see in Figma.

Below 760px wide (phones) pages switch to a stacked, single-column layout.

## Music

`assets/audio/music.mp3` plays on loop from the moment the site opens. The
music-player doodle (top right) pauses / plays it.

- **Change the song:** replace `assets/audio/music.mp3` (keep the name). Volume:
  `VOLUME` at the top of `js/music.js`.
- It carries on from the same spot between pages; if someone pauses, it stays paused.
- Browsers only allow sound once a visitor has interacted with a site. Where a browser
  blocks it on the very first page, the song starts on the first click, tap, key press
  or scroll-wheel. From then on every page starts playing straight away.

## Videos

- **Works cards** play their video while hovered (on phones: while the card is on
  screen). **Projects tiles** play their videos all the time, on a loop. **Case studies** play the video at the top when opened;
  **popups** play while open.
- Videos live in `assets/video/` as `name.webm` + `name.mp4` (two formats so every
  browser can play one). To add one to a Projects tile, set `video: "name.mp4"` in
  `js/projects-data.js`.
- **Slideshows** (Projects tiles + their popups): Team Inferno, NaviBites, Dolu, The Cozy
  Corner, Vedastra (art), Technical Craftsmen, SEVA FIRST and Printies. Each starts with the
  tile's original picture; pictures show 3 seconds each, videos play to the end, then it loops.
  Edit the `slides:` list in `js/projects-data.js` (files live in `assets/slides/`).

## Works tabs

The tabs above the Works cards (UI/UX Design · Product Design · Visual Identity) show one
category at a time. Each card in `index.html` has `data-cat="uiux" | "product" | "identity"`;
change it to move a card to another tab.

## Case studies

Each case study (`work/<name>.html`) is the Figma frame itself, exported as image slices in
`assets/case/<name>/`, with the live parts placed on top at their Figma x/y: the hero
video, the **Project Link**, and on Moshi the six process videos (`assets/video/moshi/`).
To change a case study's design, edit the frame in Figma and re-export the slices.

## Stickers

Drag a sticker out of the box and a copy drops on the page; each sticker can be used
any number of times. Drag placed stickers to move them, double-click to remove one,
**RESET** clears them all. They're remembered in the visitor's browser.

## Common edits

| I want to… | Edit |
|---|---|
| Change LinkedIn / Behance / email / resume | `js/site.js` → `SITE.links` |
| Replace the resume | overwrite `assets/Ilisha-Dabas-Resume.pdf` |
| Add / move / edit a Projects tile | `js/projects-data.js` (x, y, w, h from Figma) |
| Edit a Works card | `index.html`, inside `#works` |
| Edit a case study | `work/<name>.html` |
| Change a Behance "Project Link" | `href` on `case-proj-link` in that case study (Moshi links to its PDF) |
| Change a Projects popup link / PDF | `links:` on that project in `js/projects-data.js`; PDFs live in `assets/pdf/` |
| Edit About me, the trophy shelf, Experience or Skills | `index.html`, inside `#about` and the two `<dialog>`s |
| Swap an image | replace the file in `assets/img/` with the same name |

A missing image shows a dashed box with the filename it expects.

## Fonts

Roboto, DM Sans, Inter, Silkscreen and Codystar load from Google Fonts. **Pixelitta** (intuitive,
About me, card titles, popup headings) is included in `assets/fonts/Pixelitta.ttf`.

## Publish for free

Drag the folder onto **app.netlify.com/drop**, or push to GitHub and turn on **GitHub Pages**.
