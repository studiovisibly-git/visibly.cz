(function () {
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var motion = {
    distance: 36,
    duration: 700,
    ease: 'cubic-bezier(.22, 1, .36, 1)',
    stagger: 80
  };

  function prefersReducedMotion() {
    return motionQuery.matches;
  }

  function initServiceCards() {
    var cards = document.querySelectorAll('.visibly-service-card');
    if (!cards.length) return;

    if (prefersReducedMotion()) {
      cards.forEach(function (card) {
        card.style.opacity = '1';
        card.style.transform = 'none';
        card.style.transition = 'none';
        card.style.transitionDelay = '0ms';
      });
      return;
    }

    cards.forEach(function (card, index) {
      card.style.opacity = '0';
      card.style.transform = 'translate3d(0, ' + motion.distance + 'px, 0)';
      card.style.transition = 'opacity ' + motion.duration + 'ms ' + motion.ease + ', transform ' + motion.duration + 'ms ' + motion.ease;
      card.style.transitionDelay = Math.min(index * motion.stagger, 480) + 'ms';
    });

    var reveal = function (card) {
      card.style.opacity = '1';
      card.style.transform = 'translate3d(0, 0, 0)';
    };

    if (!('IntersectionObserver' in window)) {
      cards.forEach(reveal);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16 });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  function initWorkTrack() {
    var track = document.querySelector('.visibly-work-track');
    if (!track) return;

    var list = track.querySelector('.collection-list');
    if (!list) return;

    var ticking = false;
    var startOffset = 0;
    var endOffset = 0;
    var travelDistance = 0;
    var scrollRange = 0;

    var measure = function () {
      if (window.innerWidth < 992) {
        track.style.height = '';
        list.style.transform = '';
        startOffset = 0;
        endOffset = 0;
        travelDistance = 0;
        scrollRange = 0;
        return;
      }

      list.style.transform = 'translate3d(0, 0, 0)';

      var items = list.querySelectorAll('.collection-item');
      var firstItem = items[0];
      var lastItem = items[items.length - 1];

      if (!firstItem || !lastItem) {
        startOffset = 0;
        endOffset = 0;
        travelDistance = 0;
        scrollRange = 0;
        track.style.height = '';
        return;
      }

      var firstRect = firstItem.getBoundingClientRect();
      var lastRect = lastItem.getBoundingClientRect();

      startOffset = Math.max(-firstRect.left, 0);
      endOffset = Math.min(window.innerWidth - lastRect.right, startOffset);
      travelDistance = Math.max(startOffset - endOffset, 0);
      scrollRange = Math.max(travelDistance, window.innerHeight * 0.8);
      track.style.height = Math.ceil(window.innerHeight + scrollRange) + 'px';
    };

    var update = function () {
      ticking = false;

      if (window.innerWidth < 992) {
        list.style.transform = '';
        return;
      }

      var rect = track.getBoundingClientRect();
      scrollRange = Math.max(track.offsetHeight - window.innerHeight, 1);

      if (scrollRange <= 0 || travelDistance <= 0) {
        list.style.transform = 'translate3d(' + startOffset + 'px, 0, 0)';
        return;
      }

      var progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      var currentOffset = startOffset - (travelDistance * progress);
      list.style.transform = 'translate3d(' + currentOffset + 'px, 0, 0)';
    };

    var requestUpdate = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    measure();
    update();
    window.requestAnimationFrame(function () {
      measure();
      update();
    });
    window.setTimeout(function () {
      measure();
      update();
    }, 300);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', function () {
      measure();
      requestUpdate();
    });
  }

  function initIntroVideoLoop() {
    var media = document.querySelector('.visibly-intro-media');
    if (!media) return;

    var videos = media.querySelectorAll('.visibly-intro-video');
    if (videos.length < 2) return;

    var activeIndex = 0;
    var crossfadeSeconds = 0.55;
    var isSwitching = false;

    var activate = function (index) {
      videos.forEach(function (video, videoIndex) {
        video.classList.toggle('is-active', videoIndex === index);
      });
    };

    var playVideo = function (video) {
      video.muted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.playsInline = true;
      var play = video.play();
      if (play && typeof play.catch === 'function') {
        play.catch(function () {});
      }
    };

    var switchVideo = function () {
      if (isSwitching) return;

      var current = videos[activeIndex];
      var nextIndex = activeIndex === 0 ? 1 : 0;
      var next = videos[nextIndex];

      isSwitching = true;
      next.currentTime = 0;
      playVideo(next);
      activate(nextIndex);

      window.setTimeout(function () {
        current.pause();
        current.currentTime = 0;
        activeIndex = nextIndex;
        isSwitching = false;
      }, crossfadeSeconds * 1000);
    };

    videos.forEach(function (video) {
      video.addEventListener('timeupdate', function () {
        if (!video.duration || video !== videos[activeIndex]) return;
        if (video.duration - video.currentTime <= crossfadeSeconds) {
          switchVideo();
        }
      });

      video.addEventListener('ended', function () {
        if (video === videos[activeIndex]) switchVideo();
      });
    });

    var retryActivePlayback = function () {
      playVideo(videos[activeIndex]);
    };

    activate(activeIndex);
    retryActivePlayback();
    window.setTimeout(retryActivePlayback, 250);
    window.setTimeout(retryActivePlayback, 1000);
    window.addEventListener('touchstart', retryActivePlayback, { passive: true });
    window.addEventListener('pointerdown', retryActivePlayback, { passive: true });
    window.addEventListener('scroll', retryActivePlayback, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) retryActivePlayback();
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) retryActivePlayback();
        });
      }, { threshold: 0.2 });

      observer.observe(media);
    }
  }

  function initBreadcrumb() {
    var breadcrumb = document.querySelector('.visibly-breadcrumbs, .visibly-breadcrumb');
    if (!breadcrumb) return;

    var logoFadeDistance = window.innerWidth < 768 ? 46 : 68;
    var ticking = false;

    var updateAnchor = function () {
      var logo = document.querySelector('.visibly-logo-wrapper');
      var logoText = document.querySelector('.logo-text');
      var logoRect = logo ? logo.getBoundingClientRect() : null;
      var logoTextRect = logoText ? logoText.getBoundingClientRect() : null;
      var logoTextVisible = logoText && window.getComputedStyle(logoText).display !== 'none' && logoTextRect.height > 0;
      var breadcrumbTop = 112;
      var breadcrumbLeft = window.innerWidth * 0.05;

      if (logoTextVisible) {
        breadcrumbTop = logoTextRect.top;
        breadcrumbLeft = logoTextRect.left;
      } else if (logoRect) {
        breadcrumbTop = logoRect.bottom + (window.innerWidth < 768 ? 12 : 14);
        breadcrumbLeft = logoRect.left;
      }

      logoFadeDistance = window.innerWidth < 768 ? 46 : 68;
      document.documentElement.style.setProperty('--visibly-breadcrumb-left', breadcrumbLeft.toFixed(2) + 'px');
      document.documentElement.style.setProperty('--visibly-breadcrumb-top', breadcrumbTop.toFixed(2) + 'px');
    };

    var updateProgress = function () {
      var logoProgress = Math.min(window.scrollY / logoFadeDistance, 1);
      var breadcrumbProgress = Math.min(window.scrollY / logoFadeDistance, 1);

      document.documentElement.style.setProperty('--visibly-logo-text-progress', logoProgress.toFixed(3));
      document.documentElement.style.setProperty('--visibly-breadcrumb-progress', breadcrumbProgress.toFixed(3));
      document.body.classList.toggle('visibly-breadcrumb-is-fixed', breadcrumbProgress >= 1);
    };

    var updateAll = function () {
      updateAnchor();
      updateProgress();
      ticking = false;
    };

    var requestUpdateAll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateAll);
    };

    var handleScroll = function () {
      requestUpdateAll();
      window.setTimeout(requestUpdateAll, 320);
    };

    updateAll();
    window.requestAnimationFrame(updateAll);
    window.setTimeout(updateAll, 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateAll);
  }

  window.addEventListener('load', function () {
    initServiceCards();
    initWorkTrack();
    initIntroVideoLoop();
    initBreadcrumb();
  });
}());
