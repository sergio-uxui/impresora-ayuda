/* ===================================================================
   Contenido de la ayuda. Aquí se editan los textos.
   Cada pantalla es una entrada de S.
   - Impresora Epson XP-2200: pantallas "printer", "lights", "g-…", "h-…", etc.
     Fuente: Guía del usuario Epson XP-2200 (NPD6908-02).
   - Videollamadas con Teams: pantallas con prefijo "t-" y la entrada "teams".
     Fuentes: Microsoft Soporte y guías de universidades (ver "src").
   =================================================================== */

/* ========= AJUSTES ========= */
// Pon aquí el teléfono de quien ayuda (por ejemplo "+34 600 000 000"). Si se deja vacío, solo se muestra el nombre.
var CONTACT = { nombre: "Sergio", telefono: "" };

/* Secciones: cómo se muestra cada guía */
var SITE = {title:"Step by step"};
var SECTIONS = {
  hub:     {home:"home", ok:"t-ok", help:"t-help", srcPrefix:"",
            foot:"Guías no oficiales, hechas con cariño. Las ilustraciones son propias; lo que ves en tu pantalla o en tu impresora puede ser algo distinto."},
  printer: {label:"Impresora", home:"printer", ok:"ok", help:"help", srcPrefix:"Guía del usuario Epson XP-2200, ",
            foot:"Guía no oficial basada en la Guía del usuario de la Epson XP-2200 (NPD6908-02). Las ilustraciones son propias; el panel real puede verse algo distinto."},
  teams:   {label:"Videollamadas", home:"teams", ok:"t-ok", help:"t-help", srcPrefix:"",
            foot:"Guía no oficial, basada en las páginas de ayuda de Microsoft y de varias universidades. Teams cambia a menudo: si un botón no está donde se dice, busca su icono."},
  citibox: {label:"Citibox", home:"citibox", ok:"c-ok", help:"c-help", srcPrefix:"",
            foot:"Guía no oficial sobre los buzones inteligentes Citibox. Las ilustraciones son propias; la app y la cerradura pueden verse algo distintas según el modelo."},
  navigo:  {label:"Navigo", home:"navigo", ok:"navigo", help:"navigo", srcPrefix:"",
            foot:"Guía no oficial sobre la tarjeta Navigo en Cartera (Wallet) del iPhone. Los pases y sus condiciones los fija Île-de-France Mobilités y pueden cambiar."}
};

/* ========= DATOS ========= */
var S = {};

/* ---- Inicio general ---- */
S.home = {type:"menu", title:"¿En qué te ayudo?",
  intro:"Elige la guía que necesitas.",
  items:[
    {ic:"🖨️", t:"La impresora", sub:"Epson XP-2200: luces, papel, tinta, Wi-Fi…", to:"printer"},
    {ic:"🎥", t:"Videollamadas con Teams", sub:"Entrar a una clase, compartir pantalla…", to:"teams"},
    {ic:"📦", t:"Paquetes en Citibox", sub:"Recoger un paquete del buzón del portal", to:"citibox"},
    {ic:"🚇", t:"Transporte de París en el iPhone", sub:"La tarjeta Navigo en Cartera (Wallet)", to:"navigo"}
  ]
};

/* ################ IMPRESORA ################ */
/* ---- Inicio ---- */
S.printer = {type:"menu", title:"¿Qué le pasa a la impresora?",
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
var CARDS_HINT = "En el dibujo, las luces apagadas o muy claras no importan. Fíjate solo en las que tienen color y texto debajo.";
S.lights = {type:"cards", title:"¿Qué luz te llama la atención?",
  intro:"Mira los botones de la parte delantera de la impresora. Elige arriba la luz que está encendida o parpadeando.", tabsLabel:"Luz",
  tabs:[
  {id:"ink", ic:"💧", label:"Tinta", intro:CARDS_HINT, cards:[
    {lamps:{ink:"on"}, t:"La luz de la tinta está fija", d:"Un cartucho se ha acabado, falta o no se reconoce.", to:"g-ink-on"},
    {lamps:{ink:"blink"}, t:"La luz de la tinta parpadea", d:"Un cartucho se está acabando. Aún puedes imprimir.", to:"g-ink-low"}
  ]},
  {id:"paper", ic:"📄", label:"Papel", intro:CARDS_HINT, cards:[
    {lamps:{paper:"on"}, t:"La luz del papel está fija", d:"No hay papel o han entrado varias hojas a la vez.", to:"g-nopaper"},
    {lamps:{paper:"slow"}, t:"Parpadea despacio", d:"Hay un atasco de papel.", to:"g-jam"},
    {lamps:{paper:"fast"}, t:"Parpadea rápido", d:"Ha quedado papel dentro de la impresora.", to:"g-paper-inside"}
  ]},
  {id:"both", ic:"💧📄", label:"Tinta y papel", intro:CARDS_HINT, cards:[
    {lamps:{ink:"on",paper:"on"}, t:"Las dos fijas", d:"La impresora se apagó de forma incorrecta.", to:"g-bad-off"},
    {lamps:{ink:"blink",paper:"blink"}, t:"Las dos parpadean a la vez", d:"Una pieza interior que recoge tinta sobrante está casi llena.", to:"g-pad"},
    {lamps:{ink:"blink",paper:"alt"}, t:"Parpadean una y otra, alternando", d:"La pieza que recoge tinta al imprimir sin márgenes está casi llena.", to:"g-pad-borderless"}
  ]},
  {id:"wifi", ic:"📶", label:"Wi-Fi", intro:CARDS_HINT, cards:[
    {lamps:{wifi:"blink",direct:"blink"}, t:"Las dos luces de Wi-Fi parpadean", d:"Hay un error de conexión Wi-Fi.", to:"g-wifi-error"},
    {lamps:{wifi:"on"}, t:"Una luz de Wi-Fi fija, sin parpadeos", d:"Todo bien: la impresora está conectada.", to:"g-ok"}
  ]},
  {id:"power", ic:"⏻", label:"Encendido", intro:CARDS_HINT, cards:[
    {lamps:{power:"blink"}, t:"La luz de encendido parpadea", d:"La impresora está trabajando. Hay que esperar.", to:"g-working"}
  ]},
  {id:"many", ic:"⚠️", label:"Casi todas", intro:CARDS_HINT, cards:[
    {lamps:{wifi:"on",direct:"on",ink:"on",paper:"on"}, t:"Las dos de Wi-Fi, la gota y la hoja, todas fijas", d:"La impresora arrancó en modo de recuperación.", to:"g-recovery"},
    {lamps:{power:"blink",wifi:"blink",direct:"blink",ink:"blink",paper:"blink"}, t:"Todas parpadean, incluida la de encendido", d:"La impresora tiene un error interno.", to:"g-error"}
  ]}
  ],
  extra:[{label:"Ver dónde está cada luz", to:"panel"}]
};

/* ---- Papel ---- */
S.paper = {type:"menu", title:"Problema con el papel", intro:"¿Qué ocurre?", items:[
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
S.ink = {type:"menu", title:"Tinta y cartuchos", intro:"¿Qué quieres hacer?", items:[
  {ic:"🔄", t:"Cambiar un cartucho", to:"g-replace"},
  {ic:"💡", t:"La luz de la tinta está encendida", to:"lights/ink"},
  {ic:"🛒", t:"Qué cartuchos comprar", to:"g-ink-codes"},
  {ic:"🎨", t:"Se acabó un color y quiero seguir imprimiendo", to:"g-ink-temp"}
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

S["g-replace"] = {type:"guide", title:"Cambiar un cartucho",
  lead:"¿Cómo está ahora la luz de la tinta (la gota)? Elige abajo; los pasos cambian un poco.", tabsLabel:"Luz de la tinta",
  blocks:[
    {k:"p", t:"Cuidado con los dedos al abrir y cerrar el escáner. Si estás copiando, pulsa antes el botón de parar para cancelar."}
  ],
  tabs:[
    {id:"off", ic:"⚪", label:"Apagada", lead:"Cambio un cartucho antes de que se acabe.", blocks:[
      {k:"steps", items:[
        "**Levanta la parte de arriba** (el escáner) con la tapa de documentos cerrada. No toques el carro de cartuchos de dentro.",
        {t:"Mantén pulsado el **botón de parar** durante **10 segundos**. El carro de cartuchos se mueve a la posición de cambio.", n:"Para cancelar, deja los cartuchos puestos y apaga la impresora."}
      ].concat(CART_COMMON).concat(CART_END)}
    ], src:"págs. 127–132"},
    {id:"on", ic:"🟠", label:"Fija o parpadea", lamps:{ink:"on"}, lead:"Un cartucho está agotado o se está acabando.", blocks:[
      {k:"steps", items:[
        "**Levanta la parte de arriba** (el escáner) con la tapa de documentos cerrada. No toques el carro de cartuchos de dentro.",
        {t:"Mueve el carro de cartuchos:", n:"Si la luz de la tinta está **fija**: pulsa una vez el botón de parar. Si **parpadea**: mantén pulsado el botón de parar 10 segundos. El carro se mueve a un punto marcado con una gota tachada, donde todavía no se pueden cambiar cartuchos."},
        {t:"El cartucho que se ha parado en la **gota tachada** es el que hay que cambiar. Pulsa otra vez el **botón de parar** y el carro irá a la posición de cambio.", n:"Si hay más cartuchos agotados, cada vez que pulses el botón el carro irá al siguiente."}
      ].concat(CART_COMMON).concat(CART_END)}
    ], src:"págs. 127–128 y 132–136"}
  ],
  after:[
    CART_WARN,
    {k:"btns", items:[{label:"Qué cartuchos comprar", to:"g-ink-codes"}]}
  ]};

S["g-ink-on"] = {type:"guide", title:"La luz de la tinta está fija", lamps:{ink:"on"}, fix:false,
  lead:"Puede haber varias causas. Busca la que más se parezca a tu caso.",
  blocks:[
    {k:"cases", items:[
      {q:"Se ha agotado un cartucho (lo más habitual)", a:"Cámbialo por uno nuevo. La impresora pide el cambio aunque quede un poco de reserva, para proteger el cabezal.", to:"g-replace/on", toLabel:"Cómo cambiarlo"},
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
      {t:"Cuando se acabe, cámbialo con la guía de [[g-replace/on|cambiar un cartucho]].", n:"Desde el ordenador puedes ver cuánta tinta queda de cada color en las opciones de impresión (“Niveles de tinta”)."}
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
S.quality = {type:"menu", title:"Sale mal impreso", intro:"¿Qué ves en la hoja?", items:[
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
S.noprint = {type:"menu", title:"No imprime o no conecta", intro:"¿Qué pasa?", items:[
  {ic:"🖨️", t:"Le doy a imprimir y no sale nada", to:"g-noprint"},
  {ic:"📶", t:"No se conecta al Wi-Fi", to:"g-wifi"},
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
      "Si la usas por **Wi-Fi**, mira la guía de [[g-wifi|conexión Wi-Fi]]."
    ]},
    {k:"tip", h:"Prueba rápida", t:"Pon papel y pulsa el botón **i** de la impresora. Si imprime un informe, la impresora funciona bien y el problema está en la conexión o en el ordenador."}
  ], src:"págs. 96–100"};

S["g-wifi"] = {type:"guide", title:"La impresora no se conecta al Wi-Fi", fix:true,
  lead:"Empieza por los primeros pasos: arreglan la mayoría de los casos. Si no, elige la pestaña que se parezca a lo que te pasa.", tabsLabel:"Qué ocurre",
  tabs:[
    {id:"basic", ic:"🔁", label:"Primeros pasos", blocks:[
      {k:"steps", items:[
        "Pulsa el botón **Wi-Fi** de la impresora para borrar el error.",
        {t:"Apaga el router, el ordenador (o el móvil) y la impresora. Espera unos **10 segundos**.", n:"Enciéndelos por este orden: primero el router, luego el ordenador o el móvil y por último la impresora."},
        "Acerca la impresora y el ordenador al router, sin obstáculos en medio.",
        {t:"Pon papel en la impresora y pulsa el botón **i**. Imprime un **informe de conexión** con un código si hay un error.", n:"Si aparece un código “E-…”, búscalo en [[g-wifi/codes|la lista de códigos]]."},
        "Comprueba que el ordenador y la impresora están conectados a **la misma red Wi-Fi** (mismo nombre)."
      ]}
    ], src:"págs. 80–86 y 100–103"},
    {id:"codes", ic:"🧾", label:"Código “E-…”", lead:"En el informe impreso aparece un código. Pulsa el tuyo para ver la solución.", blocks:[
      {k:"acc", items:[
        {q:"E-1 · La Wi-Fi está desactivada", a:["Comprueba que el router está encendido.","Si quieres usar Wi-Fi, hay que [[g-wifi/reconfig|volver a configurarla]], porque está desactivada."]},
        {q:"E-2, E-3 o E-7 · No encuentra la red", a:["Comprueba que el router está encendido. Apágalo 10 segundos y vuelve a encenderlo.","Acerca la impresora al router, sin obstáculos.","Si escribiste el nombre de la red a mano, revisa que es correcto (aparece en el informe).","Si el router tiene varias redes, elige la que se muestra.","El nombre de la red debe llevar solo letras, números y símbolos normales, sin tildes ni eñes.","Ten a mano el nombre y la contraseña del Wi-Fi: suelen estar en una etiqueta del router.","Si usas el botón WPS, comprueba que tu router lo admite."]},
        {q:"E-5 · Seguridad no admitida", a:["El router debe usar un tipo de seguridad admitido: WEP, WPA, WPA2 o WPA3. Lo habitual es WPA2.","Si no lo es, cámbialo en el router y luego [[g-wifi/reconfig|configura de nuevo la impresora]]."]},
        {q:"E-6 · El router no deja conectar", a:["Comprueba que el filtro de direcciones MAC del router está desactivado. Si está activado, añade la dirección MAC de la impresora (aparece en el informe).","Comprueba que el router admite tantos dispositivos como los que quieres conectar."]},
        {q:"E-8 · No obtiene dirección de red", a:["Activa DHCP en el router.","Si la dirección de la impresora se puso a mano, es posible que sea incorrecta."]},
        {q:"E-9, E-10, E-11, E-12 o E-13 · Problema con las direcciones de la red", a:["Comprueba que los demás aparatos de la red están encendidos y que tienen conexión a internet.","Apaga el router, espera 10 segundos y vuelve a encenderlo.","Vuelve a configurar la impresora con el instalador de la web de Epson (epson.sn, escribe XP-2200 y entra en Configuración).","Estos códigos suelen ser cosa del router: si persisten, pide ayuda a quien te instaló internet o a Sergio."]},
        {q:"Mensaje “El entorno Wi-Fi debe mejorarse”", a:"Acerca la impresora al router, apártalos de obstáculos, apaga el router 10 segundos y enciéndelo."}
      ]}
    ], src:"págs. 80–86"},
    {id:"samenet", ic:"🔎", label:"El ordenador no la ve", blocks:[
      {k:"cases", items:[
        {q:"No están en la misma red", a:"Algunos routers tienen varias redes, por ejemplo una de 2,4 GHz y otra de 5 GHz. La impresora debe estar en la misma red que el ordenador o el móvil. Mira en el informe de conexión (botón i) a qué red está conectada y conecta el ordenador a esa."},
        {q:"El router bloquea la comunicación entre aparatos", a:"Muchos routers tienen una función de “separador de privacidad” que impide que los aparatos de la misma red se vean. Hay que desactivarla en el router."},
        {q:"La dirección de la impresora empieza por 169.254", a:"Si en el informe la dirección es 169.254.xxx.xxx y la máscara 255.255.0.0, no se asignó bien. Reinicia el router o restablece la red de la impresora."},
        {q:"El ordenador no tiene internet", a:"Prueba a abrir cualquier página web. Si no carga, el problema es del ordenador o del router."}
      ]},
      {k:"btns", items:[{label:"Volver a los primeros pasos", to:"g-wifi/basic"}]}
    ], src:"págs. 101–103"},
    {id:"reconfig", ic:"🛠️", label:"Cambié de router", lead:"Sirve si cambiaste de router, de contraseña o la impresora perdió la red. Tienes tres caminos.", blocks:[
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
    ], src:"págs. 14, 19, 77–80"}
  ]};

S["g-wifi-error"] = {type:"guide", title:"Error de conexión Wi-Fi", lamps:{wifi:"blink",direct:"blink"},
  blocks:[
    {k:"steps", items:[
      "Pulsa el botón **Wi-Fi** de la impresora para borrar el error y vuelve a intentarlo.",
      "Si el error vuelve, sigue los [[g-wifi/basic|primeros pasos para la conexión]]."
    ]}
  ], src:"pág. 20"};

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
S.howto = {type:"menu", title:"Cómo hago…", intro:"Elige lo que quieres hacer.", items:[
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
S.panel = {type:"panel", title:"Conoce el panel de la impresora"};

S.ok = {type:"done", title:"Me alegro de que ya funcione"};
S.help = {type:"help", title:"Si sigue sin funcionar"};



/* ################ VIDEOLLAMADAS (TEAMS) ################ */
/* ---- Inicio ---- */
S["teams"] = {type:"menu", title:"¿Qué quieres hacer?", logo:"i-teams", tabsLabel:"Momento de la llamada",
  intro:"Elige si todavía no has entrado o si ya estás en la llamada. Te voy guiando paso a paso.",
  tabs:[
    {id:"antes", label:"Antes de entrar", intro:"Para prepararte y entrar en la llamada.", items:[
      {ic:"🔗", t:"Entrar a una clase o charla", sub:"Con el enlace que me han enviado", to:"t-join"},
      {ic:"🎬", t:"Probar cámara y sonido", sub:"En la pantalla previa, antes de unirte", to:"t-prejoin"},
      {ic:"⏱️", t:"Lista rápida antes de la clase", to:"t-checklist"},
      {ic:"🛠️", t:"Algo no funciona", sub:"No me ven, no me oyen, no puedo entrar…", to:"t-problems"}
    ]},
    {id:"dentro", label:"Ya estoy dentro", intro:"Para cuando ya estás en la llamada.", items:[
      {ic:"🎛️", t:"¿Qué hace cada botón?", to:"t-controls"},
      {ic:"🖥️", t:"Compartir pantalla", to:"t-share"},
      {ic:"🛠️", t:"Algo no funciona", sub:"No me ven, no me oyen, no puedo compartir…", to:"t-problems"}
    ]}
  ]
};

/* ---- Entrar ---- */
S["t-join"] = {type:"guide", title:"Entrar con el enlace",
  lead:"Alguien te ha enviado un enlace de la clase, la charla o la llamada.",
  blocks:[
    {k:"steps", items:[
      {t:"Abre el mensaje o el correo y pulsa el **enlace de la reunión**.", demo:"join-link"},
      {t:"El navegador puede preguntar si quieres abrir **Microsoft Teams**. Di que sí.", n:"Si no se abre, busca la opción **Abrir Teams en el navegador**: funciona sin instalar nada.", demo:"join-open"},
      {t:"Si te pide entrar, pulsa **Iniciar sesión** y usa **la cuenta de la universidad**.", n:"Si sale otra cuenta, pulsa **Cambiar** junto a ella y elige la correcta.", demo:"join-login"},
      {t:"Verás la **pantalla previa** (tu imagen y los botones de cámara y micrófono). Mira [[t-prejoin|Antes de entrar]] y pulsa **Unirse** (o **Unirse ahora**).", demo:"join-prejoin"},
      {t:"Puede que aparezca una **sala de espera**. No cierres nada: espera a que el organizador te deje pasar.", n:"Es normal. Le llega un aviso y te admite.", demo:"join-wait"}
    ]},
    {k:"acc", items:[
      {q:"Otra forma: desde el calendario de Teams", a:["Abre Teams y pulsa el icono **Calendario**.","Pulsa la reunión y luego **Unirse**."]},
      {q:"Otra forma: con el número de reunión", a:["En el calendario, pulsa la flecha junto a **Reunirse ahora** y elige **Unirse con un id. #**.","Escribe el **identificador** y el **código de acceso** (vienen en la invitación).","Si no te funciona, usa mejor el enlace."]}
    ]},
    {k:"btns", items:[{label:"No puedo entrar", to:"t-p-enter"}]}
  ], src:"Microsoft Soporte, “Unirse a una reunión en Microsoft Teams”; UNED, guía para estudiantes"};

S["t-prejoin"] = {type:"guide", title:"Antes de entrar: cámara y sonido",
  lead:"Esta pantalla aparece justo antes de entrar. Es el mejor momento para comprobar que todo funciona.",
  blocks:[
    {k:"steps", items:[
      {t:"**Mírate.** Si ves tu imagen, la cámara funciona. Si no, usa el interruptor de la cámara para encenderla.", n:"Puedes entrar con la cámara apagada si lo prefieres."},
      {t:"**Habla un poco** y mira si se mueve la barrita del micrófono. Si se mueve, te oyen.", n:"Dependiendo de tu pantalla, puede ser una barra o un indicador que sube y baja."},
      "Comprueba que el sonido está en **Audio del equipo** (el del propio ordenador).",
      {t:"Si usas **auriculares** o una **cámara externa**, abre los ajustes de dispositivos y elígelos en los desplegables.", n:"Con auriculares se oye mejor y se evitan ecos."},
      "Cuando todo esté bien, pulsa **Unirse ahora**."
    ]},
    {k:"tip", h:"Si el navegador pregunta", t:"Si entras desde el navegador, puede pedir permiso para usar la cámara y el micrófono. Pulsa **Permitir**."},
    {k:"btns", items:[{label:"No me ven o no me oyen", to:"t-problems"}]}
  ], src:"UNED, “Conectarse a una tutoría (estudiantes)”; Microsoft Soporte"};

/* ---- Dentro de la reunión ---- */
S["t-controls"] = {type:"guide", title:"¿Qué hace cada botón?",
  lead:"Cuando mueves el ratón aparece la barra con los botones. Cada número del dibujo se explica abajo.",
  blocks:[
    {k:"toolbar"},
    {k:"steps", items:[
      "**Cámara.** Enciende o apaga tu imagen. Si el icono está tachado, te ven desactivada.",
      "**Micrófono.** Si está tachado, nadie te oye. Pulsa para activarlo cuando vayas a hablar.",
      {t:"**Compartir (pantalla).** Para enseñar tu pantalla. Mira [[t-share|Compartir pantalla]].", n:"Algunas versiones lo llaman **Compartir pantalla**."},
      "**Chat.** Para escribir mensajes que ven todos. Muy útil si el micrófono no funciona.",
      "**Personas.** Muestra quién está en la reunión.",
      "**Levantar la mano.** Para pedir la palabra sin interrumpir.",
      "**Más** (tres puntos). Aquí están los ajustes de cámara, micrófono y altavoz, y otras opciones.",
      {t:"**Salir** (botón rojo). Sale de la reunión.", n:"Según la versión se llama **Salir**, **Dejar** o **Colgar**. Si te equivocas, vuelve a entrar con el mismo enlace."}
    ]},
    {k:"tip", h:"Un buen hábito", t:"Mantén el micrófono silenciado mientras habla otra persona. Actívalo solo cuando te toque."},
    {k:"p", t:"Microsoft ha cambiado hace poco el diseño de los controles de las reuniones y ha movido de sitio algunos botones, como **Levantar la mano** y **Salir**. Por eso conviene fijarse en el icono y no en la posición."}
  ], src:"Microsoft Adoption, “Pruebe la reunión rediseñada”; UPM, “Videoconferencias con Teams – Guía de manejo”"};

S["t-share"] = {type:"guide", title:"Compartir pantalla",
  lead:"Así la otra persona ve lo mismo que tú: un ejercicio, un documento, una web.",
  blocks:[
    {k:"steps", items:[
      {t:"Con la reunión abierta, pulsa **Compartir pantalla** en la barra de botones.", demo:"share-btn"},
      {t:"Elige **qué enseñar**: la pantalla entera o solo una ventana.", n:"Para un ejercicio, elige **la ventana** del ejercicio: solo se ve eso.", demo:"share-pick"},
      {t:"Si el ejercicio tiene **música o audio**, activa **Incluir sonido** antes de compartir.", n:"Con esta opción, todo el sonido del ordenador se oye en la reunión, incluidos los avisos.", demo:"share-sound"},
      {t:"Cuando empieza, verás un **borde alrededor** de lo que estás enseñando. Ahora te ven.", demo:"share-border"},
      {t:"Para **parar**, mueve el ratón a la parte de arriba de la pantalla y pulsa **Dejar de compartir**.", demo:"share-stop"}
    ]},
    {k:"warn", h:"Antes de compartir", t:"Si compartes la pantalla entera, la otra persona ve todo lo que tengas abierto, incluidos correos y mensajes que lleguen. Cierra lo que no quieras enseñar, o comparte solo una ventana."},
    {k:"tip", h:"Si Sergio necesita mover el ratón por ti", t:"En la barra de arriba pulsa **Ceder el control** y elige a Sergio. Para recuperarlo, pulsa **Retirar**. Hazlo solo con personas de confianza."},
    {k:"btns", items:[{label:"No puedo compartir la pantalla", to:"t-p-share"}]}
  ], src:"Microsoft Soporte, “Presentar contenido en reuniones de Microsoft Teams”; UPM, guía de manejo"};

/* ---- Problemas ---- */
S["t-problems"] = {type:"menu", title:"¿Qué ocurre?", intro:"Elige lo que más se parezca.", items:[
  {ic:"📷", t:"No me ven", sub:"La cámara no funciona", to:"t-p-cam"},
  {ic:"🎤", t:"No me oyen", sub:"El micrófono no funciona", to:"t-p-mic"},
  {ic:"🔈", t:"No oigo a los demás", to:"t-p-hear"},
  {ic:"🚪", t:"No puedo entrar", to:"t-p-enter"},
  {ic:"🖥️", t:"No puedo compartir la pantalla", to:"t-p-share"}
]};

S["t-p-cam"] = {type:"guide", title:"No me ven (la cámara)", fix:true,
  lead:"Vamos de lo más fácil a lo menos.",
  blocks:[
    {k:"steps", items:[
      "Mira el botón de la **cámara** en la reunión. Si está tachado, púlsalo para encenderla.",
      "Cierra otros programas que puedan estar usando la cámara, como **Skype** u otra aplicación de videollamadas.",
      {t:"En Windows, abre **Configuración** y entra en **Privacidad** (en Windows 11, **Privacidad y seguridad**) y luego **Cámara**. Comprueba que el acceso a la cámara está **activado**.", n:"Si ya estaba activado, desactívalo y vuélvelo a activar."},
      "Si la cámara es externa, **desconéctala y vuelve a conectarla**.",
      "Si nada funciona, **reinicia el ordenador** y entra otra vez con el enlace."
    ]},
    {k:"tip", h:"Si entras desde el navegador", t:"El navegador tiene su propio permiso para la cámara. Pulsa el candado que hay junto a la dirección y permite la **cámara** y el **micrófono**."}
  ], src:"guía de ayuda para cámara en Teams (Colegio Alemán de Barranquilla) y Microsoft Soporte"};

S["t-p-mic"] = {type:"guide", title:"No me oyen (el micrófono)", fix:true,
  blocks:[
    {k:"steps", items:[
      "Mira el botón del **micrófono**. Si está tachado, púlsalo para activarlo.",
      {t:"Si no puedes activarlo, quizá el organizador lo ha **bloqueado**. Pulsa **Levantar la mano** o escribe en el **Chat** y te lo habilitarán.", n:"Es habitual en charlas con mucha gente."},
      {t:"Abre **Más** (tres puntos) y entra en los ajustes de **dispositivos**. Comprueba que está elegido **el micrófono correcto**.", n:"Si usas auriculares con micrófono, elígelos aquí."},
      "En Windows, abre **Configuración** > **Privacidad** (o **Privacidad y seguridad**) > **Micrófono** y comprueba que el acceso está activado.",
      "Si nada funciona, sal de la reunión y vuelve a entrar con el enlace."
    ]},
    {k:"tip", h:"Mientras tanto", t:"Puedes escribir en el **Chat** de la reunión para que te lean."}
  ], src:"UNED, guía para estudiantes; Microsoft Soporte (permisos de dispositivos)"};

S["t-p-hear"] = {type:"guide", title:"No oigo a los demás", fix:true,
  blocks:[
    {k:"steps", items:[
      "Mira el icono del **altavoz** junto al reloj de Windows (abajo a la derecha). Sube el volumen y comprueba que no está en silencio.",
      "Si usas **auriculares**, comprueba que están bien conectados y encendidos.",
      "En Teams, abre **Más** (tres puntos), entra en los ajustes de **dispositivos** y elige el **altavoz** correcto.",
      "Pregunta a los demás si tienen el micrófono encendido: a veces el problema es de ellos."
    ]}
  ], src:"Microsoft Soporte y guías de universidades (ajustes de dispositivos)"};

S["t-p-enter"] = {type:"guide", title:"No puedo entrar", fix:true,
  blocks:[
    {k:"cases", items:[
      {q:"Me pide una cuenta y no sé cuál", a:"Usa **la cuenta de la universidad**. Si Teams ha elegido otra, pulsa **Cambiar** junto a la cuenta y elige la correcta."},
      {q:"Se queda en “espera”", a:"Es la **sala de espera**. El organizador te tiene que dejar pasar. Espera un minuto y, si tardan, avísales por WhatsApp."},
      {q:"El enlace no abre Teams", a:["Prueba la opción **Abrir Teams en el navegador**.","Si tampoco funciona, pide a quien organiza que te envíe el enlace otra vez."]},
      {q:"Sale un error de inicio de sesión", a:["Comprueba que escribes bien tu correo de la universidad y tu contraseña.","Si sigue igual, es un problema de la cuenta: mira [[t-help|¿A quién pregunto?]]"]},
      {q:"Teams va muy lento o raro", a:["Cierra otros programas y vuelve a entrar.","Si usas la aplicación de Teams, pulsa tu foto de perfil y busca **Buscar actualizaciones**."]}
    ]}
  ], src:"Microsoft Soporte; UNED; guía de ayuda para cámara en Teams"};

S["t-p-share"] = {type:"guide", title:"No puedo compartir la pantalla", fix:true,
  blocks:[
    {k:"steps", items:[
      "Comprueba que estás **dentro** de la reunión y que ves la barra de botones.",
      {t:"Si sale un **mensaje de error**, aparecen opciones para **reiniciar la aplicación** o **volver a unirse**. Elige una.", n:"Normalmente basta con salir y entrar de nuevo con el enlace."},
      "Si el botón no aparece o no deja pulsarlo, puede que el organizador no te haya dado permiso. Pídeselo."
    ]},
    {k:"tip", h:"Para Sergio (el organizador)", t:"Por defecto, en algunas reuniones solo presenta quien organiza. Cambia el ajuste de **¿Quién puede presentar?** a **Todos** en **Opciones de reunión** o **Administrar permisos**."}
  ], src:"Microsoft Soporte, “Presentar contenido en reuniones de Microsoft Teams”; UPM, guía de manejo"};

/* ---- Listas y palabras ---- */
S["t-checklist"] = {type:"guide", title:"Lista rápida antes de la clase",
  lead:"Cinco minutos antes de la hora. Así evitas casi todos los problemas.",
  blocks:[
    {k:"list", items:[
      "Ordenador **enchufado** al cargador.",
      "Buscar el **enlace** de la clase (en el correo, en Moodle o en WhatsApp) y tenerlo a mano.",
      "**Cerrar** los programas que no hagan falta.",
      "Ponerte los **auriculares**, si usas.",
      "Entrar con el enlace **unos minutos antes**: así te da tiempo a probar la cámara y el sonido.",
      "En la pantalla previa: comprobar que **te ves** y que **te oyes** (mira [[t-prejoin|Antes de entrar]]).",
      "Entrar con el **micrófono silenciado**."
    ]}
  ]};

/* ---- Cierre ---- */
S["t-ok"] = {type:"done", title:"¡Perfecto!"};
S["t-help"] = {type:"help", title:"¿A quién pregunto?",
  lead:"No pasa nada. Hay cosas que se arreglan más rápido con alguien al lado.",
  extraHtml:
    '<h2>Si el problema es de tu cuenta</h2>'+
    '<p>Si no te deja iniciar sesión o has olvidado la contraseña de la cuenta de la universidad, hay que preguntar al servicio de informática de la universidad. En la UAM, el CAU: <b>cau@uam.es</b>.</p>'+
    '<h2>Ayuda oficial de Microsoft</h2>'+
    '<a class="btn block primary" href="https://support.microsoft.com/es-es/office/1613bb53-f3fa-431e-85a9-d6a91e3468c9" target="_blank" rel="noopener">Cómo unirse a una reunión (Microsoft)</a>'
};



/* ################ CITIBOX ################ */
/* Pantallas con prefijo "c-" y la entrada "citibox". */
S.citibox = {type:"guide", title:"Recoger un paquete de Citibox",
  lead:"Los buzones inteligentes de Citibox están en el portal o en la zona común del edificio. Cuando te llega un paquete, el buzón se abre con un código que te da la app del móvil.",
  blocks:[
    {k:"steps", items:[
      {t:"**Llega el aviso.** Cuando el repartidor deja tu pedido en el buzón, te llega una notificación de la app **Citibox** en el móvil.", n:"En el aviso verás el **número del buzón** donde está guardado tu paquete.", demo:"cb-notice"},
      {t:"**Baja a los buzones** de tu edificio o comunidad. Lleva el móvil con la app de Citibox abierta.", demo:"cb-go"},
      {t:"Delante del buzón, abre la app y **elige el pedido** que vas a recoger. Después la app te pide identificar el buzón. Puedes hacerlo de dos formas:", n:"**Opción 1:** escanear el **código QR** de la cerradura con la cámara. **Opción 2:** escribir la **primera letra o número** que aparece en la etiqueta del buzón.", demo:["cb-scan","cb-letter"]},
      {t:"La app te da un **código de apertura**. Escríbelo en el teclado de la puerta del buzón y pulsa la tecla de la **llave**.", n:"La luz cambia de color para confirmar. En algunos modelos de cerradura la app se conecta sin cables y no hace falta teclear el código.", demo:"cb-code"},
      {t:"**La puerta se abre.** Tira de ella, saca tu paquete y **cierra bien la puerta**. ¡Listo!", demo:"cb-open"}
    ]},
    {k:"tip", h:"Antes de bajar", t:"Apunta o recuerda el **número del buzón** que sale en el aviso, y lleva el móvil contigo: el buzón se abre con la app."},
    {k:"video", yt:"D5UXEkdyxVU", t:"Citibox, la llave de tu nuevo buzón inteligente"},
    {k:"btns", items:[{label:"El buzón no se abre", to:"c-help"}]}
  ], src:"vídeo “Citibox, la llave de tu nuevo buzón inteligente” (YouTube)"};

S["c-ok"] = {type:"done", title:"¡Paquete recogido!"};
S["c-help"] = {type:"help", title:"Si el buzón no se abre",
  lead:"Vuelve a intentarlo despacio: elige otra vez el pedido en la app y teclea el código de nuevo. Si sigue sin abrirse, pide ayuda.",
  extraHtml:
    '<h2>Ayuda de Citibox</h2>'+
    '<p>El servicio de atención de Citibox puede ayudarte con el buzón y con tu pedido.</p>'+
    '<a class="btn block primary" href="https://www.citibox.com/" target="_blank" rel="noopener">Web de Citibox</a>'
};


/* ################ NAVIGO EN EL IPHONE ################ */
/* Pantallas con prefijo "n-" y la entrada "navigo". Todo en una página con pestañas. */
S.navigo = {type:"guide", title:"La tarjeta Navigo en el iPhone",
  lead:"Con la Navigo en Cartera (Wallet) viajas en el transporte de París y su región acercando el iPhone al lector, sin tarjeta de plástico.",
  tabsLabel:"Qué quieres hacer",
  blocks:[
    {k:"list", h:"Antes de empezar", items:[
      "Necesitas tener **abierta la sesión de iCloud** en el iPhone.",
      "Y una **tarjeta de crédito o débito** añadida a Cartera: los pases solo se pagan con **Apple Pay**.",
      "Una Navigo en el iPhone vale para **un viajero**. Si viajas con otras personas, cada una necesita su propia Navigo digital."
    ]}
  ],
  tabs:[
    {id:"add", ic:"➕", label:"Añadirla", blocks:[
      {k:"steps", items:[
        "Abre la app **Cartera** y pulsa **+**.",
        {t:"Elige **Tarjeta de transporte**.", n:"Si el iPhone está en inglés, se llama **Transit Card**."},
        "Busca **Francia**, pulsa **Navigo** y luego **Continuar**.",
        "Elige el pase que quieres comprar y pulsa **Comprar**.",
        "Confirma el pago con **Apple Pay**. La Navigo queda guardada en Cartera."
      ]},
      {k:"btns", items:[{label:"¿Qué pase elijo?", to:"navigo/pass"}]}
    ]},
    {id:"pass", ic:"🎟️", label:"Qué pase elegir", blocks:[
      {k:"p", t:"La lista de lo que se vende dentro del móvil la da **Île-de-France Mobilités (IDFM)**. Según su página, hoy incluye:"},
      {k:"list", items:[
        "**Navigo** Día, Semana y Mes.",
        "**Paris Visite** de 1, 2, 3 y 5 días.",
        "Billetes de **bus y tranvía**.",
        "Billetes de **aeropuerto**, incluido RoissyBus."
      ]},
      {k:"tip", h:"Para visitar París", t:"Lo normal es **Navigo Día, Semana o Mes**, o **Paris Visite**."},
      {k:"warn", h:"Semana y Mes, fuera de Cartera", t:"La Navigo **Semana** y la **Mes** no se compran en Cartera. Se compran en la app de **IDFM**, en **Bonjour RATP** o en **SNCF Connect**, con una cuenta de **IDFM Connect**, y después se añaden a la Navigo de Cartera."},
      {k:"tip", h:"Sin comprobar", t:"Parece que la Navigo Semana vale **de lunes a domingo**, no siete días desde que la compras. Compruébalo antes de comprarla."}
    ]},
    {id:"use", ic:"📲", label:"Cómo usarla", blocks:[
      {k:"steps", items:[
        {t:"La primera Navigo que añades se configura sola en **Modo Exprés**.", n:"Así no tienes que abrir nada para pasar."},
        {t:"En el torniquete, acerca la **parte de arriba del iPhone** al lector.", n:"No hace falta desbloquearlo."},
        "Para usar otra tarjeta, abre **Cartera** o pulsa **dos veces el botón lateral** y elígela."
      ]},
      {k:"warn", h:"En algunos autobuses", t:"El Modo Exprés no está disponible y tienes que identificarte con **Face ID** o con el **código** del iPhone."}
    ]},
    {id:"top", ic:"🔄", label:"Recargar", blocks:[
      {k:"steps", items:[
        "Abre **Cartera** y entra en la **Navigo**.",
        "Pulsa **Más** y luego **Comprar pases**.",
        {t:"Elige el pase y confirma con **Apple Pay**.", n:"Para repetir un pase que ya usaste, elige **Comprar más**."}
      ]}
    ]},
    {id:"help", ic:"🛠️", label:"Si algo falla", lead:"Pulsa lo que te pasa para ver qué hacer.", blocks:[
      {k:"acc", items:[
        {q:"Me quedo sin batería", a:["Con el Modo Exprés, una guía de terceros dice que funciona hasta **5 horas** después de que el iPhone se apague. Otra fuente dice que no necesita batería.","**No cuentes con ello**: mejor sal con batería."]},
        {q:"Cambio de móvil o lo pierdo", a:["La Navigo solo puede estar en **un dispositivo a la vez**.","Si la eliminas, el **saldo se guarda** y puedes pasarla a otro iPhone con la misma cuenta Apple.","Si pierdes el móvil, una guía de terceros dice que se puede desactivar con la app **Buscar**."]},
        {q:"Necesito un recibo o factura", a:"Las compras en Cartera **no generan justificante** automático. Si necesitas factura, compra el pase desde una app de venta (IDFM, Bonjour RATP o SNCF Connect)."},
        {q:"Han desaparecido mis tarjetas", a:"Si cierras la sesión de iCloud o quitas Face ID o el código del iPhone, **se borran las tarjetas** de ese dispositivo. Vuelve a activarlos y añade la Navigo otra vez."}
      ]}
    ]}
  ],
  src:"Île-de-France Mobilités, Apple y guías de terceros (indicado en cada caso)"};
