(function () {
  var TARGET = new Date(2026, 11, 18);
  var KEY = "camino-a-doomsday-v1";
  var ERAS = [
    { n: "Saga del Infinito", s: "Hasta Endgame" },
    { n: "Saga del Multiverso", s: "Después de Endgame" }
  ];
  var TH = { a: "Vengadores", p: "Multiverso", g: "Nuevos héroes" };
  var RAW = [
    ["first-avenger", 0, 1, "m", "Capitán América: El primer vengador", "Steve y Peggy. Su historia es la clave emocional de Endgame.", "2011", "a", 124],
    ["iron-man", 0, 2, "m", "Iron Man", "Arranca el MCU. Robert Downey Jr. vuelve ahora como Doom.", "2008", "a", 126],
    ["avengers", 0, 1, "m", "Los Vengadores", "Nace el equipo y Loki roba la Tesseract.", "2012", "a", 143],
    ["winter-soldier", 0, 2, "m", "Capitán América: El soldado de invierno", "Reaparece Bucky y Sam se une a Steve.", "2014", "a", 136],
    ["civil-war", 0, 2, "m", "Capitán América: Civil War", "Los Vengadores se separan. Bucky, Sam y Steve, en pleno choque.", "2016", "a", 147],
    ["black-widow", 0, 2, "m", "Viuda Negra", "Presenta a Yelena, líder de Thunderbolts*.", "2021", "g", 134],
    ["black-panther", 0, 2, "m", "Black Panther", "Presenta a Shuri y a Wakanda.", "2018", "g", 134],
    ["ragnarok", 0, 2, "m", "Thor: Ragnarok", "Asgard cae y Thor pierde el ojo.", "2017", "a", 130],
    ["ant-wasp", 0, 2, "m", "Ant-Man y la Avispa", "Presenta a Ghost y adelanta el chasquido.", "2018", "a", 118],
    ["infinity-war", 0, 1, "m", "Vengadores: Infinity War", "Thanos consigue las seis gemas.", "2018", "a", 149],
    ["endgame", 0, 1, "m", "Vengadores: Endgame", "Tony muere y Steve le pasa el escudo a Sam.", "2019", "a", 182],
    ["wandavision", 1, 2, "s", "WandaVision (temporada 1)", "Wanda toma el Darkhold y nace la Bruja Escarlata.", "2021", "p", 360],
    ["fatws", 1, 2, "s", "Falcon y el Soldado de Invierno (temporada 1)", "Sam recibe el escudo y se convierte en Capitán América.", "2021", "g", 300],
    ["loki", 1, 1, "s", "Loki (temporadas 1 y 2)", "El TVA, las variantes y el multiverso.", "2021 a 2023", "p", 600],
    ["shang-chi", 1, 1, "m", "Shang-Chi y la leyenda de los Diez Anillos", "Los anillos emiten una señal que sigue sin respuesta.", "2021", "g", 132],
    ["no-way-home", 1, 1, "m", "Spider-Man: No Way Home", "Personajes de otros universos cruzan al 616.", "2021", "p", 148],
    ["multiverse-madness", 1, 1, "m", "Doctor Strange en el multiverso de la locura", "Las incursiones amenazan todos los universos.", "2022", "p", 126],
    ["love-thunder", 1, 2, "m", "Thor: Love and Thunder", "Thor adopta a Love, que aparece en los tráileres.", "2022", "a", 119],
    ["wakanda-forever", 1, 1, "m", "Black Panther: Wakanda Forever", "Shuri toma el manto. Llegan Namor y Talokan.", "2022", "g", 161],
    ["quantumania", 1, 2, "m", "Ant-Man y la Avispa: Quantumania", "Kang y su consejo de variantes.", "2023", "p", 124],
    ["deadpool-wolverine", 1, 1, "m", "Deadpool & Wolverine", "Presenta a Gambit y viaja por el Vacío del TVA.", "2024", "p", 128],
    ["brave-new-world", 1, 1, "m", "Capitán América: Brave New World", "Sam Wilson empieza a reconstruir a los Vengadores.", "2025", "g", 118],
    ["thunderbolts", 1, 1, "m", "Thunderbolts*", "Nacen los Nuevos Vengadores. La escena final es clave.", "2025", "g", 127],
    ["fantastic-four", 1, 1, "m", "Los 4 Fantásticos: Primeros pasos", "Tierra-828 y el primer vistazo de Doom.", "2025", "p", 130]
  ];
  var D = RAW.map(function (r) {
    return { id: r[0], era: r[1], lv: r[2], k: r[3], t: r[4], d: r[5], y: r[6], th: r[7], min: r[8] };
  });
  var N = D.length;
  var CK = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var seen = {}, lv = "all", fmt = "all", hide = false;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var o = JSON.parse(raw);
      if (o && Array.isArray(o.seen)) {
        o.seen.forEach(function (id) {
          if (D.some(function (d) { return d.id === id; })) seen[id] = true;
        });
      }
      if (o && (o.lv === "all" || o.lv === "ess")) lv = o.lv;
      if (o && (o.fmt === "all" || o.fmt === "m" || o.fmt === "s")) fmt = o.fmt;
      if (o && o.hide === true) hide = true;
    } catch (e) {}
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ seen: Object.keys(seen), lv: lv, fmt: fmt, hide: hide }));
    } catch (e) {}
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function dur(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + " h" + (m ? " " + m + " min" : "");
  }
  function $(id) { return document.getElementById(id); }

  /* build timeline once */
  var html = "";
  ERAS.forEach(function (e, ei) {
    html += '<section class="era" data-era="' + ei + '"><header class="era-h"><h2>' + esc(e.n) + '</h2>' +
      '<p class="era-m">' + esc(e.s) + ' · <span id="era-c' + ei + '"></span></p></header><ol class="list">';
    D.forEach(function (d, i) {
      if (d.era !== ei) return;
      var series = d.k === "s";
      html += '<li class="item" data-i="' + i + '">' +
        '<input class="chk" type="checkbox" id="c-' + d.id + '">' +
        '<label class="node" for="c-' + d.id + '" aria-hidden="true"><span class="num">' + (i + 1) + '</span>' + CK + '</label>' +
        '<div class="card">' +
        '<label class="body" for="c-' + d.id + '">' +
        '<span class="ttl">' + esc(d.t) + '</span>' +
        '<span class="dsc">' + esc(d.d) + '</span>' +
        '<span class="meta">' +
        '<span class="pill ' + (d.lv === 1 ? 'p1">Imprescindible' : 'p2">Recomendada') + '</span>' +
        '<span>' + (series ? "Serie" : "Película") + ' · ' + esc(d.y) + '</span>' +
        '<span>' + esc(TH[d.th]) + '</span>' +
        '<span>' + (series ? "≈ " : "") + dur(d.min) + '</span>' +
        '</span></label>' +
        '<button type="button" class="upto" data-i="' + i + '" aria-label="Marcar como vistos todos los títulos hasta ' + esc(d.t) + '">Ya vi todo hasta aquí</button>' +
        '</div></li>';
    });
    html += '</ol></section>';
  });
  $("eras").innerHTML = html;

  /* clock ticks */
  var tickHTML = "";
  for (var i = 0; i < N; i++) {
    var a = (-90 + 7.5 + i * 15) * Math.PI / 180;
    var r2 = 112, r1 = D[i].lv === 1 ? 86 : 98;
    tickHTML += '<line class="tk" data-i="' + i + '" x1="' + (120 + r1 * Math.cos(a)).toFixed(2) + '" y1="' + (120 + r1 * Math.sin(a)).toFixed(2) +
      '" x2="' + (120 + r2 * Math.cos(a)).toFixed(2) + '" y2="' + (120 + r2 * Math.sin(a)).toFixed(2) + '"></line>';
  }
  $("ticks").innerHTML = tickHTML;

  var rows = D.map(function (d, i) {
    var li = document.querySelector('.item[data-i="' + i + '"]');
    return {
      d: d, li: li,
      chk: li.querySelector(".chk"),
      upto: li.querySelector(".upto"),
      tick: document.querySelector('.tk[data-i="' + i + '"]')
    };
  });
  var eraEls = document.querySelectorAll(".era");

  function count(fn) { return D.filter(fn).length; }
  $("st-total").textContent = N;
  $("n-lv-all").textContent = N;
  $("n-lv-ess").textContent = count(function (d) { return d.lv === 1; });
  $("n-fmt-m").textContent = count(function (d) { return d.k === "m"; });
  $("n-fmt-s").textContent = count(function (d) { return d.k === "s"; });

  var days = Math.ceil((TARGET - new Date()) / 864e5);
  $("days").textContent = Math.max(days, 0);

  function update() {
    var ae = document.activeElement;
    var aeLi = ae && ae.closest ? ae.closest(".item") : null;

    var nSeen = 0, remain = 0, allPrev = true, visibleCount = 0;
    var eraSeen = [0, 0], eraTot = [0, 0], eraVis = [0, 0];

    rows.forEach(function (r) {
      var d = r.d, s = !!seen[d.id];
      r.chk.checked = s;
      r.li.classList.toggle("seen", s);
      r.tick.classList.toggle("on", s);
      if (s) nSeen++; else remain += d.min;
      allPrev = allPrev && s;
      r.upto.hidden = allPrev;
      eraTot[d.era]++;
      if (s) eraSeen[d.era]++;
      var ok = (lv === "all" || d.lv === 1) && (fmt === "all" || d.k === fmt) && !(hide && s);
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

    $("st-seen").textContent = nSeen;
    $("st-left").textContent = remain ? dur(remain) : "Nada";
    var pace;
    if (!remain) pace = "Listo para el estreno";
    else if (days <= 0) pace = "Ya en cines";
    else pace = (remain / 60 / (Math.max(days, 1) / 7)).toFixed(1).replace(".", ",") + " <small>h por semana</small>";
    $("st-pace").innerHTML = pace;

    $("empty").hidden = visibleCount !== 0;
    $("reset-box").hidden = nSeen === 0;
    if (nSeen === 0) $("reset-ask").hidden = true;
    $("reset-n").textContent = nSeen;
    $("live").textContent = nSeen + " de " + N + " títulos vistos";

    if (aeLi && aeLi.hidden) {
      var all = rows.map(function (r) { return r.li; });
      var idx = all.indexOf(aeLi), target = null, j;
      for (j = idx + 1; j < all.length && !target; j++) if (!all[j].hidden) target = all[j];
      for (j = idx - 1; j >= 0 && !target; j--) if (!all[j].hidden) target = all[j];
      if (target) target.querySelector(".chk").focus();
    }
  }

  load();
  $("lv-" + lv).checked = true;
  $("fmt-" + (fmt === "all" ? "all" : fmt)).checked = true;
  $("hide-seen").checked = hide;

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
    for (var k = 0; k <= i; k++) seen[D[k].id] = true;
    save(); update();
    rows[i].chk.focus();
  });
  Array.prototype.forEach.call(document.querySelectorAll('input[name="lv"]'), function (el) {
    el.addEventListener("change", function () { if (el.checked) { lv = el.value; save(); update(); } });
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

  update();
})();
