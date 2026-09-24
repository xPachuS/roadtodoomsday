(function () {
  "use strict";

  var DATA = window.MCU;
  var D = DATA.titles;
  var ERAS = DATA.eras;
  var TH = DATA.threads;
  var tp = DATA.target.split("-");
  var TARGET = new Date(+tp[0], +tp[1] - 1, +tp[2]);

  var KEY = "camino-a-doomsday-v1";
  /* Ids antiguos que ahora son varias entradas */
  var MIGRATE = { loki: ["loki-s1", "loki-s2"] };
  var LEVEL = { 1: ["lv1", "Imprescindible"], 2: ["lv2", "Recomendada"], 3: ["lv3", "Opcional"] };

  var CK = '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var idx = {};
  D.forEach(function (d, i) { idx[d.id] = i; });

  /* Niveles marcados en "Mostrar" (1 imprescindible, 2 recomendada, 3 opcional).
     Definen qué se muestra y también qué se cuenta. */
  var lvOn = { 1: true, 2: true, 3: false };
  var seen = {}, fmt = "all", hide = false, days = 0;
  var barKey = null, barEls = {};

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function dur(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + " h" + (m ? " " + m + " min" : "");
  }
  function count(fn) { return D.filter(fn).length; }
  function inScope(d) { return !!lvOn[d.level]; }
  function levelList() { return [1, 2, 3].filter(function (n) { return lvOn[n]; }); }

  /* ---------- almacenamiento ---------- */
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var o = JSON.parse(raw);
      if (o && Array.isArray(o.seen)) {
        o.seen.forEach(function (id) {
          (MIGRATE[id] || [id]).forEach(function (x) {
            if (idx[x] !== undefined) seen[x] = true;
          });
        });
      }
      if (o && Array.isArray(o.lvs)) {
        lvOn = { 1: o.lvs.indexOf(1) !== -1, 2: o.lvs.indexOf(2) !== -1, 3: o.lvs.indexOf(3) !== -1 };
      } else if (o && o.lv) {
        /* Formato de la versión anterior: un solo nivel acumulativo ("all" era el de por defecto) */
        var max = { ess: 1, rec: 2, all: 2, opt: 3 }[o.lv];
        if (max) lvOn = { 1: true, 2: max >= 2, 3: max >= 3 };
      }
      if (o && (o.fmt === "all" || o.fmt === "m" || o.fmt === "s")) fmt = o.fmt;
      if (o && o.hide === true) hide = true;
    } catch (e) {}
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        seen: Object.keys(seen), lvs: levelList(), fmt: fmt, hide: hide
      }));
    } catch (e) {}
  }

  /* ---------- construir la lista ---------- */
  function build() {
    var html = "";
    ERAS.forEach(function (e, ei) {
      html += '<section class="era" data-era="' + ei + '"><header class="era-h"><div><p class="era-k">Parte ' + (ei + 1) + ' · ' + esc(e.sub) + '</p>' +
        '<h2>' + esc(e.name) + '</h2></div><p class="era-m" id="era-c' + ei + '"></p></header><ol class="list">';
      D.forEach(function (d, i) {
        if (d.era !== ei) return;
        var series = d.kind === "s", lv = LEVEL[d.level];
        html += '<li class="item' + (d.level === 3 ? " opt" : "") + '" data-i="' + i + '" style="--i:' + i + '">' +
          '<input class="chk" type="checkbox" id="c-' + d.id + '">' +
          '<label class="body" for="c-' + d.id + '">' +
          '<span class="mark" aria-hidden="true"><span class="num">' + (i + 1) + '</span>' + CK + '</span>' +
          '<span class="txt">' +
          '<span class="tag"></span>' +
          '<span class="ttl">' + esc(d.title) + '</span>' +
          '<span class="dsc">' + esc(d.neutral) + '</span>' +
          '<span class="why"><b>Doomsday</b>' + esc(d.why) + '</span>' +
          '<span class="meta">' +
          '<span class="lv ' + lv[0] + '">' + lv[1] + '</span>' +
          '<span>' + (series ? "Serie" : "Película") + ' · ' + esc(d.year) + '</span>' +
          '<span>' + esc(TH[d.thread]) + '</span>' +
          '<span>' + (series ? "≈ " : "") + dur(d.minutes) + '</span>' +
          '</span></span></label>' +
          '<button type="button" class="upto" data-i="' + i + '" aria-label="Marcar como vistos todos los títulos hasta ' + esc(d.title) + '">Ya vi todo hasta aquí</button>' +
          '</li>';
      });
      html += '</ol></section>';
    });
    $("eras").innerHTML = html;
  }

  /* Una barra por cada título de los niveles marcados */
  function buildBar(scope) {
    var out = "";
    barEls = {};
    scope.forEach(function (gi, k) {
      out += '<span class="b" data-i="' + gi + '" title="' + (k + 1) + '. ' + esc(D[gi].title) + '"></span>';
    });
    $("bar").innerHTML = out;
    scope.forEach(function (gi) { barEls[gi] = document.querySelector('.b[data-i="' + gi + '"]'); });
    barKey = levelList().join();
  }

  var rows, eraEls;

  function collect() {
    rows = D.map(function (d, i) {
      var li = document.querySelector('.item[data-i="' + i + '"]');
      return {
        d: d, li: li,
        chk: li.querySelector(".chk"),
        num: li.querySelector(".num"),
        tag: li.querySelector(".tag"),
        upto: li.querySelector(".upto")
      };
    });
    eraEls = document.querySelectorAll(".era");
  }

  /* ---------- actualizar la pantalla ---------- */
  function update() {
    var ae = document.activeElement;
    var aeLi = ae && ae.closest ? ae.closest(".item") : null;

    days = Math.ceil((TARGET - new Date()) / 864e5);
    $("days").textContent = Math.max(days, 0);

    var scope = [];
    D.forEach(function (d, i) { if (inScope(d)) scope.push(i); });
    if (barKey !== levelList().join()) buildBar(scope);

    var nextRow = null, nSeen = 0, remain = 0, allPrev = true, visibleCount = 0, pos = 0, mCount = 0, sCount = 0;
    var eraSeen = [], eraTot = [], eraVis = [];
    ERAS.forEach(function (_, ei) { eraSeen[ei] = 0; eraTot[ei] = 0; eraVis[ei] = 0; });

    rows.forEach(function (r, i) {
      var d = r.d, s = !!seen[d.id], sc = inScope(d);
      r.chk.checked = s;
      r.li.classList.toggle("seen", s);
      var isNext = sc && !s && !nextRow;
      if (isNext) nextRow = r;
      r.li.classList.toggle("next", isNext);
      var ok = false;
      if (sc) {
        pos++;
        r.num.textContent = pos;
        if (barEls[i]) barEls[i].classList.toggle("on", s);
        if (s) nSeen++; else remain += d.minutes;
        allPrev = allPrev && s;
        r.upto.hidden = allPrev;
        eraTot[d.era]++;
        if (s) eraSeen[d.era]++;
        if (d.kind === "m") mCount++; else sCount++;
        ok = (fmt === "all" || d.kind === fmt) && !(hide && s);
      }
      r.li.hidden = !ok;
      if (ok) { visibleCount++; eraVis[d.era]++; }
    });

    Array.prototype.forEach.call(eraEls, function (el, ei) {
      el.hidden = eraVis[ei] === 0;
      $("era-c" + ei).textContent = eraSeen[ei] + " de " + eraTot[ei] + " vistos";
      /* La línea que une las marcas llega hasta el siguiente título visible */
      var last = null;
      Array.prototype.forEach.call(el.querySelectorAll(".item"), function (li) {
        li.classList.remove("last");
        if (!li.hidden) last = li;
      });
      if (last) last.classList.add("last");
    });

    if (nextRow) nextRow.tag.textContent = nSeen ? "Siguiente" : "Empieza por aquí";
    var total = scope.length, seenAll = Object.keys(seen).length;
    $("st-total").textContent = total;
    $("n-fmt-m").textContent = mCount;
    $("n-fmt-s").textContent = sCount;
    $("st-seen").textContent = nSeen;
    $("st-left").textContent = !total ? "–" : remain ? dur(remain) : "Nada";
    var pace;
    if (!total) pace = "–";
    else if (!remain) pace = "Listo";
    else if (days <= 0) pace = "Ya en cines";
    else pace = (remain / 60 / (Math.max(days, 1) / 7)).toFixed(1).replace(".", ",") + "<small> h por semana</small>";
    $("st-pace").innerHTML = pace;

    $("empty").textContent = total
      ? "No queda nada por ver con estos filtros. Nos vemos en cines el 18 de diciembre."
      : "No hay ningún nivel marcado. Marca al menos uno en \"Mostrar\" para ver títulos.";
    $("empty").hidden = visibleCount !== 0;
    $("reset-box").hidden = seenAll === 0;
    if (seenAll === 0) $("reset-ask").hidden = true;
    $("reset-n").textContent = seenAll;
    $("live").textContent = nSeen + " de " + total + " títulos vistos";
    $("bar").setAttribute("aria-label", nSeen + " de " + total + " títulos vistos");

    if (aeLi && aeLi.hidden) {
      var all = rows.map(function (r) { return r.li; });
      var i0 = all.indexOf(aeLi), target = null, j;
      for (j = i0 + 1; j < all.length && !target; j++) if (!all[j].hidden) target = all[j];
      for (j = i0 - 1; j >= 0 && !target; j--) if (!all[j].hidden) target = all[j];
      if (target) target.querySelector(".chk").focus();
    }
  }

  function syncControls() {
    [1, 2, 3].forEach(function (n) { $("lv-" + n).checked = !!lvOn[n]; });
    $("fmt-" + fmt).checked = true;
    $("hide-seen").checked = hide;
  }

  /* Lleva la vista a una tarjeta, quitando los filtros que la esconden */
  function goTo(i) {
    var r = rows[i];
    if (!inScope(r.d)) {
      lvOn[r.d.level] = true;
      syncControls(); save(); update();
    }
    if (r.li.hidden) {
      fmt = "all"; hide = false;
      syncControls(); save(); update();
    }
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    r.li.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
    r.li.classList.add("flash");
    setTimeout(function () { r.li.classList.remove("flash"); }, 1500);
    r.chk.focus({ preventScroll: true });
  }

  /* ---------- arranque ---------- */
  load();
  build();
  collect();

  [1, 2, 3].forEach(function (n) {
    $("n-lv-" + n).textContent = count(function (d) { return d.level === n; });
  });
  syncControls();

  /* ---------- eventos ---------- */
  $("eras").addEventListener("change", function (e) {
    var t = e.target;
    if (!t.classList.contains("chk")) return;
    var id = t.id.slice(2);
    if (t.checked) seen[id] = true; else delete seen[id];
    save(); update();
  });
  $("eras").addEventListener("click", function (e) {
    var b = e.target.closest(".upto");
    if (!b) return;
    var i = +b.getAttribute("data-i");
    /* Solo los títulos del nivel elegido: son los que el usuario está viendo */
    for (var k = 0; k <= i; k++) if (inScope(D[k])) seen[D[k].id] = true;
    save(); update();
    rows[i].chk.focus();
  });
  $("bar").addEventListener("click", function (e) {
    var g = e.target.closest(".b");
    if (g) goTo(+g.getAttribute("data-i"));
  });

  [1, 2, 3].forEach(function (n) {
    $("lv-" + n).addEventListener("change", function () { lvOn[n] = this.checked; save(); update(); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('input[name="fmt"]'), function (el) {
    el.addEventListener("change", function () { if (el.checked) { fmt = el.value; save(); update(); } });
  });
  $("hide-seen").addEventListener("change", function () { hide = this.checked; save(); update(); });

  $("reset").addEventListener("click", function () {
    $("reset").hidden = true; $("reset-ask").hidden = false; $("reset-no").focus();
  });
  $("reset-no").addEventListener("click", function () {
    $("reset-ask").hidden = true; $("reset").hidden = false; $("reset").focus();
  });
  $("reset-yes").addEventListener("click", function () {
    seen = {}; save();
    $("reset-ask").hidden = true; $("reset").hidden = false;
    update();
  });

  /* Al volver a la pestaña puede haber pasado un día */
  document.addEventListener("visibilitychange", function () { if (!document.hidden) update(); });

  update();

  /* Funcionamiento sin conexión: solo cuando la web se sirve por http o https */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
