/* ===================================================================
   Contenido de la ayuda. Aquí se editan los textos.
   Cada pantalla es una entrada de S (S.home, S["g-jam"], ...).
   Fuente: Guía del usuario Epson XP-2200 (NPD6908-02).
   =================================================================== */

/* ========= AJUSTES ========= */
// Pon aquí el teléfono de quien ayuda (por ejemplo "+34 600 000 000"). Si se deja vacío, solo se muestra el nombre.
var CONTACT = { nombre: "Sergio", telefono: "" };

/* ========= DATOS ========= */
var S = {};

/* ---- Inicio ---- */
S.home = {type:"menu", crumb:"Inicio", title:"¿Qué le pasa a la impresora?",
  intro:"Elige lo que más se parezca. Te voy guiando paso a paso.",
  items:[
    {ic:"💡", t:"Veo luces encendidas o parpadeando", to:"lights"},
    {ic:"📄", t:"Problema con el papel", to:"paper"},
    {ic:"💧", t:"Tinta y cartuchos", to:"ink"},
    {ic:"🖨️", t:"Sale mal impreso", to:"quality"},
    {ic:"🔌", t:"No imprime o no conecta", to:"noprint"},
    {ic:"❓", t:"Cómo hago…", sub:"Copiar, escanear, cargar papel, apagar", to:"howto"}
  ],
  extra:[{label:"¿Dónde está cada botón y cada luz?", to:"panel"}]
};

/* ---- Luces ---- */
S.lights = {type:"menu", crumb:"Luces", title:"¿Qué luz te llama la atención?",
  intro:"Mira los botones de la parte delantera de la impresora. Elige la luz que está encendida o parpadeando.",
  items:[
    {ic:"💧", t:"La luz de la tinta (la gota)", to:"lights-ink"},
    {ic:"📄", t:"La luz del papel (la hoja)", to:"lights-paper"},
    {ic:"💧📄", t:"La gota y la hoja a la vez", to:"lights-both"},
    {ic:"📶", t:"Las luces de Wi-Fi", to:"lights-wifi"},
    {ic:"⏻", t:"Solo la luz de encendido", to:"lights-power"},
    {ic:"⚠️", t:"Casi todas las luces a la vez", to:"lights-many"}
  ],
  extra:[{label:"Ver dónde está cada luz", to:"panel"}]
};
var CARDS_HINT = "En el dibujo, las luces apagadas o muy claras no importan. Fíjate solo en las que tienen color y texto debajo.";
S["lights-ink"] = {type:"cards", title:"La luz de la tinta (la gota)", intro:CARDS_HINT, cards:[
  {lamps:{ink:"on"}, t:"La luz de la tinta está fija", d:"Un cartucho se ha acabado, falta o no se reconoce.", to:"g-ink-on"},
  {lamps:{ink:"blink"}, t:"La luz de la tinta parpadea", d:"Un cartucho se está acabando. Aún puedes imprimir.", to:"g-ink-low"}
]};
S["lights-paper"] = {type:"cards", title:"La luz del papel (la hoja)", intro:CARDS_HINT, cards:[
  {lamps:{paper:"on"}, t:"La luz del papel está fija", d:"No hay papel o han entrado varias hojas a la vez.", to:"g-nopaper"},
  {lamps:{paper:"slow"}, t:"Parpadea despacio", d:"Hay un atasco de papel.", to:"g-jam"},
  {lamps:{paper:"fast"}, t:"Parpadea rápido", d:"Ha quedado papel dentro de la impresora.", to:"g-paper-inside"}
]};
S["lights-both"] = {type:"cards", title:"La gota y la hoja a la vez", intro:CARDS_HINT, cards:[
  {lamps:{ink:"on",paper:"on"}, t:"Las dos fijas", d:"La impresora se apagó de forma incorrecta.", to:"g-bad-off"},
  {lamps:{ink:"blink",paper:"blink"}, t:"Las dos parpadean a la vez", d:"Una pieza interior que recoge tinta sobrante está casi llena.", to:"g-pad"},
  {lamps:{ink:"blink",paper:"alt"}, t:"Parpadean una y otra, alternando", d:"La pieza que recoge tinta al imprimir sin márgenes está casi llena.", to:"g-pad-borderless"}
]};
S["lights-wifi"] = {type:"cards", title:"Las luces de Wi-Fi", intro:CARDS_HINT, cards:[
  {lamps:{wifi:"blink",direct:"blink"}, t:"Las dos luces de Wi-Fi parpadean", d:"Hay un error de conexión Wi-Fi.", to:"g-wifi-error"},
  {lamps:{wifi:"on"}, t:"Una luz de Wi-Fi fija, sin parpadeos", d:"Todo bien: la impresora está conectada.", to:"g-ok"}
]};
S["lights-power"] = {type:"cards", title:"Solo la luz de encendido", intro:CARDS_HINT, cards:[
  {lamps:{power:"blink"}, t:"La luz de encendido parpadea", d:"La impresora está trabajando. Hay que esperar.", to:"g-working"}
]};
S["lights-many"] = {type:"cards", title:"Casi todas las luces a la vez", intro:CARDS_HINT, cards:[
  {lamps:{wifi:"on",direct:"on",ink:"on",paper:"on"}, t:"Las dos de Wi-Fi, la gota y la hoja, todas fijas", d:"La impresora arrancó en modo de recuperación.", to:"g-recovery"},
  {lamps:{power:"blink",wifi:"blink",direct:"blink",ink:"blink",paper:"blink"}, t:"Todas parpadean, incluida la de encendido", d:"La impresora tiene un error interno.", to:"g-error"}
]};

/* ---- Papel ---- */
S.paper = {type:"menu", crumb:"Papel", title:"Problema con el papel", intro:"¿Qué ocurre?", items:[
  {ic:"🧻", t:"Papel atascado", to:"g-jam"},
  {ic:"🚫", t:"Dice que no hay papel, pero sí hay", to:"g-feed"},
  {ic:"↪️", t:"Entra torcido o salen varias hojas juntas", to:"g-feed"},
  {ic:"📥", t:"Cómo cargar el papel", to:"g-load"}
]};

S["g-jam"] = {type:"guide", title:"Papel atascado", lamps:{paper:"slow"},
  lead:"La luz del papel parpadea despacio. Vamos a sacar el papel con calma.",
  blocks:[
    {k:"warn", h:"Antes de empezar", t:"No pulses ningún botón del panel mientras tengas la mano dentro de la impresora: podría ponerse en marcha y hacerte daño. Saca el papel despacio, sin tirones fuertes."},
    {k:"steps", items:[
      "Saca el papel atascado de la **bandeja de atrás**, por donde se mete el papel.",
      "Saca el papel que haya en la **bandeja de salida**, la de delante.",
      {t:"**Levanta la parte de arriba** (el escáner) con la tapa de documentos cerrada. Se queda sujeta con una varilla de apoyo.", n:"Cuidado con los dedos al abrir y al cerrar."},
      {t:"Mira dentro y **saca todo el papel**, incluidos los trozos rotos.", n:"No toques el cable plano blanco ni la lámina transparente que hay dentro: se podría estropear la impresora."},
      "**Cierra el escáner**: levántalo un poco, pliega la varilla de apoyo y bájalo con cuidado.",
      "Pulsa el **botón de copia** (cualquiera de los dos) para que la luz deje de parpadear."
    ]},
    {k:"list", h:"Para que no vuelva a atascarse", items:[
      "Si el papel está curvado, aplánalo antes de cargarlo.",
      "No pongas más hojas de las permitidas: en papel normal, hasta la marca del triángulo de la guía lateral.",
      "Pon el papel en la dirección correcta y pega la guía lateral al borde.",
      "Si se atasca a menudo, pon las hojas de una en una."
    ]},
    {k:"btns", items:[{label:"Cómo cargar el papel", to:"g-load"}]}
  ], src:"págs. 21 y 124–127"};

S["g-paper-inside"] = {type:"guide", title:"Ha quedado papel dentro", lamps:{paper:"fast"},
  lead:"La luz del papel parpadea rápido. La impresora puede sacar sola el papel que le queda dentro.",
  blocks:[
    {k:"steps", items:[
      "Pon una hoja de papel **A4 en vertical** en la bandeja de atrás.",
      "Pulsa el **botón de copia** (el de blanco y negro o el de color). La impresora expulsa el papel que tenía dentro.",
      "Si la luz sigue parpadeando, sigue la guía de papel atascado."
    ]},
    {k:"btns", items:[{label:"Guía de papel atascado", to:"g-jam"},{label:"Cómo cargar el papel", to:"g-load"}]}
  ], src:"pág. 21"};

S["g-nopaper"] = {type:"guide", title:"No hay papel", lamps:{paper:"on"},
  lead:"La luz del papel está fija: falta papel o han entrado varias hojas a la vez.",
  blocks:[
    {k:"steps", items:[
      "Pon papel A4 en la bandeja de atrás. Si no recuerdas cómo, mira [[g-load|Cómo cargar el papel]].",
      "Pulsa el **botón de copia** (el de blanco y negro o el de color) para continuar."
    ]},
    {k:"tip", h:"Si hay papel y sigue avisando", t:"Saca el papel y vuelve a ponerlo **en el centro** de la bandeja de atrás. Mira también [[g-feed|El papel no entra bien]]."}
  ], src:"págs. 21 y 105"};

S["g-feed"] = {type:"guide", title:"El papel no entra bien",
  lead:"Busca el caso que más se parezca al tuyo.",
  blocks:[
    {k:"cases", items:[
      {q:"Dice que no hay papel, pero sí hay", a:"Saca el papel y vuelve a ponerlo en el centro de la bandeja de atrás."},
      {q:"El papel entra torcido", a:"Carga el papel en la dirección correcta y pega la guía lateral al borde de las hojas."},
      {q:"Salen varias hojas a la vez", a:["Si el papel está húmedo, cambia por papel nuevo.","Airea las hojas antes de cargarlas (la electricidad estática las pega). Si sigue, pon las hojas de una en una.","No pongas más hojas de las permitidas.","En impresión a doble cara manual, saca todo el papel de la bandeja antes de volver a cargarlo."]},
      {q:"No coge el papel", a:["Usa solo papel que admita la impresora.","Comprueba que la impresora está sobre una superficie plana.","Revisa que no hay demasiadas hojas."]}
    ]},
    {k:"btns", items:[{label:"Cómo cargar el papel", to:"g-load"},{label:"Hay un atasco", to:"g-jam"}]}
  ], src:"págs. 25 y 103–105"};

S["g-load"] = {type:"guide", title:"Cómo cargar el papel", fix:false,
  blocks:[
    {k:"steps", items:[
      "Abre la **tapa protectora** de la bandeja de atrás, extiende el soporte del papel y échalo hacia atrás.",
      "Desliza la **guía lateral** hacia la izquierda.",
      {t:"Pon el papel **en vertical, pegado al lado derecho**, con la cara que se imprime hacia arriba.", n:"No pases de la marca del triángulo de la guía en papel normal."},
      "Desliza la guía lateral hasta el borde del papel y cierra la tapa protectora.",
      "Saca la **bandeja de salida** (la de delante)."
    ]},
    {k:"tip", h:"Consejos", t:"Airea y alinea las hojas antes de ponerlas. Si sobran hojas, guárdalas en su paquete: fuera de él se curvan. Los sobres van por el lado corto, con la solapa hacia abajo."}
  ], src:"págs. 25–28"};

/* ---- Tinta ---- */
S.ink = {type:"menu", crumb:"Tinta", title:"Tinta y cartuchos", intro:"¿Qué quieres hacer?", items:[
  {ic:"🔄", t:"Cambiar un cartucho", to:"ink-replace"},
  {ic:"💡", t:"La luz de la tinta está encendida", to:"lights-ink"},
  {ic:"🛒", t:"Qué cartuchos comprar", to:"g-ink-codes"},
  {ic:"🎨", t:"Se acabó un color y quiero seguir imprimiendo", to:"g-ink-temp"}
]};
S["ink-replace"] = {type:"menu", crumb:"Cambiar un cartucho", title:"Cambiar un cartucho", intro:"¿Cómo está ahora la luz de la tinta (la gota)?", items:[
  {ic:"⚪", t:"Apagada", sub:"Cambio un cartucho antes de que se acabe", to:"g-replace-off"},
  {ic:"🟠", t:"Fija", sub:"Un cartucho está agotado", to:"g-replace-on"},
  {ic:"✨", t:"Parpadea", sub:"Un cartucho se está acabando", to:"g-replace-on"}
]};

var CART_COMMON = [
  {t:"Si vas a cambiar el cartucho **negro**, agita el nuevo suavemente 4 o 5 veces y luego sácalo de su envoltorio. Los cartuchos de **color no se agitan**.", n:"Una vez abierto el envoltorio, no agites ningún cartucho: podría gotear."},
  {t:"Quita **solo la cinta amarilla** del cartucho nuevo.", n:"No toques la zona del chip verde ni las partes de abajo, ni quites la etiqueta o el precinto transparente."},
  "Aprieta la lengüeta del cartucho viejo y tira de él **hacia arriba, recto**. Si cuesta, tira con firmeza.",
  "Pon el cartucho nuevo y **presiónalo hacia abajo con firmeza** hasta que encaje.",
  "Cierra el escáner: levántalo un poco, pliega la varilla de apoyo y bájalo con cuidado."
];
var CART_END = [
  {t:"Pulsa el **botón de parar** (círculo con un triángulo hacia abajo). Empieza la carga de tinta.", n:"Tarda unos 2 minutos. Las luces de encendido y de tinta parpadean: **no apagues la impresora** hasta que acabe."}
];
var CART_WARN = {k:"warn", h:"Importante", t:"Nunca cambies cartuchos con la impresora apagada y no muevas el carro con la mano. Tienen que estar puestos los cuatro cartuchos, o no imprimirá. Si la luz de la tinta no se apaga al terminar, saca el cartucho y vuelve a ponerlo."};

S["g-replace-off"] = {type:"guide", title:"Cambiar un cartucho (luz de tinta apagada)",
  blocks:[
    {k:"p", t:"Cuidado con los dedos al abrir y cerrar el escáner. Si estás copiando, pulsa antes el botón de parar para cancelar."},
    {k:"steps", items:[
      "**Levanta la parte de arriba** (el escáner) con la tapa de documentos cerrada. No toques el carro de cartuchos de dentro.",
      {t:"Mantén pulsado el **botón de parar** durante **10 segundos**. El carro de cartuchos se mueve a la posición de cambio.", n:"Para cancelar, deja los cartuchos puestos y apaga la impresora."}
    ].concat(CART_COMMON).concat(CART_END)},
    CART_WARN,
    {k:"btns", items:[{label:"Qué cartuchos comprar", to:"g-ink-codes"}]}
  ], src:"págs. 127–132"};

S["g-replace-on"] = {type:"guide", title:"Cambiar un cartucho (luz de tinta fija o parpadeando)", lamps:{ink:"on"},
  blocks:[
    {k:"p", t:"Cuidado con los dedos al abrir y cerrar el escáner. Si estás copiando, pulsa antes el botón de parar para cancelar."},
    {k:"steps", items:[
      "**Levanta la parte de arriba** (el escáner) con la tapa de documentos cerrada. No toques el carro de cartuchos de dentro.",
      {t:"Mueve el carro de cartuchos:", n:"Si la luz de la tinta está **fija**: pulsa una vez el botón de parar. Si **parpadea**: mantén pulsado el botón de parar 10 segundos. El carro se mueve a un punto marcado con una gota tachada, donde todavía no se pueden cambiar cartuchos."},
      {t:"El cartucho que se ha parado en la **gota tachada** es el que hay que cambiar. Pulsa otra vez el **botón de parar** y el carro irá a la posición de cambio.", n:"Si hay más cartuchos agotados, cada vez que pulses el botón el carro irá al siguiente."}
    ].concat(CART_COMMON).concat(CART_END)},
    CART_WARN,
    {k:"btns", items:[{label:"Qué cartuchos comprar", to:"g-ink-codes"}]}
  ], src:"págs. 127–128 y 132–136"};

S["g-ink-on"] = {type:"guide", title:"La luz de la tinta está fija", lamps:{ink:"on"}, fix:false,
  lead:"Puede haber varias causas. Busca la que más se parezca a tu caso.",
  blocks:[
    {k:"cases", items:[
      {q:"Se ha agotado un cartucho (lo más habitual)", a:"Cámbialo por uno nuevo. La impresora pide el cambio aunque quede un poco de reserva, para proteger el cabezal.", to:"g-replace-on", toLabel:"Cómo cambiarlo"},
      {q:"Falta un cartucho", a:"Pon el cartucho que falta."},
      {q:"Has puesto uno y no lo reconoce", a:"Presiona el cartucho hacia abajo con firmeza hasta que encaje."},
      {q:"El cartucho no es compatible", a:"Pon uno que admita esta impresora (mira [[g-ink-codes|qué cartuchos comprar]]). Los cartuchos que venían con la impresora no sirven como repuesto."},
      {q:"No deja hacer la limpieza potente porque queda poca tinta", a:"Pulsa el botón de parar para borrar el aviso. Para poder hacer esa limpieza, cambia antes el cartucho."}
    ]},
    {k:"tip", h:"Más detalles", t:"El ordenador también muestra un mensaje con el motivo exacto."},
    {k:"fixrow"}
  ], src:"págs. 21 y 127–136"};

S["g-ink-low"] = {type:"guide", title:"La tinta se está acabando", lamps:{ink:"blink"}, fix:false,
  lead:"Todavía puedes imprimir hasta que la luz de la tinta se quede fija.",
  blocks:[
    {k:"steps", items:[
      "Prepara un cartucho nuevo. Mira [[g-ink-codes|qué cartuchos comprar]].",
      {t:"Cuando se acabe, cámbialo con la guía de [[g-replace-on|cambiar un cartucho]].", n:"Desde el ordenador puedes ver cuánta tinta queda de cada color en las opciones de impresión (“Niveles de tinta”)."}
    ]}
  ], src:"págs. 21 y 62"};

S["g-ink-codes"] = {type:"guide", title:"Qué cartuchos comprar", fix:false,
  lead:"Para esta impresora en Europa hay dos tamaños:",
  blocks:[
    {k:"list", items:["**604**: tamaño normal.","**604XL**: tamaño grande, dura más."]},
    {k:"p", t:"Necesitas uno por color: negro, cian, magenta y amarillo. En la caja aparece una **piña**."},
    {k:"tip", h:"Importante", t:"Usa cartuchos originales Epson: la impresora ajusta los colores pensando en ellos y con otros puede salir peor la calidad. Los códigos pueden variar según el país: si dudas, enseña en la tienda el modelo “XP-2200”."}
  ], src:"pág. 150"};

S["g-ink-temp"] = {type:"guide", title:"Seguir imprimiendo con un cartucho agotado", fix:false,
  blocks:[
    {k:"p", t:"Si se acaba un **color** pero queda **negro**, puedes imprimir solo con negro durante unos 5 días. Cambia el cartucho en cuanto puedas."},
    {k:"list", h:"Para imprimir solo en negro", items:[
      "Papel normal (o sobre).",
      "Color: escala de grises.",
      "Sin impresión sin márgenes.",
      "En Windows aparece una ventana: elige **Imprimir en negro**."
    ]},
    {k:"p", t:"Si se está acabando el **negro** pero queda color, en Windows aparece una ventana que te deja mezclar colores para hacer negro. Sale un negro algo distinto y la impresión es más lenta."}
  ], src:"págs. 137–140"};

/* ---- Calidad ---- */
S.quality = {type:"menu", crumb:"Sale mal impreso", title:"Sale mal impreso", intro:"¿Qué ves en la hoja?", items:[
  {ic:"🌈", t:"Rayas, colores que faltan u hoja en blanco", to:"g-clean"},
  {ic:"🔍", t:"Texto borroso o líneas verticales torcidas", to:"g-align"},
  {ic:"🖍️", t:"Manchas, sale sucio o pegajoso", to:"g-smears"},
  {ic:"🎨", t:"Colores raros, foto pixelada o al revés", to:"g-colors"},
  {ic:"🔣", t:"Salen letras o símbolos raros", to:"g-garbled"},
  {ic:"✂️", t:"Sale cortado o mal colocado", to:"g-layout"}
]};

S["g-clean"] = {type:"guide", title:"Rayas, colores que faltan u hoja en blanco",
  lead:"Lo más probable es que los inyectores del cabezal estén atascados. Hacemos una prueba y una limpieza.",
  blocks:[
    {k:"steps", items:[
      "Pon papel **A4 normal** en la bandeja.",
      "Apaga la impresora con el **botón de encendido**.",
      {t:"Enciéndela **manteniendo pulsado el botón de parar** y suéltalo cuando la luz de encendido empiece a parpadear. Se imprime un dibujo de líneas de prueba.", n:"Puede tardar un poco en empezar."},
      {t:"Mira el dibujo:", n:"A: todas las líneas salen completas. No hace falta hacer nada más. B: faltan algunos trozos. Mantén pulsado el botón de parar 5 segundos hasta que parpadee la luz de encendido: empieza la limpieza. C: faltan casi todas las líneas. Hay que hacer la “limpieza potente” desde el ordenador."},
      "Cuando la luz de encendido deje de parpadear, imprime el dibujo otra vez. Repite la limpieza y la prueba hasta que salgan todas las líneas."
    ]},
    {k:"warn", h:"Mientras limpia", t:"No abras la tapa delantera, no apagues ni desenchufes la impresora. Limpiar gasta tinta: no lo hagas más veces de las necesarias."},
    {k:"tip", h:"Si después de 3 limpiezas no mejora", t:"Apaga la impresora con el botón y **espera al menos 12 horas sin imprimir**. Después repite la prueba y la limpieza. Si sigue igual, haz la limpieza potente y, si tampoco funciona, contacta con Epson."},
    {k:"acc", items:[{q:"Cómo hacer la limpieza potente", a:["En Windows: abre las opciones de impresión, pestaña **Mantenimiento**, **Limpieza de cabezales** y elige **Power Cleaning**. Sigue las instrucciones de la pantalla.","En Mac: Ajustes del Sistema, Impresoras y escáneres, tu impresora, Opciones y recambios, Utilidad, Abrir utilidad de impresora y luego Limpieza de cabezales, **Power Cleaning**.","Gasta más tinta que la limpieza normal."]}]}
  ], src:"págs. 62–65 y 105–107"};

S["g-align"] = {type:"guide", title:"Texto borroso o líneas verticales torcidas",
  blocks:[
    {k:"steps", items:[
      "Pon papel **A4 normal** en la bandeja.",
      "En el ordenador, abre las opciones de impresión y entra en la pestaña **Mantenimiento**.",
      "Elige **Alineación de cabezales** (Print Head Alignment) y sigue las instrucciones de la pantalla."
    ]},
    {k:"tip", h:"Si sigue igual", t:"Desactiva la impresión bidireccional en la pestaña **Más opciones**. Imprimirá un poco más despacio, pero las líneas saldrán derechas."},
    {k:"btns", items:[{label:"Hacer la prueba y limpieza de inyectores", to:"g-clean"}]}
  ], src:"págs. 66 y 106–107"};

S["g-smears"] = {type:"guide", title:"Manchas, sale sucio o pegajoso",
  blocks:[
    {k:"cases", items:[
      {q:"El papel está mal cargado", a:"Cárgalo en la dirección correcta y pega las guías laterales a los bordes."},
      {q:"El papel está curvado", a:"Ponlo sobre una superficie plana y aplánalo."},
      {q:"Imprimes la segunda cara a mano", a:"Espera a que la tinta de la primera cara esté completamente seca antes de volver a cargar el papel."},
      {q:"Fotos pegajosas", a:"Puede que se imprimiera por la cara equivocada del papel fotográfico. Imprime por la cara imprimible y limpia el recorrido del papel (abajo)."},
      {q:"Las copias salen con manchas", a:"Limpia el cristal del escáner con un paño suave, seco y limpio. Sin alcohol ni disolventes."}
    ]},
    {k:"steps", h:"Limpiar el recorrido del papel", items:[
      "Comprueba que el cristal del escáner y la tapa están limpios.",
      "Pon papel A4 normal.",
      "Haz una copia **sin poner ningún original**.",
      "Repite hasta que el papel salga sin manchas."
    ]},
    {k:"warn", h:"Cuidado", t:"No uses pañuelos de papel dentro de la impresora: dejan pelusa que puede atascar el cabezal. Si las manchas no se quitan, avisa a quien te ayude con la impresora."}
  ], src:"págs. 66–68 y 108–109"};

S["g-colors"] = {type:"guide", title:"Colores raros, foto pixelada o al revés",
  blocks:[
    {k:"cases", items:[
      {q:"Los colores salen raros", a:"Puede que los inyectores estén atascados. Haz la prueba y la limpieza.", to:"g-clean", toLabel:"Prueba y limpieza"},
      {q:"No se parece a lo que veo en pantalla", a:"Es normal que no sean idénticos: la pantalla y la impresora forman los colores de manera distinta. Evita ver la imagen con luz directa del sol o con reflejos."},
      {q:"La foto sale en cuadraditos (pixelada)", a:"La imagen tiene poca resolución. Las imágenes de internet suelen verse bien en pantalla pero imprimen peor. Usa una imagen de más calidad."},
      {q:"La imagen sale al revés, como en un espejo", a:"En las opciones de impresión, pestaña **Más opciones**, desmarca **Imagen en espejo** (Mirror Image)."}
    ]}
  ], src:"págs. 109–110 y 113"};

S["g-garbled"] = {type:"guide", title:"Salen letras o símbolos raros",
  blocks:[
    {k:"steps", items:[
      "Si usas cable USB, comprueba que está bien conectado a la impresora y al ordenador.",
      "Cancela los trabajos de impresión pendientes.",
      "Comprueba que el nombre de la impresora que aparece arriba en la ventana de impresión es el de esta impresora (XP-2200)."
    ]},
    {k:"tip", h:"Para que no vuelva a pasar", t:"No pongas el ordenador en suspensión ni en hibernación mientras imprime: al volver a encenderlo pueden salir páginas con símbolos raros."}
  ], src:"págs. 112–113"};

S["g-layout"] = {type:"guide", title:"Sale cortado o mal colocado",
  blocks:[
    {k:"cases", items:[
      {q:"Está cortado por los bordes", a:["Si imprimes sin márgenes, la imagen se amplía un poco y se recortan los bordes. Elige una ampliación menor en **Configuración** junto a la casilla Sin márgenes.","Si la imagen y el papel tienen formas distintas, se corta el lado largo."]},
      {q:"No sale bien colocado", a:["Carga el papel en la dirección correcta y pega la guía lateral.","Comprueba que el tamaño de papel elegido es el que has puesto.","Revisa que los márgenes del documento no se salgan de la zona imprimible."]}
    ]}
  ], src:"págs. 110–112"};

/* ---- No imprime / no conecta ---- */
S.noprint = {type:"menu", crumb:"No imprime", title:"No imprime o no conecta", intro:"¿Qué pasa?", items:[
  {ic:"🖨️", t:"Le doy a imprimir y no sale nada", to:"g-noprint"},
  {ic:"📶", t:"No se conecta al Wi-Fi", to:"wifi"},
  {ic:"⏻", t:"No se enciende o no se apaga", to:"g-power"}
]};

S["g-noprint"] = {type:"guide", title:"Le doy a imprimir y no sale nada",
  lead:"Prueba en este orden. Muchas veces se arregla en los primeros pasos.",
  blocks:[
    {k:"steps", items:[
      "Comprueba que la impresora está **encendida** y el cable de corriente bien enchufado.",
      "Mira si hay **luces encendidas o parpadeando**. Si es así, mira [[lights|qué significan]].",
      "Comprueba que no hay **papel atascado** dentro.",
      {t:"Mira si hay un trabajo anterior atascado en la cola. En Windows: opciones de impresión, pestaña **Mantenimiento**, **Cola de impresión** y en el menú Impresora elige **Cancelar todos los documentos**.", n:"En esa misma ventana, si la impresora figura “sin conexión” o “en pausa”, quita esa opción desde el menú Impresora. En Mac, si aparece en pausa, pulsa Reanudar."},
      {t:"Comprueba que esta impresora es la **predeterminada**.", n:"En Windows: Panel de control, Ver dispositivos e impresoras, clic derecho sobre la impresora y Establecer como predeterminada. Si ves copias como “EPSON XP-2200 Series (copia 1)”, quítalas."},
      "Si la conectas por **cable USB**, prueba a conectarla directamente al ordenador, sin alargadores, o cambia el puerto o el cable.",
      "Si la usas por **Wi-Fi**, mira la guía de [[wifi|conexión Wi-Fi]]."
    ]},
    {k:"tip", h:"Prueba rápida", t:"Pon papel y pulsa el botón **i** de la impresora. Si imprime un informe, la impresora funciona bien y el problema está en la conexión o en el ordenador."}
  ], src:"págs. 96–100"};

S.wifi = {type:"menu", crumb:"Wi-Fi", title:"Conexión Wi-Fi", intro:"¿Qué ocurre?", items:[
  {ic:"🔁", t:"Primeros pasos", sub:"Arreglan la mayoría de los casos", to:"g-wifi-basic"},
  {ic:"🧾", t:"He imprimido el informe y sale un código “E-…”", to:"g-wifi-codes"},
  {ic:"🔎", t:"Está conectada pero el ordenador no la ve", to:"g-wifi-samenet"},
  {ic:"🛠️", t:"Cambié de router o de contraseña", to:"g-wifi-reconfig"}
]};

S["g-wifi-error"] = {type:"guide", title:"Error de conexión Wi-Fi", lamps:{wifi:"blink",direct:"blink"},
  blocks:[
    {k:"steps", items:[
      "Pulsa el botón **Wi-Fi** de la impresora para borrar el error y vuelve a intentarlo.",
      "Si el error vuelve, sigue los [[g-wifi-basic|primeros pasos para la conexión]]."
    ]}
  ], src:"pág. 20"};

S["g-wifi-basic"] = {type:"guide", title:"Primeros pasos con el Wi-Fi",
  blocks:[
    {k:"steps", items:[
      "Pulsa el botón **Wi-Fi** de la impresora para borrar el error.",
      {t:"Apaga el router, el ordenador (o el móvil) y la impresora. Espera unos **10 segundos**.", n:"Enciéndelos por este orden: primero el router, luego el ordenador o el móvil y por último la impresora."},
      "Acerca la impresora y el ordenador al router, sin obstáculos en medio.",
      {t:"Pon papel en la impresora y pulsa el botón **i**. Imprime un **informe de conexión** con un código si hay un error.", n:"Si aparece un código “E-…”, búscalo en [[g-wifi-codes|la lista de códigos]]."},
      "Comprueba que el ordenador y la impresora están conectados a **la misma red Wi-Fi** (mismo nombre)."
    ]}
  ], src:"págs. 80–86 y 100–103"};

S["g-wifi-codes"] = {type:"guide", title:"Códigos del informe de conexión", fix:true,
  lead:"En el informe impreso aparece un código. Pulsa el tuyo para ver la solución.",
  blocks:[
    {k:"acc", items:[
      {q:"E-1 · La Wi-Fi está desactivada", a:["Comprueba que el router está encendido.","Si quieres usar Wi-Fi, hay que [[g-wifi-reconfig|volver a configurarla]], porque está desactivada."]},
      {q:"E-2, E-3 o E-7 · No encuentra la red", a:["Comprueba que el router está encendido. Apágalo 10 segundos y vuelve a encenderlo.","Acerca la impresora al router, sin obstáculos.","Si escribiste el nombre de la red a mano, revisa que es correcto (aparece en el informe).","Si el router tiene varias redes, elige la que se muestra.","El nombre de la red debe llevar solo letras, números y símbolos normales, sin tildes ni eñes.","Ten a mano el nombre y la contraseña del Wi-Fi: suelen estar en una etiqueta del router.","Si usas el botón WPS, comprueba que tu router lo admite."]},
      {q:"E-5 · Seguridad no admitida", a:["El router debe usar un tipo de seguridad admitido: WEP, WPA, WPA2 o WPA3. Lo habitual es WPA2.","Si no lo es, cámbialo en el router y luego [[g-wifi-reconfig|configura de nuevo la impresora]]."]},
      {q:"E-6 · El router no deja conectar", a:["Comprueba que el filtro de direcciones MAC del router está desactivado. Si está activado, añade la dirección MAC de la impresora (aparece en el informe).","Comprueba que el router admite tantos dispositivos como los que quieres conectar."]},
      {q:"E-8 · No obtiene dirección de red", a:["Activa DHCP en el router.","Si la dirección de la impresora se puso a mano, es posible que sea incorrecta."]},
      {q:"E-9, E-10, E-11, E-12 o E-13 · Problema con las direcciones de la red", a:["Comprueba que los demás aparatos de la red están encendidos y que tienen conexión a internet.","Apaga el router, espera 10 segundos y vuelve a encenderlo.","Vuelve a configurar la impresora con el instalador de la web de Epson (epson.sn, escribe XP-2200 y entra en Configuración).","Estos códigos suelen ser cosa del router: si persisten, pide ayuda a quien te instaló internet o a Sergio."]},
      {q:"Mensaje “El entorno Wi-Fi debe mejorarse”", a:"Acerca la impresora al router, apártalos de obstáculos, apaga el router 10 segundos y enciéndelo."}
    ]}
  ], src:"págs. 80–86"};

S["g-wifi-samenet"] = {type:"guide", title:"Conectada, pero el ordenador no la ve",
  blocks:[
    {k:"cases", items:[
      {q:"No están en la misma red", a:"Algunos routers tienen varias redes, por ejemplo una de 2,4 GHz y otra de 5 GHz. La impresora debe estar en la misma red que el ordenador o el móvil. Mira en el informe de conexión (botón i) a qué red está conectada y conecta el ordenador a esa."},
      {q:"El router bloquea la comunicación entre aparatos", a:"Muchos routers tienen una función de “separador de privacidad” que impide que los aparatos de la misma red se vean. Hay que desactivarla en el router."},
      {q:"La dirección de la impresora empieza por 169.254", a:"Si en el informe la dirección es 169.254.xxx.xxx y la máscara 255.255.0.0, no se asignó bien. Reinicia el router o restablece la red de la impresora."},
      {q:"El ordenador no tiene internet", a:"Prueba a abrir cualquier página web. Si no carga, el problema es del ordenador o del router."}
    ]},
    {k:"btns", items:[{label:"Primeros pasos con el Wi-Fi", to:"g-wifi-basic"}]}
  ], src:"págs. 101–103"};

S["g-wifi-reconfig"] = {type:"guide", title:"Configurar otra vez el Wi-Fi",
  lead:"Sirve si cambiaste de router, de contraseña o la impresora perdió la red. Tienes tres caminos.",
  blocks:[
    {k:"acc", items:[
      {q:"Con el ordenador (el más seguro)", a:["Entra en **epson.sn** desde el navegador, escribe XP-2200, ve a **Configuración** y sigue las instrucciones."]},
      {q:"Con el botón WPS del router", a:[
        "Tu router debe admitir WPS.",
        "Mantén pulsado el botón WPS del router hasta que parpadee su luz de seguridad.",
        "En la impresora, mantén pulsado el botón **Wi-Fi** al menos 5 segundos, hasta que las luces Wi-Fi y Wi-Fi directo parpadeen alternándose.",
        "Cuando se conecte, la luz de Wi-Fi se queda fija.",
        "Si da error, pulsa Wi-Fi para borrarlo, reinicia el router, acércalo y repite."
      ]},
      {q:"Borrar la red de la impresora y empezar de cero", a:[
        "Apaga la impresora. Enciéndela manteniendo pulsado el botón **i**.",
        "Se borra la configuración de red y las luces de red parpadean alternándose.",
        "Después hay que configurar la red otra vez con el ordenador."
      ]}
    ]}
  ], src:"págs. 14, 19, 77–80"};

S["g-power"] = {type:"guide", title:"No se enciende o no se apaga",
  blocks:[
    {k:"cases", items:[
      {q:"No se enciende", a:["Comprueba que el cable de corriente está bien enchufado.","Mantén pulsado el botón de encendido un poco más de tiempo."]},
      {q:"No se apaga", a:["Mantén pulsado el botón de encendido un poco más.","Si sigue encendida, desenchufa el cable. Después vuelve a encenderla y apágala con el botón, para que el cabezal quede tapado y no se seque."]},
      {q:"Se apaga sola", a:"Tiene una función de apagado automático. Se puede cambiar desde el ordenador: opciones de impresión, pestaña **Mantenimiento**, Información de la impresora y opciones, y ahí desactiva los temporizadores de apagado."}
    ]},
    {k:"tip", h:"Costumbre importante", t:"Apaga siempre con el **botón de encendido** y espera a que su luz se apague antes de desenchufar. Si la cortas de golpe (regleta, enchufe o apagón), el cabezal puede secarse."}
  ], src:"págs. 12 y 140–141"};

/* ---- Estados de luces informativos ---- */
S["g-ok"] = {type:"guide", title:"Todo está bien", lamps:{wifi:"on"}, fix:false,
  blocks:[
    {k:"p", t:"Una luz de Wi-Fi fija significa que la impresora está conectada a tu red inalámbrica."},
    {k:"p", t:"Si se enciende la segunda (Wi-Fi directo), está conectada en ese modo, directamente con un móvil o una tableta."}
  ], src:"pág. 20"};

S["g-working"] = {type:"guide", title:"La impresora está trabajando", lamps:{power:"blink"}, fix:false,
  blocks:[
    {k:"p", t:"Si solo parpadea la luz de encendido, la impresora está imprimiendo, limpiando el cabezal o cargando tinta."},
    {k:"p", t:"Si acabas de cambiar un cartucho, parpadean la de encendido y la de tinta mientras se carga la tinta. Tarda unos **2 minutos**."},
    {k:"warn", h:"Espera", t:"No la apagues ni la desenchufes mientras parpadea. Si se interrumpe la carga de tinta, puede que no imprima."}
  ], src:"págs. 12, 63 y 132"};

S["g-bad-off"] = {type:"guide", title:"La impresora se apagó de forma incorrecta", lamps:{ink:"on",paper:"on"},
  lead:"Esto pasa si se corta la corriente (regleta, enchufe, apagón) o se apaga mientras trabaja. Los inyectores pueden haberse secado.",
  blocks:[
    {k:"steps", items:[
      "Cancela los trabajos de impresión pendientes en el ordenador.",
      "Pulsa el **botón de copia** (cualquiera de los dos) para borrar el error.",
      "Haz la [[g-clean|prueba de inyectores]] para ver si hay que limpiar el cabezal."
    ]},
    {k:"tip", h:"Para la próxima vez", t:"Apaga siempre con el botón de encendido."}
  ], src:"pág. 21"};

var PAD_COMMON = [
  "Si aparece un mensaje en el ordenador diciendo que puedes seguir imprimiendo, pulsa el **botón de copia** para continuar. Las luces dejan de parpadear un tiempo, pero volverán a avisar hasta que se sustituya la pieza."
];
S["g-pad"] = {type:"guide", title:"Pieza interior de tinta casi llena", lamps:{ink:"blink",paper:"blink"},
  lead:"La impresora tiene una pieza que recoge la tinta sobrante y está llegando al final de su vida útil. Eso no significa que la impresora deje de cumplir sus especificaciones.",
  blocks:[
    {k:"steps", items:PAD_COMMON.concat([
      "Contacta con Epson o con un servicio técnico autorizado para cambiarla. No es una pieza que pueda cambiar el usuario."
    ])},
    {k:"warn", h:"Ten en cuenta", t:"Según el manual, la garantía de Epson no cubre el coste de este cambio. Si la limpieza potente no se puede hacer por este motivo, pulsa el botón de copia para borrar el aviso."},
    {k:"btns", items:[{label:"Contactar con soporte", to:"help"}]}
  ], src:"págs. 22–23"};
S["g-pad-borderless"] = {type:"guide", title:"Pieza de impresión sin márgenes casi llena", lamps:{ink:"blink",paper:"alt"},
  lead:"Es la pieza que recoge la tinta sobrante al imprimir sin márgenes.",
  blocks:[
    {k:"steps", items:PAD_COMMON.concat([
      "Contacta con Epson o con un servicio técnico autorizado para cambiarla."
    ])},
    {k:"tip", h:"Mientras tanto", t:"No podrás imprimir sin márgenes, pero sí con márgenes."},
    {k:"btns", items:[{label:"Contactar con soporte", to:"help"}]}
  ], src:"págs. 22–23"};

S["g-recovery"] = {type:"guide", title:"Modo de recuperación", lamps:{wifi:"on",direct:"on",ink:"on",paper:"on"},
  lead:"La impresora arrancó en modo de recuperación porque falló una actualización de su software interno.",
  blocks:[
    {k:"steps", items:[
      "Conecta la impresora al ordenador con un **cable USB**. En este modo no se puede actualizar por Wi-Fi.",
      "Entra en la web de Epson de tu país para ver las instrucciones de actualización."
    ]},
    {k:"tip", h:"Es un caso poco habitual", t:"Pide ayuda a quien te apoya con el ordenador antes de seguir."},
    {k:"btns", items:[{label:"Contactar con soporte", to:"help"}]}
  ], src:"pág. 22"};

S["g-error"] = {type:"guide", title:"Error interno de la impresora", lamps:{power:"blink",wifi:"blink",direct:"blink",ink:"blink",paper:"blink"},
  blocks:[
    {k:"warn", h:"Cuidado", t:"No toques el cable plano blanco ni la lámina transparente de dentro."},
    {k:"steps", items:[
      "**Levanta el escáner** y saca cualquier papel o material de protección que haya dentro de la impresora.",
      "Apaga la impresora y vuelve a encenderla."
    ]},
    {k:"tip", h:"Si el error sigue", t:"Contacta con soporte de Epson."}
  ], src:"pág. 22"};

/* ---- Cómo hago ---- */
S.howto = {type:"menu", crumb:"Cómo hago…", title:"Cómo hago…", intro:"Elige lo que quieres hacer.", items:[
  {ic:"📑", t:"Hacer una fotocopia", to:"h-copy"},
  {ic:"🖥️", t:"Escanear al ordenador", to:"h-scan"},
  {ic:"📥", t:"Cargar papel", to:"g-load"},
  {ic:"📱", t:"Imprimir desde el móvil", to:"h-phone"},
  {ic:"⏻", t:"Apagarla bien", to:"h-off"}
]};

S["h-copy"] = {type:"guide", title:"Hacer una fotocopia", fix:false,
  blocks:[
    {k:"steps", items:[
      "Pon papel **A4 normal** en la bandeja de atrás (tantas hojas como copias).",
      {t:"Levanta la tapa y coloca el original **boca abajo** en la esquina marcada. Cierra con suavidad.", n:"No presiones fuerte el cristal. Si el cristal tiene polvo, límpialo antes con un paño suave y seco."},
      {t:"Pulsa el **botón de copia en blanco y negro** (el de la izquierda) o el **de color** (el de la derecha).", n:"Para hacer varias copias (hasta 20), pulsa el botón varias veces seguidas, con menos de 1 segundo entre pulsaciones."},
      "Retira el original al terminar: si se queda mucho tiempo sobre el cristal puede pegarse."
    ]},
    {k:"tip", h:"Las copias salen siempre en A4", t:"Dejan un margen de 3 mm alrededor y pueden variar un poco en color y tamaño."}
  ], src:"págs. 31–32 y 53"};

S["h-scan"] = {type:"guide", title:"Escanear al ordenador", fix:false,
  blocks:[
    {k:"steps", items:[
      "Coloca el original boca abajo en la esquina marcada del cristal.",
      {t:"Con la impresora **conectada por USB** al ordenador, pulsa **a la vez** los dos botones de copia. Se abre el programa **Epson ScanSmart** y escanea.", n:"Si no tienes ese programa instalado, instálalo desde la web de Epson (epson.sn)."},
      "Para otra manera: abre **Epson ScanSmart** en el ordenador y sigue las instrucciones de la pantalla."
    ]},
    {k:"tip", h:"Escanear con el móvil", t:"La aplicación **Epson Smart Panel** permite escanear directamente al móvil o a la tableta."}
  ], src:"págs. 55–59"};

S["h-phone"] = {type:"guide", title:"Imprimir desde el móvil", fix:false,
  blocks:[
    {k:"steps", items:[
      "Instala la aplicación **Epson Smart Panel** en el móvil o la tableta (desde support.epson.net/smpdl o buscándola en la tienda de aplicaciones).",
      "Abre la aplicación y sigue los pasos para conectar el móvil con la impresora. Deben estar en la misma Wi-Fi.",
      "Elige **Imprimir** en la pantalla de inicio y selecciona lo que quieres imprimir."
    ]},
    {k:"tip", h:"Con un Android", t:"También puedes usar **Epson Print Enabler**, que se activa en Ajustes, Impresión."}
  ], src:"págs. 48–50 y 78"};

S["h-off"] = {type:"guide", title:"Apagar bien la impresora", fix:false,
  blocks:[
    {k:"steps", items:[
      "Pulsa el **botón de encendido**.",
      "Espera a que **la luz de encendido se apague del todo**.",
      "Después, si quieres, desenchúfala."
    ]},
    {k:"warn", h:"Evita", t:"Apagarla cortando la corriente (regleta, enchufe) mientras la luz sigue encendida o parpadeando. El cabezal puede quedar sin tapar y secarse, y entonces la impresión sale con rayas."},
    {k:"p", t:"Si no vas a usarla durante mucho tiempo, desenchúfala de la corriente después de apagarla con el botón."}
  ], src:"págs. 12 y 65"};

/* ---- Ayuda final ---- */
S.panel = {type:"panel", crumb:"El panel", title:"Conoce el panel de la impresora"};

S.ok = {type:"done", title:"Me alegro de que ya funcione"};
S.help = {type:"help", title:"Si sigue sin funcionar"};

