(function () {
  // Inline math is an atomic box, so the browser may break right after "("
  // or right before ")" even though normal text would not. After each
  // typeset, keep the punctuation that touches a formula on the same line.
  var GLUE = /[()\[\]{}.,;:!?'"\u00AB\u00BB\u201C\u201D\u2018\u2019\u2013\u2014-]/;

  function punctuationRun(text, fromEnd) {
    var i = fromEnd ? text.length : 0;
    if (fromEnd) {
      while (i > 0 && GLUE.test(text.charAt(i - 1))) i--;
      return i === text.length ? "" : text.slice(i);
    }
    while (i < text.length && GLUE.test(text.charAt(i))) i++;
    return i === 0 ? "" : text.slice(0, i);
  }

  function gluePunctuation(root) {
    var containers = (root || document).querySelectorAll('mjx-container:not([display="true"])');
    for (var i = 0; i < containers.length; i++) {
      var equation = containers[i];
      if (equation.parentNode && equation.parentNode.classList && equation.parentNode.classList.contains("mjx-nobr")) {
        continue;
      }

      var prev = equation.previousSibling;
      var next = equation.nextSibling;
      var prevRun = prev && prev.nodeType === Node.TEXT_NODE ? punctuationRun(prev.textContent, true) : "";
      var nextRun = next && next.nodeType === Node.TEXT_NODE ? punctuationRun(next.textContent, false) : "";
      if (!prevRun && !nextRun) continue;

      var span = document.createElement("span");
      span.className = "mjx-nobr";
      span.style.whiteSpace = "nowrap";
      equation.parentNode.replaceChild(span, equation);

      if (prevRun) {
        prev.textContent = prev.textContent.slice(0, -prevRun.length);
        span.appendChild(document.createTextNode(prevRun));
      }
      span.appendChild(equation);
      if (nextRun) {
        next.textContent = next.textContent.slice(nextRun.length);
        span.appendChild(document.createTextNode(nextRun));
      }
    }
  }

  function wrapTypeset() {
    var orig = window.MathJax && MathJax.typesetPromise;
    if (!orig || orig.__glue) return false;
    var wrapped = function () {
      return orig.apply(MathJax, arguments).then(function (result) {
        gluePunctuation(document);
        return result;
      }, function (err) {
        gluePunctuation(document);
        throw err;
      });
    };
    wrapped.__glue = true;
    MathJax.typesetPromise = wrapped;
    return true;
  }

  if (!window.MathJax) {
    window.MathJax = {
      tex: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]],
        displayMath: [["$$", "$$"], ["\\[", "\\]"]],
        tags: "ams"
      },
      chtml: {
        matchFontHeight: false,
        scale: 1
      }
    };
  }

  var hooked = false;
  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    if (window.MathJax && MathJax.startup && MathJax.startup.promise && !hooked) {
      hooked = true;
      MathJax.startup.promise.then(function () {
        gluePunctuation(document);
      });
    }
    if (wrapTypeset() || tries > 200) clearInterval(timer);
  }, 20);
})();
