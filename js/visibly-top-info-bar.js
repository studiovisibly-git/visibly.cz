(function () {
  // Top info bar component
  function initTopInfoBar() {
    var bars = document.querySelectorAll("[data-top-info-bar]");
    if (!bars.length) return;

    var body = document.body;
    var ticking = false;

    body.classList.add("has-top-info-bar");

    function setBarHeight() {
      var rect = bars[0].getBoundingClientRect();
      var height = Math.ceil(rect.height || bars[0].offsetHeight || 40);
      document.documentElement.style.setProperty("--visibly-top-info-bar-height", height + "px");
    }

    function update() {
      var shouldHide = window.scrollY > 80;

      bars.forEach(function (bar) {
        bar.classList.toggle("is-hidden", shouldHide);
      });

      body.classList.toggle("top-info-bar-hidden", shouldHide);
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    setBarHeight();
    update();
    window.requestAnimationFrame(function () {
      setBarHeight();
      update();
    });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", function () {
      setBarHeight();
      requestUpdate();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTopInfoBar);
  } else {
    initTopInfoBar();
  }
}());
