(function () {
  var isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent || "");
  if (isBot || location.search.indexOf("no-redirect") >= 0) {
    document.documentElement.classList.add("show-picker");
    return;
  }

  var langs = ["tr", "en", "es"];
  var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  var pick = null;

  for (var i = 0; i < prefs.length; i++) {
    var code = String(prefs[i]).slice(0, 2).toLowerCase();
    if (langs.indexOf(code) >= 0) {
      pick = code;
      break;
    }
  }

  if (!pick) {
    try {
      var saved = localStorage.getItem("ck-lang");
      if (saved && langs.indexOf(saved) >= 0) pick = saved;
    } catch (e) {}
  }

  var target = pick || "tr";
  try { localStorage.setItem("ck-lang", target); } catch (e) {}
  location.replace("/" + target + "/" + location.hash);
})();
