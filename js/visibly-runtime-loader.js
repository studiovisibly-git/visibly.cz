(function () {
  var loaded = false;
  var runtimeQueue = [
    "/js/jquery-3.5.1.min.dc5e7f18c8.js",
    "/js/webflow.js",
    "/js/visibly-page-hero.js?v=service-images-3",
    "/js/visibly-custom.js?v=motion-system-6",
    "/js/visibly-sticky-cta.js"
  ];

  function loadScript(src, done) {
    var script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.defer = true;
    script.onload = done;
    script.onerror = done;
    document.body.appendChild(script);
  }

  function loadNext(index) {
    if (index >= runtimeQueue.length) {
      document.documentElement.classList.add("visibly-runtime-ready");
      return;
    }

    loadScript(runtimeQueue[index], function () {
      loadNext(index + 1);
    });
  }

  function loadRuntime() {
    if (loaded) return;
    loaded = true;
    document.documentElement.classList.add("visibly-runtime-loading");
    loadNext(0);
  }

  function scheduleAfterLoad() {
    var schedule = function () {
      window.setTimeout(function () {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(loadRuntime, { timeout: 1800 });
        } else {
          loadRuntime();
        }
      }, 1800);
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }
  }

  ["pointerdown", "keydown", "touchstart", "scroll"].forEach(function (eventName) {
    window.addEventListener(eventName, loadRuntime, { once: true, passive: true });
  });

  scheduleAfterLoad();
}());
