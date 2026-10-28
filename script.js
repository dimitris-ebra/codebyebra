document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // --- Language (English / Greek) ---
  // English copy lives in the HTML; Greek comes from translations.js. Elements
  // opt in with data-i18n="key" (inner HTML) or data-i18n-attr="attr:key;…".
  const translations = window.TRANSLATIONS || { en: {}, el: {} };
  const i18nEls = document.querySelectorAll("[data-i18n]");
  const i18nAttrEls = document.querySelectorAll("[data-i18n-attr]");
  const langButtons = document.querySelectorAll("[data-set-lang]");
  const metaDescription = document.querySelector('meta[name="description"]');
  const languageListeners = [];
  let lang = root.getAttribute("lang") === "el" ? "el" : "en";
  let splitReady = false;

  const attrPairs = (el) => el.dataset.i18nAttr.split(";").map((pair) => pair.split(":"));

  // Remember the English originals before anything is translated or split
  i18nEls.forEach((el) => {
    translations.en[el.dataset.i18n] ??= el.innerHTML.trim();
  });
  i18nAttrEls.forEach((el) => {
    attrPairs(el).forEach(([attr, key]) => (translations.en[key] ??= el.getAttribute(attr)));
  });
  translations.en["meta.title"] ??= document.title;
  translations.en["meta.description"] ??= metaDescription.content;

  function t(key) {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  }

  function applyLanguage(next) {
    lang = next;
    root.setAttribute("lang", lang);
    document.title = t("meta.title");
    metaDescription.setAttribute("content", t("meta.description"));

    i18nEls.forEach((el) => {
      el.innerHTML = t(el.dataset.i18n);
      if (splitReady && el.classList.contains("split")) splitText(el, "words", "w");
    });
    i18nAttrEls.forEach((el) => {
      attrPairs(el).forEach(([attr, key]) => el.setAttribute(attr, t(key)));
    });
    langButtons.forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.setLang === lang)));
    languageListeners.forEach((fn) => fn());
  }

  function setLanguage(next) {
    if (next === lang) return;
    try {
      localStorage.setItem("lang", next);
    } catch (e) {}

    // Keep a shared ?lang= link in step with the visitor's choice
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", next);
      history.replaceState(null, "", url);
    }

    if (reducedMotion) {
      applyLanguage(next);
      return;
    }
    // Fade the page out, swap the copy, fade back in
    root.classList.add("is-switching-lang");
    setTimeout(() => {
      applyLanguage(next);
      root.classList.remove("is-switching-lang");
    }, 220);
  }

  langButtons.forEach((btn) => btn.addEventListener("click", () => setLanguage(btn.dataset.setLang)));
  if (lang !== "en") applyLanguage(lang);
  root.classList.add("i18n-ready");

  // --- Theme Toggle ---
  const themeToggle = document.getElementById("themeToggle");
  const themeColor = { light: "#f6f5f0", dark: "#0c0c0b" };

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", themeColor[theme]);
    });
  }

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });

  // Follow the OS setting until the visitor picks a theme themselves
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    let saved = null;
    try {
      saved = localStorage.getItem("theme");
    } catch (err) {}
    if (!saved) applyTheme(e.matches ? "dark" : "light");
  });

  // --- Mobile Menu ---
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function setMenu(open) {
    mobileMenu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", t(open ? "menu.close" : "menu.open"));
  }

  setMenu(false);
  languageListeners.push(() => setMenu(!mobileMenu.hidden));
  menuToggle.addEventListener("click", () => setMenu(mobileMenu.hidden));
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobileMenu.hidden) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  window.matchMedia("(min-width: 721px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  // --- Split Text (word / character reveals) ---
  // Wraps each word (or character) of an element's text in a span with an
  // index, keeping nested elements like <em> intact. Non-breaking spaces stay
  // inside a word so "to&nbsp;end." animates as one piece.
  function splitText(el, mode, className) {
    let index = 0;

    function walk(node) {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
          return;
        }
        if (child.nodeType !== Node.TEXT_NODE) return;

        const pieces = mode === "chars" ? [...child.textContent] : child.textContent.split(/([ \t\r\n]+)/);
        const frag = document.createDocumentFragment();
        pieces.forEach((piece) => {
          if (!piece) return;
          if (/^[ \t\r\n]+$/.test(piece)) {
            frag.append(" ");
            return;
          }
          const span = document.createElement("span");
          span.className = className;
          span.style.setProperty("--i", index++);
          span.textContent = piece;
          frag.append(span);
        });
        child.replaceWith(frag);
      });
    }

    walk(el);
    return index;
  }

  document.querySelectorAll(".split").forEach((el) => splitText(el, "words", "w"));
  document.querySelectorAll(".split-chars").forEach((el) => splitText(el, "chars", "c"));
  document.querySelectorAll(".testimonial blockquote p").forEach((el) => splitText(el, "words", "tw"));
  splitReady = true;

  // Index children for staggered reveals
  document.querySelectorAll(".stagger, .hero-meta, .showcase-modules").forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty("--i", i));
  });

  // --- Hero Load-in ---
  const hero = document.querySelector(".hero");
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("is-loaded")));

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll(".reveal, .stagger, .section-head, .footer-mark");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // --- Scrollspy (highlight the nav link for the section in view) ---
  const navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove("is-active"));
            link.classList.add("is-active");
          } else {
            link.classList.remove("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((section) => spy.observe(section));
  }

  // --- Scroll-linked effects (header, progress bar, testimonial) ---
  const header = document.querySelector(".site-header");
  const quote = document.querySelector(".testimonial blockquote");
  let ticking = false;

  function updateQuote() {
    const visible = quote.querySelector("p:not([hidden])");
    const words = visible.querySelectorAll(".tw");
    const rect = quote.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the quote's top reaches 85% of the viewport, 1 when its bottom reaches 50%
    const progress = Math.min(Math.max((vh * 0.85 - rect.top) / (vh * 0.35 + rect.height), 0), 1);
    const lit = Math.round(progress * words.length);
    words.forEach((word, i) => word.classList.toggle("is-lit", i < lit));
  }

  function onScroll() {
    ticking = false;
    const scrollY = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    header.classList.toggle("is-scrolled", scrollY > 8);
    header.style.setProperty("--progress", max > 0 ? (scrollY / max).toFixed(4) : 0);

    updateQuote();
  }

  function requestScrollUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }

  onScroll();
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);

  // --- Pointer effects (desktop only) ---
  if (finePointer) {
    // Hero: accent dots light up around the cursor
    const heroGrid = document.querySelector(".hero-grid");
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      heroGrid.style.setProperty("--mx", `${e.clientX - r.left}px`);
      heroGrid.style.setProperty("--my", `${e.clientY - r.top}px`);
      heroGrid.style.setProperty("--spot", 1);
    });
    hero.addEventListener("pointerleave", () => heroGrid.style.setProperty("--spot", 0));
  }

  if (finePointer && !reducedMotion) {

    // Showcase: the accent glow follows the cursor
    const showcase = document.getElementById("showcase");
    showcase.addEventListener("pointermove", (e) => {
      const r = showcase.getBoundingClientRect();
      showcase.style.setProperty("--mx", `${e.clientX - r.left}px`);
      showcase.style.setProperty("--my", `${e.clientY - r.top}px`);
    });

    // Buttons lean toward the cursor
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty("--tx", `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px`);
        btn.style.setProperty("--ty", `${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.removeProperty("--tx");
        btn.style.removeProperty("--ty");
      });
    });
  }

  // --- Local Time (Greece) ---
  const timeEls = document.querySelectorAll("[data-local-time]");
  const timeFormat = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Athens",
  });

  function updateTime() {
    const now = timeFormat.format(new Date());
    timeEls.forEach((el) => (el.textContent = now));
  }

  updateTime();
  setInterval(updateTime, 30000);

  // --- Testimonial Translation ---
  const translateToggle = document.getElementById("translateToggle");
  const quoteEl = document.querySelector('[data-quote="el"]');
  const quoteEn = document.querySelector('[data-quote="en"]');

  function showQuote(english) {
    quoteEn.hidden = !english;
    quoteEl.hidden = english;
    translateToggle.setAttribute("aria-pressed", String(english));
    translateToggle.textContent = t(english ? "quote.showOriginal" : "quote.showTranslation");
    updateQuote();
  }

  translateToggle.addEventListener("click", () => showQuote(quoteEn.hidden));

  // The quote is already in Greek, so the Greek site needs no translation button
  function syncQuoteToLanguage() {
    translateToggle.hidden = lang === "el";
    showQuote(false);
  }

  syncQuoteToLanguage();
  languageListeners.push(syncQuoteToLanguage);

  // --- Contact Form (Formspree) ---
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const formLanguage = document.getElementById("formLanguage");
  let formStatusKey = null;

  function setFormStatus(key, state) {
    formStatusKey = key;
    formStatus.className = state ? `form-status is-${state}` : "form-status";
    formStatus.textContent = t(key);
  }

  languageListeners.push(() => {
    if (formStatusKey) formStatus.textContent = t(formStatusKey);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formLanguage.value = lang;
    setFormStatus("form.sending");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.reset();
      setFormStatus("form.success", "success");
    } catch (err) {
      setFormStatus("form.error", "error");
    } finally {
      submitBtn.disabled = false;
    }
  });

  // --- Footer Year ---
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // --- Work Status (from gist) ---
  const statusEls = document.querySelectorAll("[data-status]");
  const gistUrl = "https://gist.githubusercontent.com/dimitris-ebra/2134ebcba345065c106b393cfc3dab64/raw/status.txt";

  const statusStates = {
    1: { className: "is-available", key: "status.available" },
    0: { className: "is-unavailable", key: "status.unavailable" },
    unknown: { className: "is-unknown", key: "status.unknown" },
  };
  let currentStatus = { className: "is-unknown", key: "status.checking" };

  function renderStatus(state) {
    currentStatus = state;
    statusEls.forEach((el) => {
      el.classList.remove("is-available", "is-unavailable", "is-unknown");
      el.classList.add(state.className);
      el.querySelector("[data-status-text]").textContent = t(state.key);
    });
  }

  renderStatus(currentStatus);
  languageListeners.push(() => renderStatus(currentStatus));

  async function fetchStatus() {
    try {
      // Bypass cache by adding timestamp
      const response = await fetch(`${gistUrl}?t=${Date.now()}`);
      const text = (await response.text()).trim();
      renderStatus(statusStates[text] || statusStates.unknown);
    } catch (err) {
      renderStatus(statusStates.unknown);
    }
  }

  fetchStatus();
  setInterval(fetchStatus, 60000);
});
