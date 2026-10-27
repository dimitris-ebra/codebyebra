document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

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

  // --- Scroll-linked effects (header, progress bar, parallax, testimonial) ---
  const header = document.querySelector(".site-header");
  const showcase = document.getElementById("showcase");
  const phoneWrap = document.querySelector(".phone-wrap");
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
    if (reducedMotion) return;

    const rect = showcase.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom > 0 && rect.top < vh) {
      // -1 (showcase centred above viewport) … 1 (below); the phone drifts against the scroll
      const offset = (rect.top + rect.height / 2 - vh / 2) / vh;
      phoneWrap.style.setProperty("--py", `${(offset * 70).toFixed(1)}px`);
    }
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

    // Showcase: devices tilt toward the cursor, glow follows it
    const devices = showcase.querySelector(".devices");
    showcase.addEventListener("pointermove", (e) => {
      const r = showcase.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      devices.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
      devices.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
      showcase.style.setProperty("--mx", `${e.clientX - r.left}px`);
      showcase.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
    showcase.addEventListener("pointerleave", () => {
      devices.style.setProperty("--ry", "0deg");
      devices.style.setProperty("--rx", "0deg");
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

  // --- Walkthrough Video ---
  const inlineVideo = document.querySelector(".laptop-video");
  const videoDialog = document.getElementById("videoDialog");
  const dialogVideo = videoDialog.querySelector("video");
  let inlineInView = false;

  function playInline() {
    if (reducedMotion || videoDialog.open) return;
    const attempt = inlineVideo.play();
    if (attempt) attempt.catch(() => {});
  }

  // Only play (and download) the inline loop while it is on screen
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        inlineInView = entry.isIntersecting;
        if (inlineInView) playInline();
        else inlineVideo.pause();
      },
      { threshold: 0.35 }
    ).observe(inlineVideo);
  }

  document.querySelectorAll("[data-open-video]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      inlineVideo.pause();
      if (inlineVideo.currentTime > 0) dialogVideo.currentTime = inlineVideo.currentTime;
      videoDialog.showModal();
      const attempt = dialogVideo.play();
      if (attempt) attempt.catch(() => {});
    });
  });

  videoDialog.querySelector("[data-close-video]").addEventListener("click", () => videoDialog.close());
  // Clicking the dimmed backdrop closes the dialog
  videoDialog.addEventListener("click", (e) => {
    if (e.target === videoDialog) videoDialog.close();
  });
  videoDialog.addEventListener("close", () => {
    dialogVideo.pause();
    if (inlineInView) playInline();
  });

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

  translateToggle.addEventListener("click", () => {
    const showEnglish = quoteEn.hidden;
    quoteEn.hidden = !showEnglish;
    quoteEl.hidden = showEnglish;
    translateToggle.setAttribute("aria-pressed", String(showEnglish));
    translateToggle.textContent = showEnglish ? "Show original (Greek)" : "Show English translation";
    updateQuote();
  });

  // --- Contact Form (Formspree) ---
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formStatus.className = "form-status";
    formStatus.textContent = "Sending…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.reset();
      formStatus.classList.add("is-success");
      formStatus.textContent = "Thanks — your message is on its way. I'll reply by email.";
    } catch (err) {
      formStatus.classList.add("is-error");
      formStatus.textContent = "Something went wrong. Please try again, or reach me on LinkedIn.";
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
    1: { className: "is-available", text: "Available for new projects" },
    0: { className: "is-unavailable", text: "Not taking new projects" },
    unknown: { className: "is-unknown", text: "Availability unknown" },
  };

  function renderStatus(state) {
    statusEls.forEach((el) => {
      el.classList.remove("is-available", "is-unavailable", "is-unknown");
      el.classList.add(state.className);
      el.querySelector("[data-status-text]").textContent = state.text;
    });
  }

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
