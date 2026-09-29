(function () {
  var KEY = "tema";
  var FONT_KEY = "carattere";
  var root = document.documentElement;
  var script = document.currentScript;
  var src = (script && script.getAttribute("src")) || "";
  var isApp = src.indexOf("../") !== -1;

  var dark = false;
  var sans = true;
  try {
    dark = localStorage.getItem(KEY) === "dark";
    sans = localStorage.getItem(FONT_KEY) !== "serif";
  } catch (e) {}

  if (isApp) {
    function labelOf(el) {
      return (
        (el.getAttribute("aria-label") || "") + " " +
        (el.getAttribute("title") || "") + " " +
        (el.id || "") + " " +
        (typeof el.className === "string" ? el.className : "") + " " +
        (el.textContent || "")
      ).toLowerCase();
    }

    function findAppSwitch() {
      var nodes = document.querySelectorAll("button, [role='switch'], input[type='checkbox']");
      for (var i = 0; i < nodes.length; i++) {
        var text = labelOf(nodes[i]);
        if (/passa al tema|tema chiaro|tema scuro|dark mode|light mode|toggle-theme|theme-toggle|data-theme/.test(text)) {
          return nodes[i];
        }
      }
      return null;
    }

    function currentIsDark(el) {
      var text = labelOf(el);
      if (/passa al tema chiaro/.test(text)) return true;
      if (/passa al tema scuro/.test(text)) return false;
      var pressed = el.getAttribute("aria-pressed");
      if (pressed === "true" || pressed === "false") return pressed === "true";
      if (el.tagName === "INPUT" && el.type === "checkbox") return !!el.checked;
      var mode = root.getAttribute("data-theme") || (document.body && document.body.getAttribute("data-theme"));
      if (mode === "dark" || mode === "scuro") return true;
      if (mode === "light" || mode === "chiaro") return false;
      if (root.classList.contains("dark") || (document.body && document.body.classList.contains("dark"))) return true;
      return null;
    }

    function syncAppTheme() {
      var el = findAppSwitch();
      if (!el || el.getAttribute("data-tema-synced") === "1") return;
      var now = currentIsDark(el);
      if (now === null || now === dark) return;
      el.setAttribute("data-tema-synced", "1");
      el.click();
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", syncAppTheme);
    } else {
      syncAppTheme();
    }
    window.addEventListener("load", syncAppTheme);
    return;
  }

  if (dark) root.classList.add("theme-dark");
  if (sans) root.classList.add("font-sans");

  var cssHref = "theme.css";
  if (src) {
    var slash = src.lastIndexOf("/");
    cssHref = (slash >= 0 ? src.slice(0, slash + 1) : "") + "theme.css";
  }
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssHref;
  (document.head || root).appendChild(link);

  var sun =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
    '<g stroke="currentColor" stroke-width="1.5" stroke-linecap="round">' +
    '<path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>' +
    "</g></svg>";
  var moon =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">' +
    '<path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" ' +
    'd="M15.2 3.4a7.6 7.6 0 1 0 5.2 11.8A6.6 6.6 0 0 1 15.2 3.4z"/></svg>';

  function paint(btn) {
    var isDark = root.classList.contains("theme-dark");
    btn.innerHTML = isDark ? moon : sun;
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    var label = isDark ? "Passa al tema chiaro" : "Passa al tema scuro";
    btn.setAttribute("aria-label", label);
    btn.title = label;
  }

  function paintFont(btn) {
    var isSans = root.classList.contains("font-sans");
    btn.textContent = "Aa";
    btn.setAttribute("aria-pressed", isSans ? "true" : "false");
    var label = isSans ? "Passa al carattere con grazie" : "Passa al carattere senza grazie";
    btn.setAttribute("aria-label", label);
    btn.title = label;
  }

  function mount() {
    if (!document.getElementById("theme-toggle")) {
      var btn = document.createElement("button");
      btn.id = "theme-toggle";
      btn.type = "button";
      paint(btn);
      btn.addEventListener("click", function () {
        var next = !root.classList.contains("theme-dark");
        root.classList.toggle("theme-dark", next);
        try {
          localStorage.setItem(KEY, next ? "dark" : "light");
        } catch (e) {}
        paint(btn);
      });
      document.body.appendChild(btn);
    }

    if (!document.getElementById("font-toggle")) {
      var fontBtn = document.createElement("button");
      fontBtn.id = "font-toggle";
      fontBtn.type = "button";
      paintFont(fontBtn);
      fontBtn.addEventListener("click", function () {
        var next = !root.classList.contains("font-sans");
        root.classList.toggle("font-sans", next);
        try {
          localStorage.setItem(FONT_KEY, next ? "sans" : "serif");
        } catch (e) {}
        paintFont(fontBtn);
      });
      document.body.appendChild(fontBtn);
    }
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();

// Sul tocco lo slider si sposta solo trascinando il pallino.
// Un tap sulla barra non cambia il valore. Mouse e penna restano invariati.
(function () {
  if (window.__sliderSoloTrascinamento) return;
  window.__sliderSoloTrascinamento = true;

  var PORTATA = 32;
  var gestures = new WeakMap();
  var rejectClick = null;
  var moveHooked = false;

  function sliderFrom(target) {
    if (!target || !target.closest) return null;
    var el = target.closest("input[type='range']");
    if (!el || el.disabled) return null;
    return el;
  }

  function thumbX(slider, raw) {
    var rect = slider.getBoundingClientRect();
    var min = parseFloat(slider.min);
    var max = parseFloat(slider.max);
    var value = parseFloat(raw);
    if (!isFinite(min)) min = 0;
    if (!isFinite(max)) max = 100;
    if (!isFinite(value)) value = min;
    var span = max - min;
    var ratio = span === 0 ? 0 : (value - min) / span;
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;
    if (window.getComputedStyle(slider).direction === "rtl") ratio = 1 - ratio;
    return rect.left + ratio * rect.width;
  }

  function onThumb(slider, x, y, raw) {
    var rect = slider.getBoundingClientRect();
    if (y < rect.top - 24 || y > rect.bottom + 24) return false;
    return Math.abs(x - thumbX(slider, raw)) <= PORTATA;
  }

  function gesture(slider) {
    var g = gestures.get(slider);
    if (g) return g;
    g = { raw: slider.value, reject: false };
    gestures.set(slider, g);
    setTimeout(function () {
      if (gestures.get(slider) === g) gestures.delete(slider);
    }, 8000);
    return g;
  }

  function restore(slider, raw) {
    if (slider.value === raw) return;
    slider.value = raw;
    slider.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function blockMove(e) {
    var point = e.changedTouches ? e.changedTouches[0] : e;
    var slider = sliderFrom(e.target);
    if (!slider || !point) return;
    var g = gestures.get(slider);
    if (!g || !g.reject) return;
    if (e.cancelable) e.preventDefault();
    restore(slider, g.raw);
  }

  function armMoveBlock() {
    if (moveHooked) return;
    moveHooked = true;
    document.addEventListener("touchmove", blockMove, { capture: true, passive: false });
    document.addEventListener("pointermove", blockMove, { capture: true, passive: false });
  }

  function disarmMoveBlock() {
    if (!moveHooked) return;
    moveHooked = false;
    document.removeEventListener("touchmove", blockMove, true);
    document.removeEventListener("pointermove", blockMove, true);
  }

  function reject(slider, g, event) {
    g.reject = true;
    rejectClick = { slider: slider, raw: g.raw, until: Date.now() + 30000 };
    if (event.cancelable) event.preventDefault();
    restore(slider, g.raw);
    setTimeout(function () { restore(slider, g.raw); }, 0);
    requestAnimationFrame(function () { restore(slider, g.raw); });
    armMoveBlock();
  }

  function consider(slider, event, x, y) {
    var g = gesture(slider);
    if (onThumb(slider, x, y, g.raw)) return;
    reject(slider, g, event);
  }

  function endGesture(e) {
    var slider = sliderFrom(e.target);
    if (!slider) return;
    var g = gestures.get(slider);
    if (!g) return;
    gestures.delete(slider);
    if (g.reject && rejectClick && rejectClick.slider === slider) {
      rejectClick.until = Date.now() + 800;
    }
    if (!g.reject) disarmMoveBlock();
  }

  function blockFollowup(e) {
    var slider = sliderFrom(e.target);
    if (!slider || !rejectClick || rejectClick.slider !== slider) return;
    if (Date.now() > rejectClick.until) {
      rejectClick = null;
      return;
    }
    if (e.cancelable) e.preventDefault();
    restore(slider, rejectClick.raw);
  }

  document.addEventListener("pointerdown", function (e) {
    var slider = sliderFrom(e.target);
    if (!slider) return;
    if (e.pointerType === "touch") {
      if (e.isPrimary === false) return;
      consider(slider, e, e.clientX, e.clientY);
      return;
    }
    blockFollowup(e);
  }, { capture: true, passive: false });

  document.addEventListener("touchstart", function (e) {
    if (!e.touches || e.touches.length !== 1) return;
    var slider = sliderFrom(e.target);
    if (!slider) return;
    var t = e.changedTouches[0];
    consider(slider, e, t.clientX, t.clientY);
  }, { capture: true, passive: false });

  document.addEventListener("mousedown", blockFollowup, true);
  document.addEventListener("click", blockFollowup, true);
  document.addEventListener("pointerup", endGesture, true);
  document.addEventListener("pointercancel", endGesture, true);
  document.addEventListener("touchend", function (e) {
    endGesture(e);
    if (!e.touches || e.touches.length === 0) disarmMoveBlock();
  }, true);
  document.addEventListener("touchcancel", function (e) {
    endGesture(e);
    if (!e.touches || e.touches.length === 0) disarmMoveBlock();
  }, true);
})();
