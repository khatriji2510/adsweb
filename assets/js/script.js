/* ------------------------------
   SEARCH OVERLAY
------------------------------ */
const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");

if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        searchOverlay.style.display = "flex";
    });
}

if (closeSearch) {
    closeSearch.addEventListener("click", () => {
        searchOverlay.style.display = "none";
    });
}

/* ------------------------------
   MOBILE MENU
------------------------------ */
const mobileMenu = document.getElementById("mobileMenu");
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.style.right = "0";
    });
}

if (closeMenu) {
    closeMenu.addEventListener("click", () => {
        mobileMenu.style.right = "-250px";
    });
}


/* ------------------------------
   POPUNDER ON VIDEO CLICK
------------------------------ */

document.addEventListener("click", function (e) {
    const videoWrapper = document.querySelector(".video-wrapper");
    if (videoWrapper && videoWrapper.contains(e.target)) {
        // Popunder tag will auto-fire because Monetag is global script
        console.log("Video clicked → Popunder triggered");
    }
});

/* ------------------------------
   OPTIONAL: DIRECT LINK OVERLAY
------------------------------ */
const overlay = document.querySelector(".video-overlay-ad");
if (overlay) {
    overlay.addEventListener("click", function () {
        console.log("Overlay Ad Clicked");
    });
}

/* ------------------------------
   ONE-TIME POPUNDER + LAZY PLAYER
   - Fires popunder on first user Play click only
   - Stores timestamp in localStorage to avoid repeat
------------------------------ */

(function() {
  const POPUNDER_KEY = 'jjk_popunder_shown';        // storage key
  const POPUNDER_EXPIRY_MS = 24 * 60 * 60 * 1000;   // 24 hours (change if you want)
  const playerBtn = document.getElementById('playerBtn');
  const iframe = document.getElementById('okPlayer');

  if (!playerBtn || !iframe) return;

  function hasValidFlag() {
    try {
      const raw = localStorage.getItem(POPUNDER_KEY);
      if (!raw) return false;
      const obj = JSON.parse(raw);
      if (!obj || !obj.t) return false;
      const age = Date.now() - obj.t;
      return age < POPUNDER_EXPIRY_MS;
    } catch (e) {
      return false;
    }
  }

  function setFlag() {
    try {
      localStorage.setItem(POPUNDER_KEY, JSON.stringify({ t: Date.now() }));
    } catch (e) {
      // ignore storage errors
    }
  }

  function injectPopunder() {
    // ===== CHOOSE ONE of the two popunder snippets you already have =====
    // Option 1 (recommended): your first popunder variant (zone 10185411)
    const s = document.createElement('script');
    s.dataset.zone = '10185411';
    s.src = 'https://al5sm.com/tag.min.js';
    s.async = true;
    document.body.appendChild(s);

    // If you'd rather use the other popunder (zone 185219), comment out above and
    // uncomment the below lines instead:
    /*
    const s2 = document.createElement('script');
    s2.src = 'https://fpyf8.com/88/tag.min.js';
    s2.dataset.zone = '185219';
    s2.async = true;
    document.body.appendChild(s2);
    */
  }

  function loadIframe() {
    const dataSrc = iframe.getAttribute('data-src');
    if (dataSrc && iframe.src !== dataSrc) iframe.src = dataSrc;
  }

  playerBtn.addEventListener('click', function onPlay(e) {
    // If popunder not shown recently, inject it (user-initiated)
    if (!hasValidFlag()) {
      injectPopunder();
      setFlag();
    }

    // Load the player (lazy-load)
    loadIframe();

    // Hide play UI so subsequent clicks go to the player
    playerBtn.classList.add('hidden');
    // Optionally remove the button from DOM:
    // playerBtn.remove();
  }, { once: true }); // once:true ensures this handler only runs once for UX (but we still respect localStorage)
})();
