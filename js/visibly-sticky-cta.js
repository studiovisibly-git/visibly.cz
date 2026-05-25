(function () {
  // Sticky CTA component
  var defaults = {
    text: "Potřebujete něco vyrobit?",
    phoneLabel: "Zavolat",
    phoneUrl: "tel:+420603750631",
    buttonLabel: "Poptat",
    buttonUrl: "/kontakt"
  };

  function getValue(element, name, fallback) {
    return element.getAttribute(name) || fallback;
  }

  function createButton(href, label, modifier) {
    var link = document.createElement("a");
    var span = document.createElement("span");

    link.href = href;
    link.className = "visibly-sticky-cta__button " + modifier;
    span.textContent = label;
    link.appendChild(span);

    return link;
  }

  function render(element) {
    var text = getValue(element, "data-sticky-text", defaults.text);
    var phoneLabel = getValue(element, "data-sticky-phone-label", defaults.phoneLabel);
    var phoneUrl = getValue(element, "data-sticky-phone-url", defaults.phoneUrl);
    var buttonLabel = getValue(element, "data-sticky-button-label", defaults.buttonLabel);
    var buttonUrl = getValue(element, "data-sticky-button-url", defaults.buttonUrl);
    var inner = document.createElement("div");
    var mark = document.createElement("span");
    var markIcon = document.createElement("img");
    var textElement = document.createElement("div");
    var actions = document.createElement("div");

    element.setAttribute("aria-label", "Rychlý kontakt");
    inner.className = "visibly-sticky-cta__inner";
    mark.className = "visibly-sticky-cta__mark";
    mark.setAttribute("aria-hidden", "true");
    markIcon.src = "/images/star.svg";
    markIcon.alt = "";
    markIcon.loading = "lazy";
    textElement.className = "visibly-sticky-cta__text";
    actions.className = "visibly-sticky-cta__actions";

    mark.appendChild(markIcon);
    textElement.textContent = text;
    actions.appendChild(createButton(phoneUrl, phoneLabel, "visibly-sticky-cta__button--phone"));
    actions.appendChild(createButton(buttonUrl, buttonLabel, "visibly-sticky-cta__button--primary"));

    inner.appendChild(mark);
    inner.appendChild(textElement);
    inner.appendChild(actions);
    element.innerHTML = "";
    element.appendChild(inner);
  }

  function initStickyCtas() {
    var elements = document.querySelectorAll("[data-sticky-cta]");
    if (!elements.length) return;

    elements.forEach(render);

    var update = function () {
      var shouldShow = window.scrollY > 600;

      elements.forEach(function (element) {
        var finalCta = document.querySelector(".section-cta.white._2");
        var footer = document.querySelector(".footer");
        var finalCtaVisible = false;
        var footerVisible = false;

        if (finalCta) {
          var finalCtaRect = finalCta.getBoundingClientRect();
          var finalCtaOffset = window.innerWidth < 768 ? 180 : 80;
          finalCtaVisible = finalCtaRect.top < window.innerHeight - finalCtaOffset && finalCtaRect.bottom > 0;
        }

        if (footer) {
          var footerRect = footer.getBoundingClientRect();
          footerVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0;
        }

        element.classList.toggle("is-visible", shouldShow && !finalCtaVisible && !footerVisible);
      });
    };

    update();
    window.requestAnimationFrame(update);
    window.setTimeout(update, 300);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStickyCtas);
  } else {
    initStickyCtas();
  }
}());
