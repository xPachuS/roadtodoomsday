/*
  Datos de "Camino a Doomsday".
  Edita este fichero para cambiar la lista. No hace falta tocar script.js.

  Cada título:
    id       identificador único, sin espacios (se usa para guardar el progreso)
    era      0 = Saga del Infinito, 1 = Saga del Multiverso (índice en "eras")
    level    1 = imprescindible, 2 = recomendada, 3 = opcional (se ve solo al marcar "Opcionales")
    kind     "m" = película, "s" = serie
    title    nombre que se muestra
    year     año o rango de años
    thread   clave en "threads" (hilo argumental)
    minutes  duración aproximada; en series, la de la temporada completa
    neutral  descripción sin destripar nada
    why      qué conecta con Avengers: Doomsday (solo reparto y tramas anunciados, sin destripar)

  El orden del array es el orden de la historia.
*/
window.MCU = {
  target: "2026-12-18",
  eras: [
    { name: "Saga del Infinito", sub: "Hasta Endgame" },
    { name: "Saga del Multiverso", sub: "Después de Endgame" }
  ],
  threads: { a: "Vengadores", p: "Multiverso", g: "Nuevos héroes" },
  titles: [
    {
      id: "first-avenger", era: 0, level: 1, kind: "m", title: "Capitán América: El primer vengador", year: "2011", thread: "a", minutes: 124,
      neutral: "El origen de Steve Rogers durante la Segunda Guerra Mundial.",
      why: "Chris Evans (Steve Rogers) y Hayley Atwell (Peggy Carter) están confirmados en Doomsday."
    },
    {
      id: "iron-man", era: 0, level: 2, kind: "m", title: "Iron Man", year: "2008", thread: "a", minutes: 126,
      neutral: "El primer título del MCU y la presentación de Tony Stark.",
      why: "Robert Downey Jr. vuelve, pero como Victor von Doom y no como Tony Stark."
    },
    {
      id: "avengers", era: 0, level: 1, kind: "m", title: "Los Vengadores", year: "2012", thread: "a", minutes: 143,
      neutral: "Los héroes se reúnen por primera vez para frenar una invasión.",
      why: "Steve, Thor y Loki están confirmados en Doomsday."
    },
    {
      id: "winter-soldier", era: 0, level: 2, kind: "m", title: "Capitán América: El soldado de invierno", year: "2014", thread: "a", minutes: 136,
      neutral: "Steve se enfrenta a una conspiración dentro de su propia organización.",
      why: "Bucky Barnes (Sebastian Stan) y Sam Wilson (Anthony Mackie) están en el reparto."
    },
    {
      id: "civil-war", era: 0, level: 2, kind: "m", title: "Capitán América: Civil War", year: "2016", thread: "a", minutes: 147,
      neutral: "Los Vengadores discrepan sobre cómo deben actuar.",
      why: "Steve, Bucky y Sam, los tres protagonistas, están confirmados."
    },
    {
      id: "black-widow", era: 0, level: 2, kind: "m", title: "Viuda Negra", year: "2021", thread: "g", minutes: 134,
      neutral: "Natasha Romanoff se enfrenta a su pasado.",
      why: "Presenta a Yelena Belova (Florence Pugh), confirmada en Doomsday."
    },
    {
      id: "black-panther", era: 0, level: 2, kind: "m", title: "Black Panther", year: "2018", thread: "g", minutes: 134,
      neutral: "T'Challa asume el trono de Wakanda.",
      why: "Shuri (Letitia Wright) y M'Baku (Winston Duke) están confirmados."
    },
    {
      id: "ragnarok", era: 0, level: 2, kind: "m", title: "Thor: Ragnarok", year: "2017", thread: "a", minutes: 130,
      neutral: "Thor se enfrenta a una amenaza que pone en peligro Asgard.",
      why: "Thor (Chris Hemsworth) vuelve en Doomsday."
    },
    {
      id: "ant-wasp", era: 0, level: 2, kind: "m", title: "Ant-Man y la Avispa", year: "2018", thread: "a", minutes: 118,
      neutral: "Scott Lang, Hope y Hank buscan a Janet en el Reino Cuántico.",
      why: "Ghost (Hannah John-Kamen) y Scott Lang (Paul Rudd) están confirmados."
    },
    {
      id: "infinity-war", era: 0, level: 1, kind: "m", title: "Vengadores: Infinity War", year: "2018", thread: "a", minutes: 149,
      neutral: "Thanos busca las seis Gemas del Infinito.",
      why: "Reúne a los héroes más importantes de la Saga del Infinito y da paso a Endgame. Thor vuelve en Doomsday."
    },
    {
      id: "endgame", era: 0, level: 1, kind: "m", title: "Vengadores: Endgame", year: "2019", thread: "a", minutes: 182,
      neutral: "Cinco años después, los Vengadores intentan reparar lo ocurrido.",
      why: "La más importante de las anteriores: Doomsday llega siete años después de esta película."
    },
    {
      id: "wandavision", era: 1, level: 2, kind: "s", title: "WandaVision (temporada 1)", year: "2021", thread: "p", minutes: 360,
      neutral: "Wanda y Vision viven en una comedia de situación que esconde algo.",
      why: "Prepara la trama de Doctor Strange en el multiverso de la locura. Wanda no está anunciada para Doomsday."
    },
    {
      id: "fatws", era: 1, level: 2, kind: "s", title: "Falcon y el Soldado de Invierno (temporada 1)", year: "2021", thread: "g", minutes: 300,
      neutral: "Sam y Bucky se ven obligados a trabajar juntos.",
      why: "Sam Wilson y Bucky Barnes, sus protagonistas, están confirmados en Doomsday."
    },
    {
      id: "loki-s1", era: 1, level: 1, kind: "s", title: "Loki (temporada 1)", year: "2021", thread: "p", minutes: 300,
      neutral: "Loki queda a merced del TVA, la agencia que vigila el tiempo.",
      why: "Loki está confirmado en Doomsday y estas temporadas explican el multiverso."
    },
    {
      id: "shang-chi", era: 1, level: 1, kind: "m", title: "Shang-Chi y la leyenda de los Diez Anillos", year: "2021", thread: "g", minutes: 132,
      neutral: "Shang-Chi se enfrenta a la organización de su padre, los Diez Anillos.",
      why: "Shang-Chi (Simu Liu) vuelve, su primera aparición en cine desde 2021."
    },
    {
      id: "no-way-home", era: 1, level: 1, kind: "m", title: "Spider-Man: No Way Home", year: "2021", thread: "p", minutes: 148,
      neutral: "Peter Parker le pide ayuda a Doctor Strange y un hechizo sale mal.",
      why: "Explica cómo personajes de otros universos cruzan al MCU. Tom Holland no está en el reparto anunciado."
    },
    {
      id: "multiverse-madness", era: 1, level: 1, kind: "m", title: "Doctor Strange en el multiverso de la locura", year: "2022", thread: "p", minutes: 126,
      neutral: "Strange protege a América Chávez, una joven capaz de viajar entre universos.",
      why: "Sienta las bases del multiverso que Doomsday retoma. Strange no está anunciado."
    },
    {
      id: "love-thunder", era: 1, level: 2, kind: "m", title: "Thor: Love and Thunder", year: "2022", thread: "a", minutes: 119,
      neutral: "Thor se enfrenta a Gorr, el Carnicero de Dioses.",
      why: "Un personaje nuevo de esta película aparece en los tráileres de Doomsday."
    },
    {
      id: "wakanda-forever", era: 1, level: 1, kind: "m", title: "Black Panther: Wakanda Forever", year: "2022", thread: "g", minutes: 161,
      neutral: "Wakanda se enfrenta a una nueva amenaza bajo el mar.",
      why: "Shuri, M'Baku, Namor (Tenoch Huerta) y Namora (Mabel Cadena) están confirmados."
    },
    {
      id: "quantumania", era: 1, level: 2, kind: "m", title: "Ant-Man y la Avispa: Quantumania", year: "2023", thread: "p", minutes: 124,
      neutral: "Scott y Cassie quedan atrapados en el Reino Cuántico.",
      why: "Scott Lang está confirmado y Cassie (Kathryn Newton) aparece en el tráiler."
    },
    {
      id: "loki-s2", era: 1, level: 1, kind: "s", title: "Loki (temporada 2)", year: "2023", thread: "p", minutes: 300,
      neutral: "Loki intenta arreglar el TVA antes de que se rompa el tiempo.",
      why: "Continúa directamente la primera temporada, y Loki está confirmado en Doomsday."
    },
    {
      id: "the-marvels", era: 1, level: 3, kind: "m", title: "The Marvels", year: "2023", thread: "p", minutes: 105,
      neutral: "Carol Danvers, Kamala Khan y Monica Rambeau ven cómo sus poderes se entrelazan.",
      why: "Incluye una conexión con los X-Men que Doomsday retoma. Teyonah Parris (Monica) no está anunciada."
    },
    {
      id: "deadpool-wolverine", era: 1, level: 1, kind: "m", title: "Deadpool & Wolverine", year: "2024", thread: "p", minutes: 128,
      neutral: "Deadpool y Wolverine forman equipo para salvar un universo.",
      why: "Explica por qué pueden aparecer personajes de los X-Men de Fox. Gambit (Channing Tatum) está confirmado."
    },
    {
      id: "brave-new-world", era: 1, level: 1, kind: "m", title: "Capitán América: Brave New World", year: "2025", thread: "g", minutes: 118,
      neutral: "Sam Wilson debuta como Capitán América en su primera película en solitario.",
      why: "Sam Wilson y Joaquin Torres (Danny Ramirez) están confirmados."
    },
    {
      id: "thunderbolts", era: 1, level: 1, kind: "m", title: "Thunderbolts*", year: "2025", thread: "g", minutes: 127,
      neutral: "Un grupo de antihéroes acaba en una misión que no es lo que parece.",
      why: "Yelena, Bucky, Red Guardian, Ghost y John Walker están confirmados en Doomsday."
    },
    {
      id: "fantastic-four", era: 1, level: 1, kind: "m", title: "Los 4 Fantásticos: Primeros pasos", year: "2025", thread: "p", minutes: 130,
      neutral: "Los 4 Fantásticos defienden su mundo alternativo de Galactus.",
      why: "Pedro Pascal, Vanessa Kirby, Joseph Quinn y Ebon Moss-Bachrach están confirmados."
    },
    {
      id: "brand-new-day", era: 1, level: 3, kind: "m", title: "Spider-Man: Brand New Day", year: "2026", thread: "p", minutes: 130,
      neutral: "Peter Parker afronta una nueva etapa como Spider-Man.",
      why: "Yelena, confirmada en Doomsday, aparece aquí. Podría apuntar al próximo cruce, según NME. Tom Holland no está anunciado."
    }
  ]
};
