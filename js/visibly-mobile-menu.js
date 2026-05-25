(function () {
  function initMobileMenu() {
    var wrapper = document.querySelector(".navigation-wrapper");
    var menu = wrapper && wrapper.querySelector(".menu");
    var hamburger = wrapper && wrapper.querySelector(".hamburger");
    var navigation = wrapper && wrapper.querySelector(".navigation");
    var hamburgerIcon = hamburger && hamburger.querySelector(".hamburger-menu._2");
    var dots = hamburgerIcon && hamburgerIcon.querySelector(".dots");
    var close = hamburgerIcon && hamburgerIcon.querySelector(".remove");
    var lottie = hamburgerIcon && hamburgerIcon.querySelector(".lottie-animation");
    var body = document.body;
    var scrollY = 0;
    var isOpen = false;

    if (!wrapper || !menu || !hamburger) return;

    function setMenuTop() {
      var rect = (navigation || wrapper).getBoundingClientRect();
      var bottom = Math.max(0, Math.ceil(rect.bottom));
      document.documentElement.style.setProperty("--visibly-mobile-menu-top", bottom + "px");
    }

    function setStyle(element, property, value) {
      if (element && element.style[property] !== value) {
        element.style[property] = value;
      }
    }

    function setIconState(open) {
      wrapper.classList.toggle("visibly-menu-is-open", open);

      setStyle(dots, "opacity", open ? "0" : "1");
      setStyle(dots, "transform", open ? "scale(0)" : "scale(1)");

      setStyle(close, "opacity", "0");
      setStyle(close, "transform", "scale(0)");

      setStyle(lottie, "display", open ? "block" : "none");
      setStyle(lottie, "opacity", open ? "1" : "0");
      setStyle(lottie, "transform", open ? "scale(1)" : "scale(.9)");
      setStyle(lottie, "pointerEvents", "none");
      setStyle(lottie, "visibility", open ? "visible" : "hidden");
    }

    function menuIsVisible() {
      var style = window.getComputedStyle(menu);
      var rect = menu.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    }

    function lockPageScroll() {
      setIconState(true);
      if (isOpen) return;
      scrollY = window.scrollY || window.pageYOffset || 0;
      body.classList.add("visibly-mobile-menu-open");
      body.style.top = "-" + scrollY + "px";
      setMenuTop();
      window.requestAnimationFrame(setMenuTop);
      isOpen = true;
    }

    function unlockPageScroll() {
      setIconState(false);
      if (!isOpen) return;
      var lockedTop = parseInt(body.style.top, 10);
      var restoreY = lockedTop < 0 ? Math.abs(lockedTop) : scrollY;
      var previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      body.classList.remove("visibly-mobile-menu-open");
      body.style.top = "";
      window.scrollTo(0, restoreY);
      window.requestAnimationFrame(function () {
        window.scrollTo(0, restoreY);
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      });
      isOpen = false;
    }

    function closeMenuNow() {
      menu.style.display = "none";
      unlockPageScroll();
    }

    function openMenuNow() {
      menu.style.display = "flex";
      lockPageScroll();
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
    observer.observe(hamburger, { attributes: true, attributeFilter: ["style", "class"], subtree: true });

    setIconState(false);
    setMenuTop();
    update();
    window.setTimeout(update, 0);
    window.setTimeout(update, 500);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", setMenuTop, { passive: true });
    hamburger.addEventListener("click", function (event) {
      if (window.innerWidth > 991) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (isOpen || menuIsVisible()) {
        closeMenuNow();
      } else {
        openMenuNow();
      }
    }, true);
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
