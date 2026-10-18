/* =========================================================
   PROJECTS PAGE — one entry per window tile.

   title   : name in the tile's title bar
   image   : file in assets/img/  (leave "" for a grey box, like Figma)
   fit     : "contain" to show the whole image (default fills the tile)
   x, y, w, h : position + size from Figma (the "Utility Panel" frame)
   popup   : title of the popup that opens (defaults to `title`)
   text    : popup description (use \n\n for a new paragraph)
   video   : file in assets/video/ — plays on its own, on a loop
   slides  : slideshow in the tile + popup, paths inside assets/ (e.g. "slides/dolu-01.jpg",
             "slides/dolu-v1.mp4"). Pictures show 3 s each; videos play to the end.
             For a video, keep a .webm + .jpg (first frame) with the same name next to the .mp4.
   id      : only needed when two tiles share a title
   opens   : instead of its own popup, open another tile's popup (use its id/title)
   links   : buttons under the popup text, e.g.
             [{ label: "click here to view more", href: "assets/pdf/x.pdf" }]
             (PDFs and websites open in a new tab)
   ========================================================= */
const PROJECTS = [
  {
    title: "Team Inferno", image: "proj-team-inferno.jpg",
    slides: ["img/proj-team-inferno.jpg", "slides/inferno-01.jpg", "slides/inferno-02.jpg", "slides/inferno-03.jpg", "slides/inferno-04.jpg", "slides/inferno-05.jpg", "slides/inferno-06.jpg", "slides/inferno-07.jpg", "slides/inferno-08.jpg", "slides/inferno-v1.mp4", "slides/inferno-v2.mp4", "slides/inferno-v3.mp4"], x: 203, y: 263, w: 843, h: 501,
    text: "I'm the Design and Research Lead and Team Manager of Team Inferno, DTU's Mars rover team. I lead 40+ members across mechanical, electrical, software, science and corporate. As the only designer, I decide design changes with the captain.\n\nI designed the rover monitoring portal with 4 live camera feeds, which helped us qualify for ERC Remote 2025. We won 1st in Project Implementation and Management at IRC 2025 and earned the highest Business and Partnership Plan score at IRC 2026. We ranked 7th at ISDC 2025 and 19th at IRC 2026. I built an evidence-backed budget case that got the college to double our funding, and the motion reels I produce for our page have reached 100k+ views and 800+ followers.",
    links: [{ label: "click here to view more", href: "https://infernodtu.framer.website/" }, { label: "LinkedIn", href: "https://www.linkedin.com/company/infernodtu/" }, { label: "Instagram", href: "https://www.instagram.com/inferno.dtu/" }, { label: "Case study", href: "work/team-inferno.html" }],
  },
  {
    title: "NaviBites", image: "proj-navibites.png",
    slides: ["img/proj-navibites.png", "slides/navibites-01.jpg", "slides/navibites-02.jpg", "slides/navibites-03.jpg", "slides/navibites-04.jpg", "slides/navibites-05.jpg", "slides/navibites-06.jpg", "slides/navibites-07.jpg", "slides/navibites-08.jpg", "slides/navibites-09.jpg"], x: 1065, y: 263, w: 408, h: 666,
    text: "I founded NaviBites and designed it end to end. It's an AI food-discovery app that helps you decide what to eat instead of scrolling endless near-identical cards.\n\nA 10-person pilot shaped the product. Testers trusted recommendations more when they could see why a dish was picked, so I added a \"why this pick\" line to every suggestion. When people dropped off at the dietary step, I split it into two simpler screens. Behind the app sits a Figma design system of 50+ components with tokens and interaction states, refined with the developers.",
  },
  {
    title: "Music Impact", image: "proj-music-impact.png", video: "music-impact.mp4", x: 203, y: 782, w: 412, h: 437,
    text: "Echoes of Perception is an ethnographic study on what one song does to people. 25 participants listened to the same track on headphones and told us how they felt before and after, and what it reminded them of. We also asked what brand, food, workplace and size of space it felt like.\n\nA 5-person pilot showed open questions were too scattered to analyse, so we rebuilt the survey into before/after sections and added hot-vs-cold and space-size questions. Most participants heard the same track as cold, dramatic and cinematic, which shows how consistently sound shapes perception.",
    links: [{ label: "click here to view more", href: "assets/pdf/music-impact.pdf" }],
  },
  {
    title: "Dolu", image: "proj-dolu.png",
    slides: ["img/proj-dolu.png", "slides/dolu-01.jpg", "slides/dolu-02.jpg", "slides/dolu-03.jpg", "slides/dolu-04.jpg", "slides/dolu-v1.mp4"], x: 634, y: 781, w: 412, h: 662,
    text: "Dolu turns milk delivery into a chat, as simple as messaging your neighbourhood milkman. As Head Designer, I designed 30+ screens for this WhatsApp-style subscription app.\n\nResearch across 3 age groups showed that older users found typing in Hindi a real barrier, so I added voice ordering tuned to local dialects. Guided prompts handle products, quantities and delivery days using messaging patterns people already know. In community testing, 10–15 testers found it far easier than typical delivery apps.",
    links: [{ label: "click here to view more", href: "https://doludeliverytech.framer.website/" }],
  },
  {
    title: "The Cozy Corner", image: "proj-cozy-corner.png", fit: "contain",
    slides: ["img/proj-cozy-corner.png", "slides/cozy-01.jpg", "slides/cozy-02.jpg", "slides/cozy-03.jpg", "slides/cozy-04.jpg", "slides/cozy-05.jpg", "slides/cozy-v1.mp4", "slides/cozy-v2.mp4", "slides/cozy-v3.mp4"], x: 1065, y: 952, w: 412, h: 662,
    text: "Cozy Corner is a café in Riyadh that blends South Asian comfort food with Saudi café culture. It's a \"third place\" for young Saudis, South Asian expats, families and match-night crowds.\n\nResearch into Riyadh's café scene showed a gap: ethnic cafés feel familiar but inconsistent, specialty cafés look good but feel cold. I built the brand to sit in between. That meant positioning, the motto \"Life tastes better at the corner\", the logo, colour and type, a menu system, and a 23-page brand guideline that keeps every touchpoint consistent.",
    links: [{ label: "click here to view more", href: "assets/pdf/cozy-corner-guidelines.pdf" }],
  },
  {
    title: "Art", image: "proj-art.png",
    slides: ["img/proj-art.png", "slides/art-01.jpg", "slides/art-02.jpg", "slides/art-03.jpg", "slides/art-04.jpg", "slides/art-05.jpg", "slides/art-06.jpg", "slides/art-07.jpg", "slides/art-08.jpg", "slides/art-09.jpg", "slides/art-10.jpg", "slides/art-11.jpg", "slides/art-12.jpg", "slides/art-13.jpg", "slides/art-14.jpg", "slides/art-15.jpg", "slides/art-16.jpg", "slides/art-17.jpg", "slides/art-18.jpg", "slides/art-19.jpg", "slides/art-20.jpg", "slides/art-21.jpg", "slides/art-22.jpg", "slides/art-23.jpg", "slides/art-24.jpg", "slides/art-25.jpg", "slides/art-26.jpg", "slides/art-27.jpg", "slides/art-28.jpg"], x: 203, y: 1235, w: 412, h: 641,
    text: "Art is where I make things with no brief. I draw detailed ink illustrations, sketch characters, make pixel art and play around digitally, moving between pen on paper and screens.\n\nIt keeps my hand and eye sharp, and a lot of the illustration and character work in my design projects starts here. The full collection lives on my Instagram.",
    links: [{ label: "click here to view more", href: "https://www.instagram.com/ishi.stic/" }],
  },
  {
    title: "Technical Craftsmen", image: "proj-technical-craftsmen.png",
    slides: ["img/proj-technical-craftsmen.png", "slides/tc-01.jpg", "slides/tc-02.jpg", "slides/tc-03.jpg", "slides/tc-04.jpg"], x: 634, y: 1465, w: 412, h: 321,
    text: "Technical Craftsmen is a Saudi Arabia-based technical support and engineering services company working with SMEs, factories, offices and institutions. Its market is full of providers with inconsistent service and weak branding, so the brand had to look as dependable as the work. As a freelancer, I created 2 complete brand identities for them.\n\nThe identity is built around one idea, \"precision over approximation\". It has an interlocked TC monogram, a wide 4.9:1 wordmark built for letterheads, proposals and headers, a restrained corporate palette, and a full brand guideline covering logo variations, spacing and usage.",
    links: [{ label: "click here to view more", href: "assets/pdf/technical-craftsmen.pdf" }],
  },
  {
    title: "Market Study", image: "proj-market-study.png", video: "market-study.mp4", x: 1061, y: 1637, w: 412, h: 556,
    text: "Every Friday a residential road near me turns into a 4–6 hour pop-up bazaar. I mapped how it works and where it breaks.\n\nThrough observation, layout mapping and personas (homemaker, floor vendor, quick buyer), I found a \"stop–select–negotiate–move\" loop. Customers stopping to bargain in the middle of the walkway, vendors spreading into the path, and a choked entry and exit all add up to constant congestion. My proposal is a modular vendor grid, zoning (standing stalls outside, floor vendors inside), one-way flow with simple markings, and shared waste points. It adds structure without killing the bazaar's informal character.",
    links: [{ label: "click here to view more", href: "assets/pdf/market-study.pdf" }],
  },
  {
    title: "Universal Scissors", image: "proj-universal-scissors.png", video: "universal-scissors.mp4", x: 634, y: 1808, w: 412, h: 445,
    text: "Standard scissors assume two working hands. Cutting card takes 30–50 N of grip and three joint movements at once, which shuts out people with hemiplegia, arthritis, limb difference or a temporary injury.\n\nIn a team of three, we compared the standard pair, an assistive adaptation and a universal redesign. The adaptation works but looks like medical equipment. The redesign uses a 30 mm ambidextrous loop handle, an adjustable 8–20 N spring, a flat 18 N squeeze from a longer lever, and a high-contrast, textured cut line. The same scissors work for a left hand, a child, a weak grip or someone holding a phone. A loop handle isn't a disability product; it's just a better handle.",
    links: [{ label: "click here to view more", href: "assets/pdf/universal-scissors.pdf" }],
  },
  {
    title: "Vedastra", id: "vedastra-site", image: "proj-vedastra-site.jpg", x: 203, y: 1894, w: 412, h: 359,
    text: "Vedastra is a Vedic astrology web experience designed to make an ancient, detail-heavy practice feel calm, personal, and approachable. It brings personalised Kundali generation, planetary insights, marriage compatibility and astrological guidance into one place.\n\nThe visuals pair layered, hand-painted botanical illustration with elegant serif type, soft earthy colour and generous whitespace, so a traditional subject feels contemporary without losing its character. The site is live at vedastras.in.",
    links: [{ label: "click here to view more", href: "https://vedastras.in/" }],
  },
  {
    title: "Accessible Library", image: "proj-accessible-library.png", x: 1065, y: 2220, w: 412, h: 496,
    text: "Libraries are hard to use independently if you can't see the shelves. Catalogues live on screens, books live in aisles, and nothing connects the two for a visually impaired reader.\n\nThis concept looks at the whole journey, from finding a book in the catalogue to walking to it and picking it off the shelf. It uses tactile wayfinding and links the digital catalogue to the physical space, applying universal design principles so the library works without needing someone to guide you.",
  },
  {
    title: "TACT", popup: "Haptic Navigation Sleeve", image: "proj-tact.png", x: 203, y: 2282, w: 843, h: 497,
    text: "Crowded places are where white canes help least. TACT is a wearable sleeve that tells a visually impaired user where the crowd is through directional vibration, without another device to hold.\n\nFour feedback zones map crowd density in front, behind, left and right, so the user can pick the clearer path. A second mode is designed to switch from crowd guidance to immediate obstacle warnings when something is directly in the way.\n\nTACT went past the concept stage: it's a wearable prototype with 3D-printed housings and on-arm electronics, so we could test the feedback on a real arm instead of imagining it.",
    links: [{ label: "click here to view more", href: "https://drive.google.com/drive/folders/15_GmWqlWNvkfqjTq2r73ghb-PcJ0zB5f?usp=sharing" }],
  },
  {
    title: "Redesign Google classroom", image: "proj-google-classroom.png", fit: "contain", x: 1070, y: 2739, w: 412, h: 496,
    text: "Google Classroom is built for handing out and submitting work, not for learning. Students struggle to see what's due, and teachers can't see who's falling behind.\n\nI redesigned it around both users. Students get a dashboard with assignments sorted into upcoming, completed and overdue, a schedule view, an activity feed, progress and rewards, and an AI study assistant. Teachers get an engagement dashboard and analytics to spot students who need help. All of it uses a card-based layout in Google's own colours, with readable type, reduced cognitive load and a dark mode. I prototyped each screen as an interactive flow.",
    links: [{ label: "click here to view more", href: "assets/pdf/google-classroom-redesign.pdf" }],
  },
  {
    title: "Menu Influence", image: "proj-menu-influence.png", video: "menu-influence.mp4", x: 203, y: 2801, w: 412, h: 434,
    text: "A menu is a user interface you hold in your hand. This ethnographic study looks at how its design shapes what people order.\n\nI studied cafés at three price points: premium in Connaught Place, mid-range in Netaji Subhash Place, and local cafés in Rohini. I compared printed and QR menus using contextual inquiry, observation, think-aloud sessions, interviews and a survey, then structured the findings with AEIOU and empathy maps. Premium menus use hierarchy and highlights to nudge exploration, mid-range menus optimise for quick decisions, and local menus rely on habit and price. Layout, imagery and placement steer choices without people noticing.",
    links: [{ label: "click here to view more", href: "assets/pdf/menu-influence.pdf" }],
  },
  {
    title: "Agnirva - ISRO", image: "proj-agnivira.png", video: "agnivira.mp4", x: 634, y: 2801, w: 412, h: 434,
    text: "Space Education for Bharat is the project from my design internship at Agnirva, an ISRO initiation program (May–Aug 2026). Indian students are curious about Chandrayaan, rockets and satellites, but most material is scattered, technical and English-heavy, and teachers rarely get anything they can use in class.\n\nI designed the product for Class 8–12 learners in government, rural and regional-language schools. I worked through 6 deliverables: business requirements, research, quality criteria, product spec, stakeholder communication and localization. The result is a set of source-backed learning modules with visual explainers, student activity cards, teacher quick-use guides, a Hindi–English glossary and low-bandwidth formats. Every fact is checked against ISRO, NASA or NCERT sources, and every module has a clear learning outcome.",
  },
  {
    title: "Printies", popup: "3d prints", image: "printies-1.jpg",
    slides: ["img/printies-1.jpg", "img/printies-2.jpg", "img/printies-3.jpg", "img/printies-4.jpg", "img/printies-5.jpg"], x: 203, y: 3257, w: 412, h: 712,
    text: "Printies is my collection of 3D prints: character figurines, a scaled dragon, a caped bust and an articulated flexi creature whose segments actually move.\n\nPrinting them taught me things a screen can't, like how orientation, supports and tolerances decide whether a print survives, and how small changes in proportion change how friendly an object feels. A lot of that feeds back into my product design work.",
  },
  {
    title: "SEVA FIRST", image: "proj-seva-first.png",
    slides: ["img/proj-seva-first.png", "slides/seva-01.jpg", "slides/seva-02.jpg", "slides/seva-03.jpg", "slides/seva-04.jpg", "slides/seva-05.jpg", "slides/seva-v1.mp4"], x: 633, y: 3257, w: 412, h: 343,
    text: "SEVA First is a Delhi-NCR social impact challenge that drew 9,000+ registrations. I designed its whole identity and digital presence.\n\nI made the logo, flyers and on-site backdrop, and did the UI/UX for the 20+ page competition website, which went live during the event. Beyond design, I helped structure tasks, evaluation criteria and the budget for the December 2026 edition. Ashish Banerjee, Technology Evangelist, recommended me on LinkedIn for this work.",
    links: [{ label: "click here to view more", href: "https://sewafirstryic.dtu.ac.in/" }],
  },
  {
    title: "Panha", image: "proj-panha.png", x: 633, y: 3622, w: 412, h: 343,
    text: "Panha is a college-incubated mental health initiative. I led its digital product from first concept to developer handoff.\n\nI designed the website and several pitch decks that explain its vision, product direction and value proposition to partners and supporters. The challenge was making a sensitive subject feel warm and trustworthy while keeping the story clear for an early-stage audience.",
    links: [{ label: "click here to view more", href: "https://www.panhacare.com/" }],
  },
];
