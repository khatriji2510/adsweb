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
