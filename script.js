document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById("menu-btn");
  const menuIcon = document.getElementById("menu-icon");
  const mobileNav = document.getElementById("mobile-nav");

  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");

    if (mobileNav.classList.contains("hidden")) {
      menuIcon.classList.replace("bi-x", "bi-list");
    } else {
      menuIcon.classList.replace("bi-list", "bi-x");
    }
  });

  // --- Smooth Scroll Function (reusable) ---
  function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY || window.pageYOffset;
    const diff = targetY - startY;
    let startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // easeInOutCubic
      const ease =
        progress < 0.5 ?
        4 * progress * progress * progress :
        1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + diff * ease);

      if (timeElapsed < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // --- Anchor Links Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        smoothScrollTo(target.offsetTop, 600);
      }
    });
  });

  // --- Go To Top Button ---
  const goTopBtn = document.getElementById("goTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      goTopBtn.classList.add("show");
      goTopBtn.classList.remove("hide");
    } else {
      goTopBtn.classList.add("hide");
      goTopBtn.classList.remove("show");
    }
  });

  goTopBtn.addEventListener("click", () => {
    smoothScrollTo(0, 600);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const statusWrapper = document.getElementById("work-status");
  const statusDot = document.getElementById("status-dot");
  const statusText = document.getElementById("status-text");

  // ✅ Direct gist raw URL
  const gistUrl = "https://gist.githubusercontent.com/dimitris-ebra/2134ebcba345065c106b393cfc3dab64/raw/status.txt";

  async function fetchStatus() {
    try {
      // Bypass cache by adding timestamp
      const response = await fetch(`${gistUrl}?t=${Date.now()}`);
      let text = await response.text();

      text = text.trim(); // Normalize input

      console.log("Fetched status value:", JSON.stringify(text));

      if (text === "1") {
        statusWrapper.className = "available";
        statusText.textContent = "Available For Work";
      } else if (text === "0") {
        statusWrapper.className = "unavailable";
        statusText.textContent = "Unavailable For Work";
      } else {
        statusWrapper.className = "unknown";
        statusText.textContent = "Unknown";
      }
    } catch (err) {
      console.error("Error fetching status:", err);
      statusWrapper.className = "unknown";
      statusText.textContent = "Unknown";
    }
  }

  fetchStatus();
  setInterval(fetchStatus, 60000);
});

const originalTitle = document.title;

window.addEventListener("blur", () => {
  document.title = "💜 Come back, I miss you! 💜";
});

window.addEventListener("focus", () => {
  document.title = originalTitle;
});

const brandEl = document.getElementById("brand");
const brandText = "CodeByEbra";
let i = 0;

function typeBrand() {
  if (i < brandText.length) {
    brandEl.textContent += brandText.charAt(i);
    i++;
    setTimeout(typeBrand, 80); // typing speed
  }
}

document.addEventListener("DOMContentLoaded", () => {
  brandEl.textContent = ""; // make sure it's empty
  typeBrand();
});


const devQuotes = [{
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds"
  },
  {
    quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson"
  },
  {
    quote: "Good code is its own best documentation.",
    author: "Steve McConnell"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    quote: "Premature optimization is the root of all evil.",
    author: "Donald Knuth"
  },
  {
    quote: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman"
  },
  {
    quote: "Code never lies, comments sometimes do.",
    author: "Ron Jeffries"
  },
  {
    quote: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde"
  },
  {
    quote: "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
    author: "Edsger W. Dijkstra"
  },
  {
    quote: "Walking on water and developing software from a specification are easy if both are frozen.",
    author: "Edward V. Berard"
  },
  {
    quote: "Before software can be reusable it first has to be usable.",
    author: "Ralph Johnson"
  },
  {
    quote: "Make it work, make it right, make it fast.",
    author: "Kent Beck"
  },
  {
    quote: "It’s not a bug – it’s an undocumented feature.",
    author: "Anonymous"
  },
  {
    quote: "There are only two kinds of languages: the ones people complain about and the ones nobody uses.",
    author: "Bjarne Stroustrup"
  },
  {
    quote: "The most disastrous thing that you can ever learn is your first programming language.",
    author: "Alan Kay"
  },
  {
    quote: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
    author: "Bill Gates"
  },
  {
    quote: "Controlling complexity is the essence of computer programming.",
    author: "Brian Kernighan"
  },
  {
    quote: "Programming isn’t about what you know; it’s about what you can figure out.",
    author: "Chris Pine"
  },
  {
    quote: "Deleted code is debugged code.",
    author: "Jeff Sickel"
  },
  {
    quote: "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
    author: "Anonymous"
  },
  {
    quote: "The most important property of a program is whether it accomplishes the intention of its user.",
    author: "C.A.R. Hoare"
  },
  {
    quote: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.",
    author: "Dan Salomon"
  },
  {
    quote: "Programming is learned by writing programs.",
    author: "Brian Kernighan"
  },
  {
    quote: "There is nothing quite so permanent as a quick fix.",
    author: "Anonymous"
  },
  {
    quote: "The best code is no code at all.",
    author: "Jeff Atwood"
  },
  {
    quote: "In theory, theory and practice are the same. In practice, they’re not.",
    author: "Yogi Berra"
  },
  {
    quote: "Without requirements or design, programming is the art of adding bugs to an empty text file.",
    author: "Louis Srygley"
  },
  {
    quote: "Computers are fast; programmers keep them slow.",
    author: "Anonymous"
  },
  {
    quote: "A language that doesn’t affect the way you think about programming is not worth knowing.",
    author: "Alan Perlis"
  },
  {
    quote: "Testing can show the presence of bugs, but not their absence.",
    author: "Edsger W. Dijkstra"
  },
  {
    quote: "Weeks of programming can save you hours of planning.",
    author: "Anonymous"
  },
  {
    quote: "The trouble with programmers is that you can never tell what a programmer is doing until it’s too late.",
    author: "Seymour Cray"
  },
  {
    quote: "Nine people can’t make a baby in a month.",
    author: "Fred Brooks"
  },
  {
    quote: "The best performance improvement is the transition from the nonworking state to the working state.",
    author: "John Ousterhout"
  },
  {
    quote: "A good programmer is someone who always looks both ways before crossing a one-way street.",
    author: "Doug Linder"
  },
  {
    quote: "Programs are meant to be read by humans and only incidentally for computers to execute.",
    author: "Donald Knuth"
  },
  {
    quote: "Without data structures, you can’t do much programming.",
    author: "Robert Floyd"
  },
  {
    quote: "Java is to JavaScript what car is to carpet.",
    author: "Chris Heilmann"
  },
  {
    quote: "It always takes longer than you expect, even when you take into account Hofstadter’s Law.",
    author: "Douglas Hofstadter"
  }
];

function showRandomQuote() {
  const devQuoteP = document.getElementById("dev-quote");
  const random = devQuotes[Math.floor(Math.random() * devQuotes.length)];
  devQuoteP.innerHTML = `"${random.quote}" <b> — ${random.author}</b>`;
}

// Run once on load
showRandomQuote();

// Project Details Toggle Function
function toggleProjectDetails(detailsId, button) {
  const detailsElement = document.getElementById(detailsId);
  const isHidden = detailsElement.classList.contains('hidden');

  if (isHidden) {
    // Show details
    detailsElement.classList.remove('hidden');
    button.innerHTML = 'View Less';
    button.classList.add('expanded');
  } else {
    // Hide details
    detailsElement.classList.add('hidden');
    button.innerHTML = 'View More';
    button.classList.remove('expanded');
  }
}


// 💖 Theme Toggle & Love Mode
const btn = document.getElementById("themeToggle"); // your 💖 button
const emojis = ["💗", "💖", "💞", "💓", "💘"];
let loveInterval;
let modalShown = false; // only show modal once per session

// Modal elements
const loveModal = document.getElementById("loveModal");
const closeModal = document.getElementById("closeModal");
const modalOkay = document.getElementById("modalOkay");

// Spawn a single emoji
function spawnLoveEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("love-emoji");
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // random position anywhere on screen
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = Math.random() * window.innerHeight + "px";
  emoji.style.fontSize = (Math.random() * 1.5 + 1.5) + "rem"; // random size

  document.body.appendChild(emoji);

  // cleanup
  setTimeout(() => emoji.remove(), 4000);
}

// Start spamming emojis
function startLoveSpam() {
  if (!loveInterval) {
    loveInterval = setInterval(spawnLoveEmoji, 250); // adjust for density
  }
}

// Stop spamming
function stopLoveSpam() {
  clearInterval(loveInterval);
  loveInterval = null;
}

// Toggle theme
btn.addEventListener("click", () => {
  document.body.classList.toggle("love-theme");

  if (document.body.classList.contains("love-theme")) {
    startLoveSpam();

    // Show modal only the first time
    if (!modalShown) {
      loveModal.classList.remove("hidden");
      modalShown = true;
    }
  } else {
    stopLoveSpam();
    loveModal.classList.add("hidden"); // ensure modal is hidden when turning off
  }
});

// Modal buttons
closeModal.addEventListener("click", () => {
  loveModal.classList.add("hidden");
});

modalOkay.addEventListener("click", () => {
  loveModal.classList.add("hidden");
});

// Hacker glyphs pool
const hackerGlyphs = ["0", "1", "$", ">", "#", "%", "&"];
let hackerInterval = null;

document.querySelectorAll(".tech-item").forEach(item => {
  item.addEventListener("click", () => {
    // Remove love-theme if present
    document.body.classList.remove("love-theme");
    // Toggle hacker-theme
    const isNow = document.body.classList.toggle("hacker-theme");

    // If hacker-theme now active => start continuous glyphs + indicator
    if (isNow) {
      startGlyphs();
      showHackerModal(); // optional
    } else {
      stopGlyphs();
    }
  });
});

function createHackerGlyph() {
  const glyph = document.createElement("div");
  glyph.classList.add("hacker-emoji");
  glyph.textContent = hackerGlyphs[Math.floor(Math.random() * hackerGlyphs.length)];

  glyph.style.left = Math.random() * window.innerWidth + "px";
  glyph.style.top = Math.random() * window.innerHeight + "px";

  document.body.appendChild(glyph);

  // Remove after animation end
  setTimeout(() => glyph.remove(), 5000);
}

function startGlyphs() {
  if (!hackerInterval) {
    hackerInterval = setInterval(createHackerGlyph, 400); // spawn every 400ms
  }
}

function stopGlyphs() {
  clearInterval(hackerInterval);
  hackerInterval = null;
}

function showHackerModal() {
  const modal = document.createElement("div");
  modal.className = "hacker-modal fixed inset-0 flex items-center justify-center bg-black/80";
  modal.innerHTML = `
    <div class="p-6 bg-black border-2 border-green-400 rounded-xl shadow-lg text-green-400 max-w-sm animate-pulse">
      <h2 class="text-xl font-bold mb-2">Hacker Mode Activated</h2>
      <p class="text-sm">You're inside the Matrix now...</p>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.remove(), 3000);
}

// 🌙 Dark/Light Mode Toggle
const themeSwitch = document.getElementById("themeSwitch");
if (themeSwitch) {
  // Check for saved preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeSwitch.innerHTML = "<i class='bi bi-sun-fill'></i>";
  }

  themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    themeSwitch.innerHTML = isLight ? "<i class='bi bi-sun-fill'></i>" : "<i class='bi bi-moon-stars-fill'></i>";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}
