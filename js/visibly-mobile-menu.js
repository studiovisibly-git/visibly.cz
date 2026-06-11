(function () {
  function initMobileMenu() {
    var wrapper = document.querySelector(".navigation-wrapper");
    var menu = wrapper && wrapper.querySelector(".menu");
    var hamburger = wrapper && wrapper.querySelector(".hamburger");
    var navigation = wrapper && wrapper.querySelector(".navigation");
    var hamburgerIcon = hamburger && hamburger.querySelector(".hamburger-menu._2");
    var menuTextWrapper = hamburger && hamburger.querySelector(".menu-text-wrapper");
    var dots = hamburgerIcon && hamburgerIcon.querySelector(".dots");
    var close = hamburgerIcon && hamburgerIcon.querySelector(".remove");
    var lottie = hamburgerIcon && hamburgerIcon.querySelector(".lottie-animation");
    var topInfoBars = document.querySelectorAll("[data-top-info-bar]");
    var body = document.body;
    var scrollY = 0;
    var isOpen = false;
    var lastToggleAt = 0;
    var lastTogglePoint = null;

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

    function syncTopInfoBarHidden() {
      var hidden = body.classList.contains("visibly-mobile-menu-open") || body.classList.contains("top-info-bar-hidden");

      topInfoBars.forEach(function (bar) {
        bar.classList.toggle("is-hidden", hidden);
      });

      if (hidden) {
        wrapper.style.setProperty("top", "0px", "important");
      } else {
        wrapper.style.removeProperty("top");
      }
    }

    function setIconState(open) {
      wrapper.classList.toggle("visibly-menu-is-open", open);
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
      hamburger.setAttribute("aria-label", open ? "Zavřít menu" : "Otevřít menu");

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
      body.classList.add("top-info-bar-hidden");
      syncTopInfoBarHidden();
      body.style.top = "-" + scrollY + "px";
      setMenuTop();
      window.requestAnimationFrame(setMenuTop);
      window.setTimeout(setMenuTop, 80);
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
      body.classList.toggle("top-info-bar-hidden", restoreY > 80);
      syncTopInfoBarHidden();
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
    function handleMenuToggle(event) {
      if (window.innerWidth > 991) return;

      var now = Date.now();
      var point = getEventPoint(event);
      var isSameTap = (
        lastTogglePoint &&
        point &&
        Math.abs(point.x - lastTogglePoint.x) < 24 &&
        Math.abs(point.y - lastTogglePoint.y) < 24
      );

      if (isSameTap && now - lastToggleAt < 500) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }

      lastToggleAt = now;
      lastTogglePoint = point;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (isOpen || menuIsVisible()) {
        closeMenuNow();
      } else {
        openMenuNow();
      }
    }

    function getEventPoint(event) {
      var touch = event.touches && event.touches[0];
      var changedTouch = event.changedTouches && event.changedTouches[0];
      var point = touch || changedTouch;

      if (point) {
        return { x: point.clientX, y: point.clientY };
      }

      if (typeof event.clientX === "number" && typeof event.clientY === "number") {
        return { x: event.clientX, y: event.clientY };
      }

      return null;
    }

    function eventHitsHamburger(event) {
      var point = getEventPoint(event);

      if (!point) return false;

      var rect = hamburger.getBoundingClientRect();
      return (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
      );
    }

    function handleDocumentMenuToggle(event) {
      var target = event.target;
      var owner = target && target.closest ? target.closest(".navigation-wrapper .hamburger") : null;

      if (owner !== hamburger && !eventHitsHamburger(event)) return;
      handleMenuToggle(event);
    }

    function bindToggleTarget(target) {
      target.addEventListener("touchend", handleMenuToggle, { capture: true, passive: false });
      target.addEventListener("click", handleMenuToggle, true);
    }

    document.addEventListener("touchend", handleDocumentMenuToggle, { capture: true, passive: false });
    document.addEventListener("click", handleDocumentMenuToggle, true);
    bindToggleTarget(hamburger);
    if (menuTextWrapper) {
      bindToggleTarget(menuTextWrapper);
      menuTextWrapper.querySelectorAll(".menu-text").forEach(function (textNode) {
        bindToggleTarget(textNode);
      });
    }
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
