/*
  Datos de "Camino a Doomsday".
  Edita este fichero para cambiar la lista. No hace falta tocar script.js.

  Cada título:
    id       identificador único, sin espacios (se usa para guardar el progreso)
    era      0 = Saga del Infinito, 1 = Saga del Multiverso (índice en "eras")
    level    1 = imprescindible, 2 = recomendada, 3 = opcional (se ve solo al elegir "+ Opcionales")
    kind     "m" = película, "s" = serie
    title    nombre que se muestra
    year     año o rango de años
    thread   clave en "threads" (hilo argumental)
    minutes  duración aproximada; en series, la de la temporada completa
    neutral  descripción sin spoilers
    spoiler  descripción con spoilers
    why      qué conecta con Avengers: Doomsday (sin spoilers)

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
      spoiler: "Steve y Peggy. Su historia es la clave emocional de Endgame.",
      why: "Steve Rogers (Chris Evans) y Peggy Carter (Hayley Atwell) están confirmados en Doomsday."
    },
    {
      id: "iron-man", era: 0, level: 2, kind: "m", title: "Iron Man", year: "2008", thread: "a", minutes: 126,
      neutral: "El primer título del MCU y la presentación de Tony Stark.",
      spoiler: "Arranca el MCU. Tony revela que es Iron Man y Fury le habla de los Vengadores.",
      why: "Robert Downey Jr. vuelve, pero como Victor von Doom y no como Tony Stark."
    },
    {
      id: "avengers", era: 0, level: 1, kind: "m", title: "Los Vengadores", year: "2012", thread: "a", minutes: 143,
      neutral: "Los héroes se reúnen por primera vez para frenar una invasión.",
      spoiler: "Nace el equipo. Loki lidera la invasión y la escena final revela a Thanos.",
      why: "Steve, Thor y Loki están confirmados en Doomsday."
    },
    {
      id: "winter-soldier", era: 0, level: 2, kind: "m", title: "Capitán América: El soldado de invierno", year: "2014", thread: "a", minutes: 136,
      neutral: "Steve se enfrenta a una conspiración dentro de su propia organización.",
      spoiler: "S.H.I.E.L.D. estaba infiltrada por HYDRA. Reaparece Bucky y Sam se une a Steve.",
      why: "Bucky Barnes (Sebastian Stan) y Sam Wilson (Anthony Mackie) están en el reparto."
    },
    {
      id: "civil-war", era: 0, level: 2, kind: "m", title: "Capitán América: Civil War", year: "2016", thread: "a", minutes: 147,
      neutral: "Los Vengadores discrepan sobre cómo deben actuar.",
      spoiler: "Los Vengadores se separan por los Acuerdos de Sokovia.",
      why: "Steve, Bucky y Sam, los tres protagonistas, están confirmados."
    },
    {
      id: "black-widow", era: 0, level: 2, kind: "m", title: "Viuda Negra", year: "2021", thread: "g", minutes: 134,
      neutral: "Natasha Romanoff se enfrenta a su pasado.",
      spoiler: "Presenta a Yelena, la protagonista de Thunderbolts*. La escena final apunta a Hawkeye.",
      why: "Yelena Belova (Florence Pugh) forma parte de los Nuevos Vengadores."
    },
    {
      id: "black-panther", era: 0, level: 2, kind: "m", title: "Black Panther", year: "2018", thread: "g", minutes: 134,
      neutral: "T'Challa asume el trono de Wakanda.",
      spoiler: "T'Challa se convierte en rey y Wakanda se abre al mundo.",
      why: "Shuri (Letitia Wright) y M'Baku (Winston Duke) están confirmados."
    },
    {
      id: "ragnarok", era: 0, level: 2, kind: "m", title: "Thor: Ragnarok", year: "2017", thread: "a", minutes: 130,
      neutral: "Thor se enfrenta a una amenaza que pone en peligro Asgard.",
      spoiler: "Hela destruye Mjolnir y Asgard, y Thor pierde un ojo.",
      why: "Thor (Chris Hemsworth) vuelve en Doomsday."
    },
    {
      id: "ant-wasp", era: 0, level: 2, kind: "m", title: "Ant-Man y la Avispa", year: "2018", thread: "a", minutes: 118,
      neutral: "Scott Lang, Hope y Hank buscan a Janet en el Reino Cuántico.",
      spoiler: "Rescatan a Janet, aparece Ghost y la escena final coincide con el chasquido.",
      why: "Ghost (Hannah John-Kamen) y Scott Lang (Paul Rudd) están confirmados."
    },
    {
      id: "infinity-war", era: 0, level: 1, kind: "m", title: "Vengadores: Infinity War", year: "2018", thread: "a", minutes: 149,
      neutral: "Thanos busca las seis Gemas del Infinito.",
      spoiler: "Thanos las consigue y chasquea los dedos: la mitad de la vida desaparece.",
      why: "Cierra la historia del Loki original y deja a Thor como uno de los pocos Vengadores originales."
    },
    {
      id: "endgame", era: 0, level: 1, kind: "m", title: "Vengadores: Endgame", year: "2019", thread: "a", minutes: 182,
      neutral: "Cinco años después, los Vengadores intentan reparar lo ocurrido.",
      spoiler: "Tony muere y Steve le pasa el escudo a Sam.",
      why: "La más importante de las anteriores: Doomsday llega siete años después de esta película."
    },
    {
      id: "wandavision", era: 1, level: 2, kind: "s", title: "WandaVision (temporada 1)", year: "2021", thread: "p", minutes: 360,
      neutral: "Wanda y Vision viven en una comedia de situación que esconde algo.",
      spoiler: "El duelo de Wanda atrapa a todo un pueblo. Toma el Darkhold y nace la Bruja Escarlata.",
      why: "Es la base de la trama de Doctor Strange en el multiverso de la locura. Wanda no está anunciada para Doomsday."
    },
    {
      id: "fatws", era: 1, level: 2, kind: "s", title: "Falcon y el Soldado de Invierno (temporada 1)", year: "2021", thread: "g", minutes: 300,
      neutral: "Sam y Bucky se ven obligados a trabajar juntos.",
      spoiler: "Sam recibe el escudo y se convierte en Capitán América.",
      why: "Sam Wilson, ya como Capitán América, lidera a los Vengadores en Doomsday."
    },
    {
      id: "loki-s1", era: 1, level: 1, kind: "s", title: "Loki (temporada 1)", year: "2021", thread: "p", minutes: 300,
      neutral: "Loki queda a merced del TVA, la agencia que vigila el tiempo.",
      spoiler: "Se descubre quién está detrás del TVA y se liberan todas las variantes de Kang en el multiverso.",
      why: "Loki está confirmado en Doomsday y estas temporadas explican el multiverso."
    },
    {
      id: "shang-chi", era: 1, level: 1, kind: "m", title: "Shang-Chi y la leyenda de los Diez Anillos", year: "2021", thread: "g", minutes: 132,
      neutral: "Shang-Chi se enfrenta a la organización de su padre, los Diez Anillos.",
      spoiler: "Shang-Chi se queda con los anillos, que emiten una señal que sigue sin respuesta.",
      why: "Shang-Chi (Simu Liu) vuelve, su primera aparición en cine desde 2021."
    },
    {
      id: "no-way-home", era: 1, level: 1, kind: "m", title: "Spider-Man: No Way Home", year: "2021", thread: "p", minutes: 148,
      neutral: "Peter Parker le pide ayuda a Doctor Strange y un hechizo sale mal.",
      spoiler: "Cruzan villanos y otros Spider-Men de otros universos. Tía May muere y el mundo olvida a Peter.",
      why: "Explica cómo personajes de otros universos cruzan al MCU. Tom Holland no está en el reparto anunciado."
    },
    {
      id: "multiverse-madness", era: 1, level: 1, kind: "m", title: "Doctor Strange en el multiverso de la locura", year: "2022", thread: "p", minutes: 126,
      neutral: "Strange protege a América Chávez, una joven capaz de viajar entre universos.",
      spoiler: "Wanda es la villana. Aparecen las incursiones y muere el Profesor X de otro universo.",
      why: "Presenta las incursiones, choques entre universos que amenazan a todos. Strange no está anunciado."
    },
    {
      id: "love-thunder", era: 1, level: 2, kind: "m", title: "Thor: Love and Thunder", year: "2022", thread: "a", minutes: 119,
      neutral: "Thor se enfrenta a Gorr, el Carnicero de Dioses.",
      spoiler: "Jane Foster empuña Mjolnir y muere. Thor adopta a Love, la hija de Gorr.",
      why: "Love aparece en los tráileres de Doomsday."
    },
    {
      id: "wakanda-forever", era: 1, level: 1, kind: "m", title: "Black Panther: Wakanda Forever", year: "2022", thread: "g", minutes: 161,
      neutral: "Wakanda se enfrenta a una nueva amenaza bajo el mar.",
      spoiler: "T'Challa ha muerto y Shuri es la nueva Pantera Negra. Llegan Namor y Talokan.",
      why: "Shuri, M'Baku, Namor (Tenoch Huerta) y Namora (Mabel Cadena) están confirmados."
    },
    {
      id: "quantumania", era: 1, level: 2, kind: "m", title: "Ant-Man y la Avispa: Quantumania", year: "2023", thread: "p", minutes: 124,
      neutral: "Scott y Cassie quedan atrapados en el Reino Cuántico.",
      spoiler: "Vencen a Kang, y la escena final muestra un consejo de sus variantes.",
      why: "Scott Lang está confirmado y Cassie (Kathryn Newton) aparece en el tráiler."
    },
    {
      id: "loki-s2", era: 1, level: 1, kind: "s", title: "Loki (temporada 2)", year: "2023", thread: "p", minutes: 300,
      neutral: "Loki intenta arreglar el TVA antes de que se rompa el tiempo.",
      spoiler: "Loki se sacrifica y pasa a sostener todas las líneas temporales.",
      why: "Deja al multiverso estable, y Loki está confirmado en Doomsday."
    },
    {
      id: "the-marvels", era: 1, level: 3, kind: "m", title: "The Marvels", year: "2023", thread: "p", minutes: 105,
      neutral: "Carol Danvers, Kamala Khan y Monica Rambeau ven cómo sus poderes se entrelazan.",
      spoiler: "Monica acaba en un universo alternativo con mutantes, y la escena final presenta a Beast.",
      why: "Introduce al Beast de Kelsey Grammer, que vuelve en Doomsday. Teyonah Parris (Monica) no está anunciada."
    },
    {
      id: "deadpool-wolverine", era: 1, level: 1, kind: "m", title: "Deadpool & Wolverine", year: "2024", thread: "p", minutes: 128,
      neutral: "Deadpool y Wolverine forman equipo para salvar un universo.",
      spoiler: "Salvan la línea de Fox de un funcionario del TVA que la borra y derrotan a Cassandra Nova.",
      why: "Gambit (Channing Tatum) vuelve, y explica por qué pueden aparecer personajes de los X-Men de Fox."
    },
    {
      id: "brave-new-world", era: 1, level: 1, kind: "m", title: "Capitán América: Brave New World", year: "2025", thread: "g", minutes: 118,
      neutral: "Sam Wilson debuta como Capitán América en su primera película en solitario.",
      spoiler: "Sam derrota a Hulk Rojo (Thaddeus Ross) y queda a cargo de rehacer los Vengadores.",
      why: "Sam Wilson y Joaquin Torres (Danny Ramirez) están confirmados."
    },
    {
      id: "thunderbolts", era: 1, level: 1, kind: "m", title: "Thunderbolts*", year: "2025", thread: "g", minutes: 127,
      neutral: "Un grupo de antihéroes acaba en una misión que no es lo que parece.",
      spoiler: "Se convierten en los Nuevos Vengadores y la escena final enseña la nave de los 4 Fantásticos.",
      why: "Yelena, Bucky, Red Guardian, Ghost y John Walker son los Nuevos Vengadores de Doomsday."
    },
    {
      id: "fantastic-four", era: 1, level: 1, kind: "m", title: "Los 4 Fantásticos: Primeros pasos", year: "2025", thread: "p", minutes: 130,
      neutral: "Los 4 Fantásticos defienden su mundo alternativo de Galactus.",
      spoiler: "La escena final muestra a Doom acercándose al joven Franklin Richards.",
      why: "Pedro Pascal, Vanessa Kirby, Joseph Quinn y Ebon Moss-Bachrach están confirmados."
    },
    {
      id: "brand-new-day", era: 1, level: 3, kind: "m", title: "Spider-Man: Brand New Day", year: "2026", thread: "p", minutes: 130,
      neutral: "Peter Parker lucha contra el crimen a tiempo completo en un mundo que ya no lo recuerda.",
      spoiler: "Presenta a Jean Grey (Sadie Sink) como mutante del universo principal, y la escena final localiza a un Spider-Man en el espacio.",
      why: "Yelena, confirmada en Doomsday, aparece aquí. La escena final parece apuntar al próximo cruce. Tom Holland no está anunciado."
    }
  ]
};
