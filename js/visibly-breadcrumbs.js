(function () {
  var breadcrumbMap = {
    "index.html": ["Domů"],
    "kontakt.html": ["Domů", "Kontakt"],
    "tisk.html": ["Domů", "Tisk"],
    "polepy.html": ["Domů", "Polepy"],
    "reklama.html": ["Domů", "Reklama"],
    "realizace.html": ["Domů", "Realizace"],
    "realizace/ps-green.html": ["Domů", "Realizace", "PS Green"],
    "realizace/linealux.html": ["Domů", "Realizace", "LineaLux"],
    "realizace/reformlab.html": ["Domů", "Realizace", "ReformLab"],
    "realizace/rezani-betonu.html": ["Domů", "Realizace", "Řezání betonu"],
    "technologie.html": ["Domů", "Technologie"],
    "o-nas.html": ["Domů", "O nás"],
    "cookies.html": ["Domů", "Cookies"],
    "mapa-webu.html": ["Domů", "Mapa webu"],
    "pruvodce.html": ["Domů", "Průvodce"],
    "pruvodce/jak-pripravit-data-pro-tisk.html": ["Domů", "Průvodce", "Jak připravit data pro tisk"],
    "pruvodce/jaky-format-loga-poslat-do-tiskarny.html": ["Domů", "Průvodce", "Jaký formát loga poslat do tiskárny"],
    "pruvodce/kolik-stoji-polep-auta.html": ["Domů", "Průvodce", "Kolik stojí polep auta"],
    "pruvodce/jaky-material-na-reklamni-ceduli.html": ["Domů", "Průvodce", "Jaký materiál zvolit na reklamní ceduli"],
    "pruvodce/jak-kvalitni-fotku-na-fotoobraz.html": ["Domů", "Průvodce", "Jak kvalitní fotku potřebuji pro fotoobraz"],
    "pruvodce/jak-dlouho-vydrzi-polep-auta.html": ["Domů", "Průvodce", "Jak dlouho vydrží polep auta"],
    "pruvodce/matna-nebo-leskla-laminace.html": ["Domů", "Průvodce", "Matná nebo lesklá laminace"],
    "pruvodce/svetelna-reklama-nebo-cedule.html": ["Domů", "Průvodce", "Světelná reklama nebo nesvětelná cedule"],
    "pruvodce/jak-oznacit-provozovnu.html": ["Domů", "Průvodce", "Jak označit provozovnu, aby byla vidět"],
    "pruvodce/partnersky-tisk-pro-agentury.html": ["Domů", "Průvodce", "Partnerský tisk pro agentury a grafiky"],
    "pruvodce/co-dat-na-vylohu-provozovny.html": ["Domů", "Průvodce", "Co dát na výlohu provozovny"],
    "pruvodce/jak-pripravit-auto-pred-polepem.html": ["Domů", "Průvodce", "Jak připravit auto před polepem"],
    "pruvodce/jak-vybrat-reklamni-banner.html": ["Domů", "Průvodce", "Jak vybrat reklamní banner"],
    "pruvodce/jak-vybrat-potisk-textilu-pro-firmu.html": ["Domů", "Průvodce", "Jak vybrat potisk textilu pro firmu"],
    "pruvodce/jak-poznat-dobrou-tiskarnu-reklamni-vyrobu.html": ["Domů", "Průvodce", "Jak poznat dobrou tiskárnu a reklamní výrobu"],

    "velkoformatovy-tisk.html": ["Domů", "Tisk", "Velkoformátový tisk"],
    "bannery-a-reklamni-plachty.html": ["Domů", "Tisk", "Bannery a reklamní plachty"],
    "samolepky-a-folie.html": ["Domů", "Tisk", "Samolepky a fólie"],
    "roll-upy.html": ["Domů", "Tisk", "Roll-upy"],
    "plakaty.html": ["Domů", "Tisk", "Plakáty"],
    "fotoobrazy.html": ["Domů", "Tisk", "Fotoobrazy"],
    "tiskoviny.html": ["Domů", "Tisk", "Tiskoviny"],
    "pos-materialy.html": ["Domů", "Tisk", "POS materiály"],

    "polepy-aut.html": ["Domů", "Polepy", "Polepy aut"],
    "celopolepy-aut.html": ["Domů", "Polepy", "Celopolepy aut"],
    "polepy-dodavek.html": ["Domů", "Polepy", "Polepy dodávek"],
    "polepy-vyloh.html": ["Domů", "Polepy", "Polepy výloh"],
    "interierove-polepy.html": ["Domů", "Polepy", "Interiérové polepy"],

    "reklamni-vyroba.html": ["Domů", "Reklama", "Reklamní výroba"],
    "reklamni-cedule.html": ["Domů", "Reklama", "Reklamní cedule"],
    "svetelna-reklama.html": ["Domů", "Reklama", "Světelná reklama"],
    "3d-loga-a-napisy.html": ["Domů", "Reklama", "3D loga a nápisy"],
    "venkovni-reklama.html": ["Domů", "Reklama", "Venkovní reklama"],
    "interierova-reklama.html": ["Domů", "Reklama", "Interiérová reklama"],

    "potisk-textilu.html": ["Domů", "Textil", "Potisk textilu"],
    "grafika-a-vizualni-identita.html": ["Domů", "Grafika", "Grafika a vizuální identita"],
    "webdesign.html": ["Domů", "Webdesign"],
    "reklamni-plochy-opava.html": ["Domů", "Reklamní plochy", "Opava"]
  };

  var breadcrumbLinks = {
    "Domů": "/",
    "Kontakt": "/kontakt",
    "Tisk": "/tisk",
    "Polepy": "/polepy",
    "Reklama": "/reklama",
    "Realizace": "/realizace",
    "Technologie": "/technologie",
    "O nás": "/o-nas",
    "Cookies": "/cookies",
    "Mapa webu": "/mapa-webu",
    "Průvodce": "/pruvodce",
    "Textil": "/potisk-textilu",
    "Grafika": "/grafika-a-vizualni-identita",
    "Webdesign": "/webdesign",
    "Reklamní plochy": "/reklamni-plochy-opava"
  };

  function getCurrentFile() {
    var path = window.location.pathname.replace(/^\/+/, "").replace(/\/$/, "");

    if (path === "" || path === "index" || path === "index.html") {
      return "index.html";
    }

    return /\.html$/i.test(path) ? path : path + ".html";
  }

  function humanizeFileName(file) {
    return file
      .replace(/\.html$/i, "")
      .split("-")
      .filter(Boolean)
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  function getTrail(file) {
    return breadcrumbMap[file] || ["Domů", humanizeFileName(file.split("/").pop())];
  }

  function getItemHref(label, index, trail) {
    var isLast = index === trail.length - 1;

    if (isLast) {
      return "#home";
    }

    return breadcrumbLinks[label] || "/";
  }

  function renderBreadcrumb(container) {
    var file = getCurrentFile();
    var trail = getTrail(file);
    var list = document.createElement("ol");

    container.innerHTML = "";

    trail.forEach(function (label, index) {
      var item = document.createElement("li");
      var link = document.createElement("a");
      var isLast = index === trail.length - 1;

      link.textContent = label;
      link.href = getItemHref(label, index, trail);

      if (isLast) {
        link.setAttribute("aria-current", "page");
      }

      item.appendChild(link);
      list.appendChild(item);
    });

    container.appendChild(list);
  }

  function initBreadcrumbs() {
    var containers = document.querySelectorAll("[data-breadcrumb]");

    containers.forEach(function (container) {
      renderBreadcrumb(container);
    });
  }

  window.VisiblyBreadcrumbs = {
    map: breadcrumbMap,
    links: breadcrumbLinks,
    render: renderBreadcrumb
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBreadcrumbs);
  } else {
    initBreadcrumbs();
  }
}());
