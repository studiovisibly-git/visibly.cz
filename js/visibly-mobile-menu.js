(function () {
  function initMobileMenu() {
    var wrapper = document.querySelector(".navigation-wrapper");
    var menu = wrapper && wrapper.querySelector(".menu");
    var hamburger = wrapper && wrapper.querySelector(".hamburger");
    var body = document.body;
    var scrollY = 0;
    var isOpen = false;

    if (!wrapper || !menu || !hamburger) return;

    function setMenuTop() {
      var rect = wrapper.getBoundingClientRect();
      var bottom = Math.max(0, Math.ceil(rect.bottom));
      document.documentElement.style.setProperty("--visibly-mobile-menu-top", bottom + "px");
    }

    function menuIsVisible() {
      var style = window.getComputedStyle(menu);
      var rect = menu.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    }

    function lockPageScroll() {
      wrapper.classList.add("visibly-menu-is-open");
      if (isOpen) return;
      scrollY = window.scrollY || window.pageYOffset || 0;
      body.classList.add("visibly-mobile-menu-open");
      body.style.top = "-" + scrollY + "px";
      isOpen = true;
    }

    function unlockPageScroll() {
      wrapper.classList.remove("visibly-menu-is-open");
      if (!isOpen) return;
      body.classList.remove("visibly-mobile-menu-open");
      body.style.top = "";
      window.scrollTo(0, scrollY);
      isOpen = false;
    }

    function update() {
      setMenuTop();

      if (window.innerWidth > 991) {
        unlockPageScroll();
        return;
      }

      if (menuIsVisible()) {
        lockPageScroll();
      } else {
        unlockPageScroll();
      }
    }

    var observer = new MutationObserver(function () {
      window.requestAnimationFrame(update);
    });

    observer.observe(menu, { attributes: true, attributeFilter: ["style", "class"] });
    observer.observe(hamburger, { attributes: true, attributeFilter: ["style", "class"] });

    setMenuTop();
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", setMenuTop, { passive: true });
    document.addEventListener("click", function () {
      window.setTimeout(update, 0);
      window.setTimeout(update, 320);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileMenu);
  } else {
    initMobileMenu();
  }
}());
