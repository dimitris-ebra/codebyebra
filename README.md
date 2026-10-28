# codebyebra

Portfolio of Dimitris Ebrahim. Plain HTML, CSS and JavaScript with no build step.
Every push to `main` is deployed to GitHub Pages by `.github/workflows/static.yml`.

| File              | What it holds                                                  |
| ----------------- | -------------------------------------------------------------- |
| `index.html`      | All page content, in English                                   |
| `translations.js` | The Greek version of every marked piece of text               |
| `style.css`       | Design tokens (light/dark), layout, animation                  |
| `script.js`       | Language switch, theme, smooth scrolling, reveals, contact form |

Run it locally with any static server, for example:

```bash
python -m http.server 5173
```

## Adding a project

Each project in the **Work** section is one `<article class="case">`. Cases number themselves
(01, 02, …) in the order they appear, so put the newest one first.

1. Pick a short slug, e.g. `acme`. Use it for the article `id`, the title `id` and the
   `case.acme.*` translation keys.
2. Paste the template below into the Work section of `index.html`, right after the section's
   `</header>`, and fill it in.
3. Choose the media inside `.showcase-media` (it fills a 16:9 frame):
   - **Video embed** (Streamable, YouTube…):
     `<iframe src="https://streamable.com/e/ID" title="acme.com presentation video" allow="fullscreen" allowfullscreen loading="lazy"></iframe>`
   - **Screenshot**: `<img src="assets/acme.webp" alt="…" loading="lazy" decoding="async" />`
   - **Silent loop**: `<video src="assets/acme.mp4" muted loop playsinline autoplay></video>`

   For other shapes add `style="--ratio: 4 / 3"` to `.showcase-media`; `--media-bg` sets the
   colour shown while it loads.
4. Add the Greek text to `translations.js` under a `// Case: acme` comment (example below).
   Shared labels such as Client, Role, Stack, Links, Visit site and Source code are already
   translated as `work.*` keys.
5. Delete any optional part you don't need: the feature list, the links or status row, the
   testimonial, or the "Read the full case study" section.
6. After changing `style.css`, `script.js` or `translations.js`, bump their `?v=` number in
   `index.html` so visitors get the new files.

### Template

```html
<!-- Case: acme.com -->
<article class="case" id="acme" aria-labelledby="acme-title">
   <div class="showcase reveal">
      <div class="showcase-bar">
         <span><span class="case-num" aria-hidden="true"></span>acme.com</span>
         <span data-i18n="case.acme.note">Live site</span>
      </div>

      <div class="showcase-media">
         <img src="assets/acme.webp" width="1600" height="900" loading="lazy" decoding="async"
            alt="The acme.com home page" data-i18n-attr="alt:case.acme.mediaAlt" />
      </div>

      <ul class="showcase-modules" aria-label="Key features" data-i18n-attr="aria-label:work.features">
         <li data-i18n="case.acme.feature.booking">Online booking</li>
         <li data-i18n="case.acme.feature.admin">Admin panel</li>
      </ul>
   </div>

   <div class="case-body reveal">
      <div class="case-intro">
         <p class="case-kicker" data-i18n="case.acme.kicker">Freelance &middot; 2027</p>
         <h3 class="case-title" id="acme-title">acme.com</h3>
         <p data-i18n="case.acme.intro">What it is, who it is for, and what you built.</p>
      </div>

      <dl class="case-meta">
         <div>
            <dt data-i18n="work.meta.client">Client</dt>
            <dd>Acme Ltd</dd>
         </div>
         <div>
            <dt data-i18n="work.meta.role">Role</dt>
            <dd data-i18n="case.acme.role">Design &amp; development</dd>
         </div>
         <div>
            <dt data-i18n="work.meta.stack">Stack</dt>
            <dd>Python, Flask, SQLite</dd>
         </div>
         <!-- Status: is-available = green dot, is-unavailable = amber dot -->
         <div>
            <dt data-i18n="work.meta.status">Status</dt>
            <dd><span class="status is-available"><span class="status-dot" aria-hidden="true"></span><span data-i18n="case.acme.status">Live</span></span></dd>
         </div>
         <div>
            <dt data-i18n="work.meta.links">Links</dt>
            <dd class="case-links">
               <a href="https://acme.com" target="_blank" rel="noopener noreferrer"><span data-i18n="work.visit">Visit site</span> &nearr;</a>
               <a href="https://github.com/dimitris-ebra/acme" target="_blank" rel="noopener noreferrer"><span data-i18n="work.source">Source code</span> &nearr;</a>
            </dd>
         </div>
      </dl>
   </div>

   <!-- Optional: client quote. The original goes first with its lang; the translation stays
        hidden, and a button to show it appears only when the original isn't in the page language. -->
   <figure class="testimonial">
      <blockquote>
         <p lang="en" data-quote="original">&ldquo;The quote, in the client&rsquo;s own words.&rdquo;</p>
         <p lang="el" data-quote="translation" hidden>&ldquo;Η μετάφραση του σχολίου.&rdquo;</p>
      </blockquote>
      <figcaption>
         <span>Client Name &mdash; <span data-i18n="case.acme.quoteRole">Founder, Acme</span></span>
         <button type="button" class="text-btn" data-quote-toggle aria-pressed="false">Show translation</button>
      </figcaption>
   </figure>

   <!-- Optional: the longer write-up -->
   <details class="case-more reveal">
      <summary>
         <span data-i18n="work.more">Read the full case study</span>
         <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
         </svg>
      </summary>
      <div class="case-more-body">
         <div>
            <h4 data-i18n="case.acme.brief.title">The brief</h4>
            <p data-i18n="case.acme.brief.text">…</p>
         </div>
         <div>
            <h4 data-i18n="case.acme.learned.title">What I learned</h4>
            <p data-i18n="case.acme.learned.text">…</p>
         </div>
      </div>
   </details>
</article>
```

### Greek text for the template

```js
    // Case: acme.com
    "case.acme.note": "Ζωντανός ιστότοπος",
    "case.acme.mediaAlt": "Η αρχική σελίδα του acme.com",
    "case.acme.feature.booking": "Online κρατήσεις",
    "case.acme.feature.admin": "Πίνακας διαχείρισης",
    "case.acme.kicker": "Freelance &middot; 2027",
    "case.acme.intro": "Τι είναι, για ποιον είναι και τι δημιούργησα.",
    "case.acme.role": "Σχεδιασμός &amp; ανάπτυξη",
    "case.acme.status": "Online",
    "case.acme.quoteRole": "Ιδρυτής, Acme",
    "case.acme.brief.title": "Το ζητούμενο",
    "case.acme.brief.text": "…",
    "case.acme.learned.title": "Τι έμαθα",
    "case.acme.learned.text": "…",
```

Anything without a Greek entry falls back to the English in `index.html`, so a missing key never
breaks the page; it just stays in English.
