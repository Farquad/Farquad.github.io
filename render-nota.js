(function () {
  var nota = window.NOTA;
  var titolo = document.getElementById("nota-titolo");
  var indice = document.getElementById("nota-indice");
  var contenuto = document.getElementById("nota-contenuto");

  if (!titolo || !indice || !contenuto) return;

  function fail(message) {
    contenuto.textContent = message;
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function stripFrontMatter(md) {
    if (md.charCodeAt(0) === 0xfeff) md = md.slice(1);
    return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, "");
  }

  function protectMath(md) {
    var tokens = [];
    function stash(match) {
      var i = tokens.length;
      tokens.push(match);
      return "MATHTOKEN" + i + "END";
    }
    var parts = md.split(/(```[\s\S]*?```)/g);
    for (var p = 0; p < parts.length; p++) {
      if (parts[p].indexOf("```") === 0) continue;
      parts[p] = parts[p].replace(/\$\$[\s\S]+?\$\$/g, stash);
      parts[p] = parts[p].replace(/(^|[^\\])\$([^\n$]+?)\$/g, function (_, pre, inner) {
        return pre + stash("$" + inner + "$");
      });
    }
    return { text: parts.join(""), tokens: tokens };
  }

  function restoreMath(html, tokens) {
    return html.replace(/MATHTOKEN(\d+)END/g, function (_, i) {
      return escapeHtml(tokens[Number(i)] || "");
    });
  }

  function slug(text, used) {
    var base = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "");
    if (!base) base = "sezione";
    var id = base;
    var n = 2;
    while (used[id]) {
      id = base + "-" + n;
      n++;
    }
    used[id] = true;
    return id;
  }

  function typeset() {
    function run() {
      if (window.MathJax && MathJax.typesetPromise) return MathJax.typesetPromise();
      return Promise.resolve();
    }
    if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
      return MathJax.startup.promise.then(run);
    }
    return new Promise(function (resolve) {
      var n = 0;
      var id = setInterval(function () {
        n++;
        if (window.MathJax && MathJax.typesetPromise) {
          clearInterval(id);
          var ready = MathJax.startup && MathJax.startup.promise ? MathJax.startup.promise : Promise.resolve();
          ready.then(run).then(resolve, resolve);
        } else if (n > 80) {
          clearInterval(id);
          resolve();
        }
      }, 50);
    });
  }

  function show(md) {
    if (typeof marked === "undefined" || !marked.parse) {
      fail("Non riesco a leggere la nota.");
      return;
    }
    var source = stripFrontMatter(md);
    var protectedMath = protectMath(source);
    var html = restoreMath(marked.parse(protectedMath.text), protectedMath.tokens);
    var root = document.createElement("div");
    root.innerHTML = html;

    var h1 = root.querySelector("h1");
    if (h1) {
      titolo.textContent = h1.textContent;
      document.title = h1.textContent;
      h1.parentNode.removeChild(h1);
    }

    var used = {};
    var heads = root.querySelectorAll("h2");
    for (var i = 0; i < heads.length; i++) {
      var id = slug(heads[i].textContent, used);
      heads[i].id = id;
      var p = document.createElement("p");
      var a = document.createElement("a");
      a.href = "#" + id;
      a.textContent = heads[i].textContent;
      p.appendChild(a);
      indice.appendChild(p);
    }

    contenuto.appendChild(root);
    typeset();
  }

  if (typeof window.NOTA_TESTO === "string") {
    show(window.NOTA_TESTO);
    return;
  }

  if (!nota) {
    fail("Non riesco a leggere la nota.");
    return;
  }

  var path = nota.split("/").map(encodeURIComponent).join("/");

  fetch(path)
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.text();
    })
    .then(show)
    .catch(function () {
      fail("Non riesco a leggere la nota.");
    });
})();
