(async () => {
  const bookEl = document.getElementById("book");
  const stage = document.getElementById("stage");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const indicator = document.getElementById("indicator");

  // Typsnitten måste vara laddade innan långa texter mäts upp och delas på sidor
  async function loadFonts() {
    if (!document.fonts) return;
    const wanted = ['400 1em "Cormorant Garamond"', 'italic 400 1em "Cormorant Garamond"', '600 1em "Cormorant Garamond"'];
    await Promise.race([
      Promise.all(wanted.map(f => document.fonts.load(f))).then(() => document.fonts.ready),
      new Promise(r => setTimeout(r, 3000)),
    ]).catch(() => {});
  }

  // Delar upp sidor med flow: true på så många sidor som behövs.
  // All text skalar med sidbredden, så uppdelningen blir densamma på alla skärmar.
  function paginate(list) {
    if (!list.some(p => p.flow)) return list;
    const probe = document.createElement("div");
    probe.className = "leaf";
    probe.style.visibility = "hidden";
    probe.innerHTML = `<div class="page front"><div class="page-inner"></div></div>`;
    bookEl.append(probe);
    const inner = probe.querySelector(".page-inner");
    const cs = getComputedStyle(inner);
    const maxH = (inner.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)) * 0.97;

    const out = [];
    for (const page of list) {
      if (!page.flow) { out.push(page); continue; }
      const tpl = document.createElement("template");
      tpl.innerHTML = page.html.trim();
      const source = tpl.content.firstElementChild;
      const queue = [...source.children];
      let wrap;
      const startPage = cont => {
        wrap = source.cloneNode(false);
        if (cont) wrap.classList.add("flow-cont");
        inner.replaceChildren(wrap);
      };
      let first = true;
      const flush = () => {
        out.push({ ...page, flow: false, html: wrap.outerHTML, title: first ? page.title : undefined });
        first = false;
      };
      const fits = () => wrap.offsetHeight <= maxH;

      startPage(false);
      while (queue.length) {
        const block = queue.shift();
        wrap.append(block);
        if (fits()) continue;
        const alone = wrap.children.length === 1;
        block.remove();

        // Hälsning o.d. får inte hamna ensam – ta med föregående stycke till nästa sida
        if (block.classList.contains("keep-with-prev") && wrap.children.length > 1) {
          const prev = wrap.lastElementChild;
          prev.remove();
          flush();
          startPage(true);
          queue.unshift(prev, block);
          continue;
        }

        // Vanligt textstycke: dela mitt i stycket på ordgräns
        const words = block.children.length === 0 ? block.textContent.trim().split(/\s+/) : [];
        let n = 0;
        if (words.length > 1) {
          const part = block.cloneNode(false);
          wrap.append(part);
          let lo = 0, hi = words.length - 1;
          while (lo < hi) {
            const mid = Math.ceil((lo + hi) / 2);
            part.textContent = words.slice(0, mid).join(" ");
            if (fits()) lo = mid; else hi = mid - 1;
          }
          n = lo < 4 && !alone ? 0 : lo; // lämna inte bara ett par ord kvar längst ner
          if (n) part.textContent = words.slice(0, n).join(" "); else part.remove();
        }
        if (alone && !n) { wrap.append(block); continue; } // får inte plats ens ensam – låt den vara
        flush();
        startPage(true);
        if (n) {
          const rest = block.cloneNode(false);
          rest.textContent = words.slice(n).join(" ");
          rest.classList.add("continued");
          queue.unshift(rest);
        } else {
          queue.unshift(block);
        }
      }
      flush();
    }
    probe.remove();
    return out;
  }

  // ---------- Layout: uppslag (två sidor) eller en sida i taget ----------
  const TURN_MS = 900;
  const root = document.documentElement;
  let mode = null;

  function measure() {
    const W = window.innerWidth;
    const H = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const reserve = H < 520 ? 76 : 140; // plats för knappar och tips
    const spread = Math.min(W * 0.46, (H - reserve) * 0.7);
    if (spread >= 300) return { mode: "double", pw: spread };
    return { mode: "single", pw: Math.min(W - 32, (H - reserve) * 0.7, 560) };
  }

  function applySize() {
    const m = measure();
    root.style.setProperty("--pw", `${Math.floor(m.pw)}px`);
    root.style.setProperty("--ph", `${Math.floor(m.pw / 0.7)}px`);
    return m.mode;
  }

  applySize();
  await loadFonts();
  const pages = paginate(BOOK.pages.map(p => (typeof p === "string" ? { html: p } : p)));
  if (pages.length % 2) pages.splice(pages.length - 1, 0, { html: "" });

  // Sidnummer: räkna bara inlagan (inte pärmar och försättsblad)
  let folio = 0;
  pages.forEach((p, i) => {
    p.index = i;
    const isPlain = !p.class && i > 0 && i < pages.length - 1;
    if (isPlain) folio++;
    p.folioNo = isPlain && i > 2 && p.folio !== false ? folio : null; // ingen siffra på titelsidan
  });

  // Innehållsförteckning med sidnummer
  const tocPage = pages.find(p => p.toc);
  if (tocPage) {
    const rows = pages.filter(p => p.title).map(p =>
      `<li data-goto="${p.index}"><span>${p.title}</span><span></span><span>${p.folioNo || ""}</span></li>`).join("");
    tocPage.html = `<div class="toc-page"><h2>Texts</h2><ul class="toc">${rows}</ul></div>`;
  }

  // I enkelsidesläget hoppar vi över försättsblad och tomma sidor
  const singlePages = pages.filter(p => p.class !== "endpaper" && (p.html || "").trim());

  function makePage(page, side) {
    const el = document.createElement("div");
    el.className = `page ${side} ${page ? page.class || "" : "blank"}`.trim();
    if (page) {
      el.innerHTML = `<div class="page-inner">${page.html || ""}</div>` +
        (page.folioNo ? `<div class="folio">${page.folioNo}</div>` : "");
    }
    return el;
  }

  let leaves = [];
  let current = 0;
  let anchor = Math.max(parseInt(location.hash.slice(1), 10) || 0, 0); // index i pages som visas

  function build() {
    bookEl.classList.add("no-anim");
    bookEl.classList.toggle("single", mode === "single");
    bookEl.replaceChildren();
    leaves = [];
    if (mode === "double") {
      for (let i = 0; i < pages.length / 2; i++) {
        leaves.push(makeLeaf(makePage(pages[2 * i], "front"), makePage(pages[2 * i + 1], "back")));
      }
      current = Math.min(Math.ceil(anchor / 2), leaves.length);
    } else {
      singlePages.forEach(p => leaves.push(makeLeaf(makePage(p, "front"), makePage(null, "back"))));
      const i = singlePages.findIndex(p => p.index >= anchor);
      current = i < 0 ? singlePages.length - 1 : i;
    }
    document.querySelector(".hint").textContent = mode === "single"
      ? "Tap or swipe to turn the page"
      : "Tap the pages, swipe, or use the arrow keys";
    render();
    requestAnimationFrame(() => requestAnimationFrame(() => bookEl.classList.remove("no-anim")));
  }

  function makeLeaf(front, back) {
    const leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.append(front, back);
    leaf.addEventListener("click", e => {
      if (Date.now() - lastSwipe < 400) return;
      const link = e.target.closest("[data-goto]");
      if (link) { jumpTo(+link.dataset.goto); return; }
      if (mode === "single") {
        const r = bookEl.getBoundingClientRect();
        go(e.clientX < r.left + r.width * 0.3 ? -1 : 1);
      } else {
        go(leaf.classList.contains("flipped") ? -1 : 1);
      }
    });
    bookEl.append(leaf);
    return leaf;
  }

  // Dubbelläge: current = antal vända blad (0 = framsida, sista = baksida)
  // Enkelläge:  current = vilken sida som visas
  const maxCurrent = () => (mode === "double" ? leaves.length : leaves.length - 1);

  function render() {
    const n = leaves.length;
    leaves.forEach((leaf, i) => {
      const flipped = i < current;
      leaf.classList.toggle("flipped", flipped);
      leaf.style.zIndex = flipped ? i + 1 : n - i;
    });
    const last = maxCurrent();
    bookEl.dataset.state = current === 0 ? "closed-front" : current === last ? "closed-back" : "open";
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === last;
    indicator.textContent =
      current === 0 ? "Cover" :
      current === last ? "Back cover" :
      `${current} of ${last - 1}`;
    anchor = mode === "double" ? Math.max(current * 2 - 1, 0) : singlePages[current].index;
    history.replaceState(null, "", anchor ? `#${anchor}` : location.pathname + location.search);
  }

  function jumpTo(index) {
    current = mode === "double"
      ? Math.min(Math.ceil(index / 2), leaves.length)
      : Math.max(singlePages.findIndex(p => p.index >= index), 0);
    render();
  }

  function go(dir) {
    const target = current + dir;
    if (target < 0 || target > maxCurrent()) return;
    const leaf = leaves[dir > 0 ? current : current - 1];
    leaf.classList.add("turning");
    clearTimeout(leaf._t);
    leaf._t = setTimeout(() => leaf.classList.remove("turning"), TURN_MS);
    current = target;
    render();
  }

  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
    if (e.key === "Home") { current = 0; render(); }
    if (e.key === "End") { current = maxCurrent(); render(); }
  });

  // Svep på pekskärm
  let startX = null, startY = 0, lastSwipe = 0;
  stage.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    startX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { lastSwipe = Date.now(); go(dx < 0 ? 1 : -1); }
  });

  // Rotation / storleksändring: byt läge vid behov
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const next = applySize();
      if (next !== mode) { mode = next; build(); }
    }, 120);
  }
  window.addEventListener("resize", onResize);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", onResize);

  mode = applySize();
  build();
})();
