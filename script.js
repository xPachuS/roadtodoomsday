(function () {
  "use strict";

  var DATA = window.MCU;
  var D = DATA.titles;
  var ERAS = DATA.eras;
  var TH = DATA.threads;
  var tp = DATA.target.split("-");
  var TARGET = new Date(+tp[0], +tp[1] - 1, +tp[2]);

  var KEY = "camino-a-doomsday-v1";
  var CODE_PREFIX = "CD1:";
  /* Ids antiguos que ahora son varias entradas */
  var MIGRATE = { loki: ["loki-s1", "loki-s2"] };
  /* Nivel elegido: hasta qué "level" de data.js se muestra y se cuenta */
  var LEVEL_MAX = { ess: 1, rec: 2, opt: 3 };
  var LEVEL_KEYS = ["ess", "rec", "opt"];
  var PILL = { 1: ["p1", "Imprescindible"], 2: ["p2", "Recomendada"], 3: ["p3", "Opcional"] };
  var TICK_LEN = { 1: 86, 2: 98, 3: 104 };

  var CK = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var idx = {};
  D.forEach(function (d, i) { idx[d.id] = i; });

  var seen = {}, lv = "rec", fmt = "all", hide = false, nospoil = true, days = 0;
  var ringLv = null, tickEls = {};

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function dur(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + " h" + (m ? " " + m + " min" : "");
  }
  function count(fn) { return D.filter(fn).length; }
  function inScope(d) { return d.level <= LEVEL_MAX[lv]; }

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
      /* "all" era el nivel por defecto de la versión anterior */
      if (o && o.lv === "all") lv = "rec";
      else if (o && LEVEL_MAX[o.lv]) lv = o.lv;
      if (o && (o.fmt === "all" || o.fmt === "m" || o.fmt === "s")) fmt = o.fmt;
      if (o && o.hide === true) hide = true;
      if (o && typeof o.nospoil === "boolean") nospoil = o.nospoil;
    } catch (e) {}
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        seen: Object.keys(seen), lv: lv, fmt: fmt, hide: hide, nospoil: nospoil
      }));
    } catch (e) {}
  }

  /* ---------- código para mover el progreso ---------- */
  function makeCode() {
    var ids = D.filter(function (d) { return seen[d.id]; }).map(function (d) { return d.id; });
    return ids.length ? CODE_PREFIX + btoa(ids.join(",")) : "";
  }
  /* Devuelve un array de ids conocidos, o null si el código no es válido */
  function parseCode(text) {
    var s = String(text || "").trim();
    if (s.slice(0, CODE_PREFIX.length) !== CODE_PREFIX) return null;
    try {
      var raw = atob(s.slice(CODE_PREFIX.length).replace(/\s+/g, ""));
      if (!/^[a-z0-9,-]+$/.test(raw)) return null;
      var ids = raw.split(",").filter(function (id) { return idx[id] !== undefined; });
      return ids.length ? ids : null;
    } catch (e) {
      return null;
    }
  }
  function say(id, text, isErr) {
    var el = $(id);
    el.textContent = text;
    el.classList.toggle("err", !!isErr);
  }

  /* ---------- construir la línea temporal ---------- */
  function build() {
    var html = "";
    ERAS.forEach(function (e, ei) {
      html += '<section class="era" data-era="' + ei + '"><header class="era-h"><h2>' + esc(e.name) + '</h2>' +
        '<p class="era-m">' + esc(e.sub) + ' · <span id="era-c' + ei + '"></span></p></header><ol class="list">';
      D.forEach(function (d, i) {
        if (d.era !== ei) return;
        var series = d.kind === "s", pill = PILL[d.level];
        html += '<li class="item' + (d.level === 3 ? " opt" : "") + '" data-i="' + i + '">' +
          '<input class="chk" type="checkbox" id="c-' + d.id + '">' +
          '<label class="node" for="c-' + d.id + '" aria-hidden="true"><span class="num">' + (i + 1) + '</span>' + CK + '</label>' +
          '<div class="card">' +
          '<label class="body" for="c-' + d.id + '">' +
          '<span class="ttl">' + esc(d.title) + '</span>' +
          '<span class="dsc"></span>' +
          '<span class="why"><b>Doomsday</b>' + esc(d.why) + '</span>' +
          '<span class="meta">' +
          '<span class="pill ' + pill[0] + '">' + pill[1] + '</span>' +
          '<span>' + (series ? "Serie" : "Película") + ' · ' + esc(d.year) + '</span>' +
          '<span>' + esc(TH[d.thread]) + '</span>' +
          '<span>' + (series ? "≈ " : "") + dur(d.minutes) + '</span>' +
          '</span></label>' +
          '<button type="button" class="upto" data-i="' + i + '" aria-label="Marcar como vistos todos los títulos hasta ' + esc(d.title) + '">Ya vi todo hasta aquí</button>' +
          '</div></li>';
      });
      html += '</ol></section>';
    });
    $("eras").innerHTML = html;
  }

  /* El reloj tiene una marca por cada título del nivel elegido */
  function buildRing(scope) {
    var n = scope.length, step = 360 / n, out = "";
    tickEls = {};
    scope.forEach(function (gi, k) {
      var d = D[gi];
      var a = (-90 + step / 2 + k * step) * Math.PI / 180;
      var r2 = 112, r1 = TICK_LEN[d.level];
      var pts = ' x1="' + (120 + r1 * Math.cos(a)).toFixed(2) + '" y1="' + (120 + r1 * Math.sin(a)).toFixed(2) +
        '" x2="' + (120 + r2 * Math.cos(a)).toFixed(2) + '" y2="' + (120 + r2 * Math.sin(a)).toFixed(2) + '"';
      out += '<g class="tkg" data-i="' + gi + '"><title>' + (k + 1) + '. ' + esc(d.title) + '</title>' +
        '<line class="hit"' + pts + '></line><line class="tk"' + pts + '></line></g>';
    });
    $("ticks").innerHTML = out;
    scope.forEach(function (gi) { tickEls[gi] = document.querySelector('.tkg[data-i="' + gi + '"] .tk'); });
    ringLv = lv;
  }

  var rows, eraEls;

  function collect() {
    rows = D.map(function (d, i) {
      var li = document.querySelector('.item[data-i="' + i + '"]');
      return {
        d: d, li: li,
        chk: li.querySelector(".chk"),
        num: li.querySelector(".num"),
        dsc: li.querySelector(".dsc"),
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
    if (ringLv !== lv) buildRing(scope);

    var nSeen = 0, remain = 0, allPrev = true, visibleCount = 0, pos = 0, mCount = 0, sCount = 0;
    var eraSeen = [], eraTot = [], eraVis = [];
    ERAS.forEach(function (_, ei) { eraSeen[ei] = 0; eraTot[ei] = 0; eraVis[ei] = 0; });

    rows.forEach(function (r, i) {
      var d = r.d, s = !!seen[d.id], sc = inScope(d);
      r.chk.checked = s;
      r.li.classList.toggle("seen", s);
      r.dsc.textContent = nospoil ? d.neutral : d.spoiler;
      var ok = false;
      if (sc) {
        pos++;
        r.num.textContent = pos;
        if (tickEls[i]) tickEls[i].classList.toggle("on", s);
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
      var first = null;
      Array.prototype.forEach.call(el.querySelectorAll(".item"), function (li) {
        li.classList.remove("first");
        if (!first && !li.hidden) first = li;
      });
      if (first) first.classList.add("first");
    });

    var total = scope.length, seenAll = Object.keys(seen).length;
    $("lede-n").textContent = total;
    $("st-total").textContent = total;
    $("n-fmt-m").textContent = mCount;
    $("n-fmt-s").textContent = sCount;
    $("st-seen").textContent = nSeen;
    $("st-left").textContent = remain ? dur(remain) : "Nada";
    var pace;
    if (!remain) pace = "Listo para el estreno";
    else if (days <= 0) pace = "Ya en cines";
    else pace = (remain / 60 / (Math.max(days, 1) / 7)).toFixed(1).replace(".", ",") + " <small>h por semana</small>";
    $("st-pace").innerHTML = pace;

    $("empty").hidden = visibleCount !== 0;
    $("reset-box").hidden = seenAll === 0;
    if (seenAll === 0) $("reset-ask").hidden = true;
    $("reset-n").textContent = seenAll;
    $("live").textContent = nSeen + " de " + total + " títulos vistos";
    $("code-out").value = makeCode();

    if (aeLi && aeLi.hidden) {
      var all = rows.map(function (r) { return r.li; });
      var i0 = all.indexOf(aeLi), target = null, j;
      for (j = i0 + 1; j < all.length && !target; j++) if (!all[j].hidden) target = all[j];
      for (j = i0 - 1; j >= 0 && !target; j--) if (!all[j].hidden) target = all[j];
      if (target) target.querySelector(".chk").focus();
    }
  }

  function syncControls() {
    $("lv-" + lv).checked = true;
    $("fmt-" + fmt).checked = true;
    $("hide-seen").checked = hide;
    $("nospoil").checked = nospoil;
  }

  /* Lleva la vista a una tarjeta, quitando los filtros que la esconden */
  function goTo(i) {
    var r = rows[i];
    if (!inScope(r.d)) {
      lv = LEVEL_KEYS[r.d.level - 1];
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

  $("n-lv-ess").textContent = count(function (d) { return d.level <= 1; });
  $("n-lv-rec").textContent = count(function (d) { return d.level <= 2; });
  $("n-lv-opt").textContent = count(function (d) { return d.level <= 3; });
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
  $("ticks").addEventListener("click", function (e) {
    var g = e.target.closest(".tkg");
    if (g) goTo(+g.getAttribute("data-i"));
  });

  Array.prototype.forEach.call(document.querySelectorAll('input[name="lv"]'), function (el) {
    el.addEventListener("change", function () { if (el.checked) { lv = el.value; save(); update(); } });
  });
  Array.prototype.forEach.call(document.querySelectorAll('input[name="fmt"]'), function (el) {
    el.addEventListener("change", function () { if (el.checked) { fmt = el.value; save(); update(); } });
  });
  $("hide-seen").addEventListener("change", function () { hide = this.checked; save(); update(); });
  $("nospoil").addEventListener("change", function () { nospoil = this.checked; save(); update(); });

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

  $("copy").addEventListener("click", function () {
    var out = $("code-out"), code = out.value;
    if (!code) { say("copy-msg", "Todavía no hay nada que copiar.", true); return; }
    function fallback() {
      out.focus(); out.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      say("copy-msg", ok ? "Copiado" : "Selecciona el texto y cópialo.", !ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () { say("copy-msg", "Copiado", false); }, fallback);
    } else {
      fallback();
    }
  });
  $("import").addEventListener("click", function () {
    var text = $("code-in").value;
    if (!text.trim()) { say("import-msg", "Pega primero un código.", true); return; }
    var ids = parseCode(text);
    if (!ids) { say("import-msg", "Ese código no es válido. Copia el código completo desde el otro dispositivo.", true); return; }
    var added = 0;
    ids.forEach(function (id) { if (!seen[id]) { seen[id] = true; added++; } });
    save(); update();
    $("code-in").value = "";
    say("import-msg", added ? "Importados " + added + (added === 1 ? " título nuevo." : " títulos nuevos.") : "Ya tenías todos esos títulos marcados.", false);
  });
  $("code-in").addEventListener("input", function () { say("import-msg", "", false); });

  /* Al volver a la pestaña puede haber pasado un día */
  document.addEventListener("visibilitychange", function () { if (!document.hidden) update(); });

  update();
})();
