(function () {
  var KEY = "tema";
  var root = document.documentElement;
  var script = document.currentScript;
  var src = (script && script.getAttribute("src")) || "";
  var isApp = src.indexOf("../") !== -1;

  var dark = false;
  try {
    dark = localStorage.getItem(KEY) === "dark";
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

  var style = document.createElement("style");
  style.textContent =
    "html.theme-dark{background:#fff;filter:invert(1) hue-rotate(180deg);}" +
    "#theme-toggle{position:fixed;top:10px;right:12px;z-index:2147483647;" +
    "width:30px;height:30px;padding:0;margin:0;border:1px solid rgba(0,0,0,.12);" +
    "border-radius:50%;background:rgba(255,255,255,.55);color:#2c2c2c;cursor:pointer;" +
    "opacity:.55;line-height:0;display:flex;align-items:center;justify-content:center;}" +
    "#theme-toggle:hover,#theme-toggle:focus{opacity:1;outline:none;}" +
    "#theme-toggle svg{display:block;}";
  (document.head || root).appendChild(style);

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

  function mount() {
    if (document.getElementById("theme-toggle")) return;
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

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
