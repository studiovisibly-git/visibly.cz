(function () {
  var imageMap = {
    "tisk": {
      src: "images/services/visibly-service-tisk.png",
      alt: "Velkoformátová tiskárna Epson při tisku reklamy Visibly"
    },
    "polepy": {
      src: "images/services/visibly-service-polepy.jpg",
      alt: "Reklamní polepy aut, výloh a interiérů Visibly"
    },
    "reklama": {
      src: "images/services/visibly-service-reklamni-vyroba.jpg",
      alt: "Reklamní výroba Visibly"
    },
    "o nás": {
      src: "images/services/visibly-service-grafika.jpg",
      alt: "Visibly reklamní studio a tiskárna"
    }
  };

  function getData(element, name, fallback) {
    return element.getAttribute(name) || fallback;
  }

  function createTitleLine(text, index, remainingTitle) {
    var wrap = document.createElement("div");
    var line;
    var strong = document.createElement("strong");
    var br = document.createElement("br");
    var lineClass = ["_2", "_1", "_3", "_4"][index] || "_2";

    wrap.className = "top-part-hero _2";

    if (index === 0) {
      line = document.createElement("h1");
    } else {
      line = document.createElement("div");
      line.classList.add("visibly-title-line");
    }

    line.className = "title-1 " + lineClass + (index === 0 ? "" : " visibly-title-line");
    line.appendChild(document.createTextNode(text));
    if (index === 0 && remainingTitle) {
      var hiddenTitle = document.createElement("span");
      hiddenTitle.className = "visibly-sr-only";
      hiddenTitle.textContent = " " + remainingTitle;
      line.appendChild(hiddenTitle);
    }
    strong.appendChild(br);
    line.appendChild(strong);
    wrap.appendChild(line);

    return wrap;
  }

  function createButton(href, label) {
    var link = document.createElement("a");
    var labelWrap = document.createElement("div");
    var overlay = document.createElement("div");

    link.href = href;
    link.className = "button-circle _2 w-inline-block";
    labelWrap.textContent = label;
    overlay.className = "button-overlay active";

    link.appendChild(labelWrap);
    link.appendChild(overlay);

    return link;
  }

  function renderHero(element) {
    if (element.getAttribute("data-page-hero-rendered") === "true") return;
    element.setAttribute("data-page-hero-rendered", "true");
    if (!element.getAttribute("data-w-id")) {
      element.setAttribute("data-w-id", "3ef9be33-4443-fe7a-f70f-a8c05b16e371");
    }

    var title = getData(element, "data-hero-title", "Velkoformátový|tisk");
    var kicker = getData(element, "data-hero-kicker", "Tisk").toLowerCase();
    var text = getData(element, "data-hero-text", "");
    var buttonLabel = getData(element, "data-hero-button-label", "");
    var buttonUrl = getData(element, "data-hero-button-url", "/kontakt");
    var scrollText = getData(element, "data-hero-scroll-text", "Scroll");
    var scrollTarget = getData(element, "data-hero-scroll-target", "#sluzby");
    var image = imageMap[kicker] || imageMap.tisk;
    var copy = document.createElement("div");
    var imageWrap = document.createElement("div");
    var circle = document.createElement("div");
    var img = document.createElement("img");
    var paragraph = document.createElement("p");
    var actions = document.createElement("div");
    var scroll = document.createElement("a");

    element.classList.add("visibly-page-hero");
    copy.className = "visibly-print-hero-copy";
    var titleLines = title.split("|").filter(Boolean);
    titleLines.forEach(function (line, index) {
      var remainingTitle = index === 0 ? titleLines.slice(1).join(" ") : "";
      copy.appendChild(createTitleLine(line, index, remainingTitle));
    });

    imageWrap.className = "visibly-print-hero-images visibly-page-hero-image-wrap";
    imageWrap.setAttribute("aria-label", "Ukázka " + getData(element, "data-hero-kicker", "služby") + " Visibly");
    circle.className = "circle-image visibly-print-hero-image visibly-print-hero-image-primary visibly-page-hero-circle";
    img.src = image.src;
    img.loading = "eager";
    img.alt = image.alt;
    img.className = "visibly-print-hero-photo";
    circle.appendChild(img);
    imageWrap.appendChild(circle);

    paragraph.className = "subhead _2 visibly-print-hero-text";
    paragraph.textContent = text;

    actions.className = "visibly-page-hero-actions";
    if (buttonLabel) {
      actions.appendChild(createButton(buttonUrl, buttonLabel));
    }
    scroll.href = scrollTarget;
    scroll.className = "scroll-down visibly-page-hero-scroll";
    scroll.textContent = scrollText;
    actions.appendChild(scroll);

    element.innerHTML = "";
    element.appendChild(copy);
    element.appendChild(imageWrap);
    element.appendChild(paragraph);
    element.appendChild(actions);
  }

  function updateHeroCircleMotion() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".visibly-page-hero-circle").forEach(function (circle) {
        circle.style.transform = "none";
      });
      return;
    }

    var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var range = Math.max(360, window.innerHeight * 0.75);
    var progress = Math.max(0, Math.min(1, scrollY / range));
    var scale = 1 + progress * 0.04;

    document.querySelectorAll(".visibly-page-hero-circle").forEach(function (circle) {
      circle.style.transform = "scale(" + scale.toFixed(4) + ")";
    });
  }

  var heroMotionFrame = null;

  function requestHeroCircleMotion() {
    if (heroMotionFrame !== null) return;
    heroMotionFrame = window.requestAnimationFrame(function () {
      heroMotionFrame = null;
      updateHeroCircleMotion();
    });
  }

  function initPageHeroes() {
    document.querySelectorAll("[data-page-hero]").forEach(renderHero);
    requestHeroCircleMotion();
  }

  initPageHeroes();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPageHeroes);
  }

  window.addEventListener("scroll", requestHeroCircleMotion, { passive: true });
  window.addEventListener("resize", requestHeroCircleMotion);
}());
