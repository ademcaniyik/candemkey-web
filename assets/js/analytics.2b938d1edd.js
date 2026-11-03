// Çerezsiz, kişisel veri tutmayan sayfa sayacı (api: /api/site/event). GPC/DNT açıksa hiçbir şey gönderilmez.
(function () {
  if (navigator.globalPrivacyControl || navigator.doNotTrack === "1" || window.doNotTrack === "1") return;
  var lang = (document.documentElement.lang || "").slice(0, 2);
  if (["tr", "en", "es"].indexOf(lang) < 0) lang = undefined;
  function send(e, extra) {
    var body = { e: e, p: location.pathname, l: lang };
    if (extra) for (var k in extra) body[k] = extra[k];
    var json = JSON.stringify(body);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon("/api/site/event", new Blob([json], { type: "text/plain" }))) return;
    } catch (_) {}
    try { fetch("/api/site/event", { method: "POST", body: json, headers: { "Content-Type": "text/plain" }, keepalive: true }); } catch (_) {}
  }
  var ref = "";
  try { if (document.referrer) ref = new URL(document.referrer).hostname; } catch (_) {}
  send("pageview", ref ? { r: ref } : null);
  // Gelecek için: data-track="cta_click" | "store_click" olan bağlantı/düğmelerin tıklaması sayılır.
  document.addEventListener("click", function (ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest("[data-track]") : null;
    var t = el && el.getAttribute("data-track");
    if (t === "cta_click" || t === "store_click") send(t);
  });
})();
