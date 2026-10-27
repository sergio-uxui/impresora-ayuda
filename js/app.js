/* Lógica de la interfaz: navegación por hash, secciones (impresora y Teams), dibujo de luces y de la barra de reunión, voz y tamaño de letra. */
(function(){
"use strict";

/* ========= RENDER ========= */
var main = document.getElementById("main");
var navCount = 0;

/* Sección de una pantalla: las de Teams empiezan por "t-" (o son "teams"); el resto, la impresora. */
function secOf(id){
  if(id === "home") return "hub";
  if(id === "teams" || id.indexOf("t-") === 0) return "teams";
  return "printer";
}
var SEC = SECTIONS.hub;

function fmt(s){
  return String(s)
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/\[\[([\w-]+)\|(.+?)\]\]/g,'<a href="#/$1">$2</a>');
}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

/* Luces */
var LAMPS = [
  ["power","Encendido","i-power","green"],
  ["wifi","Wi-Fi","i-wifi","green"],
  ["direct","Wi-Fi directo","i-direct","green"],
  ["ink","Tinta","i-ink","orange"],
  ["paper","Papel","i-paper","orange"]
];
var STATE_TXT = {on:"fija", blink:"parpadea", slow:"parpadea despacio", fast:"parpadea rápido", alt:"parpadea alternando"};
function lamp(l){
  var out = "";
  LAMPS.forEach(function(d){
    var st = l[d[0]];
    var cls = st ? st : "";
    out += '<div class="lampcell'+(st?"":" dim")+'">' +
      '<div class="ico"><svg aria-hidden="true"><use href="#'+d[2]+'"/></svg></div>' +
      '<span class="lamp '+cls+'" style="--c:var(--lamp-'+d[3]+')"></span>' +
      '<div class="lname">'+d[1]+'</div>' +
      '<div class="lstate">'+(st?STATE_TXT[st]:"")+'</div></div>';
  });
  return '<div class="strip" role="img" aria-label="'+esc(describeLamps(l))+'">'+out+'</div>';
}
function describeLamps(l){
  var parts=[];
  LAMPS.forEach(function(d){ if(l[d[0]]) parts.push("Luz de "+d[1].toLowerCase()+" "+STATE_TXT[l[d[0]]]); });
  return parts.join(". ");
}

/* Migas: Inicio › Sección › Pantalla */
function crumbs(id){
  if(id === "home") return "";
  var c = ['<li><a href="#/">Inicio</a></li>'];
  if(SEC.label){
    c.push(id === SEC.home ? '<li><span aria-current="page">'+esc(SEC.label)+'</span></li>' : '<li><a href="#/'+SEC.home+'">'+esc(SEC.label)+'</a></li>');
  }
  if(id !== SEC.home) c.push('<li><span aria-current="page">'+esc(S[id].title.replace(/<[^>]+>/g,""))+'</span></li>');
  return '<nav aria-label="Estás aquí"><ol class="crumbs">'+c.join("")+'</ol></nav>';
}

/* Botones Volver, Inicio y Leer en voz alta (van en la cabecera) */
function navRow(id){
  var h = "";
  if(id !== "home"){
    h += '<button class="btn" type="button" id="back">← Volver</button>';
    h += '<a class="btn" href="#/">🏠 Inicio</a>';
  }
  if("speechSynthesis" in window){
    h += '<button class="btn" type="button" id="say" aria-pressed="false">🔊 Leer en voz alta</button>';
  }
  return h;
}

function fixBlock(){
  return '<section class="fix" aria-labelledby="fixh"><h2 id="fixh">¿Se ha solucionado?</h2><div class="row">' +
    '<a class="btn primary block" href="#/'+SEC.ok+'">Sí, ya funciona</a>' +
    '<a class="btn block" href="#/'+SEC.help+'">No, sigue igual</a></div></section>';
}

function listOrText(a){
  if(Array.isArray(a)){
    return '<ul class="list">'+a.map(function(x){return "<li>"+fmt(x)+"</li>"}).join("")+"</ul>";
  }
  return "<p>"+fmt(a)+"</p>";
}

/* Dibujo orientativo de la barra de controles de una reunión */
var TOOLS = [
  ["i-cam","Cámara"],["i-mic","Micrófono"],["i-share","Compartir"],["i-chat","Chat"],
  ["i-people","Personas"],["i-hand","Levantar la mano"],["i-more","Más"],["i-leave","Salir"]
];
function toolbar(){
  var cells = TOOLS.map(function(t,i){
    var last = i === TOOLS.length-1;
    return '<li class="tb'+(last?' leave':'')+'"><span class="tbn" aria-hidden="true">'+(i+1)+'</span>' +
      '<span class="tbi"><svg aria-hidden="true"><use href="#'+t[0]+'"/></svg></span>' +
      '<span class="tbl">'+t[1]+'</span></li>';
  }).join("");
  return '<ol class="toolbar" aria-label="Botones de la reunión, de izquierda a derecha">'+cells+'</ol>' +
    '<p class="src">Dibujo orientativo. En tu pantalla los botones pueden estar en otro orden o con otro aspecto, pero los iconos son parecidos.</p>';
}

/* Animaciones en bucle (como un GIF) que muestran una acción */
var CURSOR = '<div class="d-cursor"><svg viewBox="0 0 20 28"><path d="M1 1v22l6-5.5 4 9 3.5-1.6-4-8.8H18z" fill="#fff" stroke="#000" stroke-width="1.6" stroke-linejoin="round"/></svg><span class="d-ripple"></span></div>';
function demoFig(cls, screen, cap){
  return '<figure class="demo '+cls+'">' +
    '<div class="demo-screen" aria-hidden="true"><div class="d-fade">'+screen+'</div></div>' +
    '<figcaption class="demo-cap">'+cap+'<button type="button" class="demo-toggle" aria-pressed="false" aria-label="Pausar la animación">❚❚</button></figcaption>' +
  '</figure>';
}
function dTitle(t){ return '<div class="d-title"><i></i><i></i><i></i><span>'+t+'</span></div>'; }
function dNote(t){ return '<p class="demo-note">'+fmt(t)+'</p>'; }

/* Piezas de una reunión que reutilizan varias animaciones */
var D_MEET = dTitle("Reunión con Sergio") +
  '<div class="d-stage"><div class="d-avatar">S</div><span class="d-name">Sergio</span></div>' +
  '<div class="d-bar">' +
    '<span class="d-btn"><svg><use href="#i-cam"/></svg></span>' +
    '<span class="d-btn"><svg><use href="#i-mic"/></svg></span>' +
    '<span class="d-btn share"><svg><use href="#i-share"/></svg><span class="d-tip">Compartir</span></span>' +
    '<span class="d-btn leave"><svg><use href="#i-leave"/></svg></span>' +
  '</div>';
var D_PICKER = '<div class="d-picker"><b>¿Qué quieres compartir?</b><div class="d-opts">' +
    '<div class="d-opt"><i></i>Pantalla</div><div class="d-opt win"><i></i>Ventana</div>' +
  '</div><div class="d-sound"><i class="d-sw"></i>Incluir sonido</div></div>';
var D_SHARED = '<div class="d-shared"><div class="d-doc"><i></i><i></i><i></i><i></i></div>' +
  '<div class="d-banner"><span>●</span>Estás compartiendo<em>Dejar de compartir</em></div></div>';

/* Compartir pantalla: una animación por paso */
function demoShareBtn(){
  return demoFig("mini ds1", D_MEET + D_PICKER + CURSOR, dNote("Pulsa **Compartir** en la barra de abajo."));
}
function demoSharePick(){
  return demoFig("mini ds2", D_MEET + D_PICKER + CURSOR, dNote("Elige **Ventana** para enseñar solo esa ventana."));
}
function demoShareSound(){
  return demoFig("mini ds3", D_MEET + D_PICKER + CURSOR, dNote("Activa **Incluir sonido** si hay música o audio."));
}
function demoShareBorder(){
  return demoFig("mini ds4", D_MEET + D_SHARED, dNote("El **borde rojo** marca lo que ven los demás."));
}
function demoShareStop(){
  return demoFig("mini ds5", D_MEET + D_SHARED + '<div class="j-toast">Has dejado de compartir</div>' + CURSOR,
    dNote("Sube el ratón y pulsa **Dejar de compartir**."));
}

/* Entrar con el enlace: una animación por paso */
function demoJoinLink(){
  return demoFig("mini dj1",
    dTitle("Mensajes") +
    '<div class="j-chat"><div class="j-bub"><b>Sergio</b>Hola. Este es el enlace de la clase de hoy a las 17:00:' +
      '<span class="j-link">Unirse a la reunión de Teams</span></div></div>' +
    '<div class="j-toast">Abriendo el enlace…</div>' + CURSOR,
    dNote("Pulsa el enlace del mensaje."));
}
function demoJoinOpen(){
  return demoFig("mini dj2",
    '<div class="j-url"><i></i><i></i><i></i><span>teams.microsoft.com/meet/…</span></div>' +
    '<div class="j-page"><b>Unirse a la reunión</b><span>Abrir la aplicación de Teams</span><span>Continuar en este explorador</span></div>' +
    '<div class="j-dlg"><b>¿Abrir Microsoft Teams?</b><small>Este sitio quiere abrir esta aplicación.</small>' +
      '<div class="j-dbtns"><u>Cancelar</u><em>Abrir Microsoft Teams</em></div></div>' +
    '<div class="j-toast">Abriendo Teams…</div>' + CURSOR,
    dNote("Pulsa **Abrir Microsoft Teams**."));
}
function demoJoinLogin(){
  return demoFig("mini dj3",
    dTitle("Iniciar sesión") +
    '<div class="j-login"><b>Iniciar sesión</b>' +
      '<div class="j-field"><span class="j-typed">tu.nombre@estudiante.uam.es</span></div>' +
      '<small>¿No puedes acceder a tu cuenta?</small><em class="j-next">Siguiente</em></div>' +
    '<div class="j-toast">✓ Sesión iniciada</div>' + CURSOR,
    dNote("Escribe el correo de la universidad y pulsa **Siguiente**."));
}
function demoJoinPrejoin(){
  return demoFig("mini dj4",
    dTitle("Reunión con Sergio") +
    '<div class="j-pre"><div class="j-cam"><div class="j-me"></div><span>Tu imagen</span></div>' +
      '<div class="j-side"><b>Elige audio y vídeo</b>' +
        '<div class="j-row"><svg><use href="#i-cam"/></svg><i class="j-sw"></i></div>' +
        '<div class="j-row"><svg><use href="#i-mic"/></svg><i class="j-sw"></i><span class="j-lvl"><i></i><i></i><i></i><i></i><i></i></span></div>' +
        '<div class="j-row j-aud">🔈 Audio del equipo</div>' +
        '<em class="j-join">Unirse ahora</em></div></div>' +
    '<div class="j-toast">Entrando en la reunión…</div>' + CURSOR,
    dNote("Comprueba que te ves y te oyes, y pulsa **Unirse ahora**."));
}
function demoJoinWait(){
  return demoFig("mini dj5",
    dTitle("Reunión con Sergio") +
    '<div class="j-wait"><div class="j-me"></div><p>Alguien de la reunión te dejará entrar pronto</p><span class="j-dots"><i></i><i></i><i></i></span></div>' +
    '<div class="j-in"><div class="d-avatar">S</div><span class="j-badge">Ya estás dentro</span></div>',
    dNote("Espera sin cerrar nada: te dejarán pasar."));
}
var DEMOS = {"share-btn": demoShareBtn, "share-pick": demoSharePick, "share-sound": demoShareSound, "share-border": demoShareBorder, "share-stop": demoShareStop, "join-link": demoJoinLink, "join-open": demoJoinOpen, "join-login": demoJoinLogin, "join-prejoin": demoJoinPrejoin, "join-wait": demoJoinWait};

function renderBlock(b){
  switch(b.k){
    case "p": return "<p>"+fmt(b.t)+"</p>";
    case "warn": return '<div class="warn" role="note"><b>'+fmt(b.h||"Cuidado")+"</b><p>"+fmt(b.t)+"</p></div>";
    case "tip": return '<div class="tip" role="note"><b>'+fmt(b.h||"Consejo")+"</b><p>"+fmt(b.t)+"</p></div>";
    case "steps":
      return (b.h?"<h2>"+fmt(b.h)+"</h2>":"") + '<ol class="steps">' + b.items.map(function(it){
        if(typeof it === "string") return "<li>"+fmt(it)+"</li>";
        return "<li>"+fmt(it.t)+(it.n?'<span class="stepnote">'+fmt(it.n)+"</span>":"")+(it.demo && DEMOS[it.demo]?DEMOS[it.demo]():"")+"</li>";
      }).join("") + "</ol>";
    case "list":
      return (b.h?"<h2>"+fmt(b.h)+"</h2>":"") + '<ul class="list">'+b.items.map(function(x){return "<li>"+fmt(x)+"</li>"}).join("")+"</ul>";
    case "cases":
      return (b.h?"<h2>"+fmt(b.h)+"</h2>":"") + b.items.map(function(c){
        return '<article class="case"><h3>'+fmt(c.q)+"</h3>"+listOrText(c.a)+
          (c.to?'<a class="btn" href="#/'+c.to+'">'+esc(c.toLabel||"Ver cómo")+"</a>":"")+"</article>";
      }).join("");
    case "acc":
      return b.items.map(function(c){
        return '<details class="acc"><summary>'+fmt(c.q)+'</summary><div class="accb">'+listOrText(c.a)+"</div></details>";
      }).join("");
    case "btns":
      return b.items.map(function(x){return '<a class="btn block" href="#/'+x.to+'">'+esc(x.label)+"</a>"}).join("");
    case "toolbar": return toolbar();
    case "demo": return DEMOS[b.v] ? DEMOS[b.v]() : "";
  }
  return "";
}

function choices(items){
  return '<nav class="choices" aria-label="Opciones">' + items.map(function(it){
    return '<a class="choice" href="#/'+it.to+'"><span class="ci" aria-hidden="true">'+it.ic+'</span><span class="ct"><b>'+fmt(it.t)+"</b>"+(it.sub?"<small>"+fmt(it.sub)+"</small>":"")+'</span><span class="chev" aria-hidden="true">›</span></a>';
  }).join("") + "</nav>";
}

/* Pestañas de un menú. La elegida se recuerda en la sesión para volver a ella con "Volver" */
function tabsHtml(s,id){
  var cur = 0;
  try{ cur = +(sessionStorage.getItem("tab-"+id) || 0); }catch(e){}
  if(!s.tabs[cur]) cur = 0;
  var bar = s.tabs.map(function(t,i){
    return '<button type="button" role="tab" class="tab" id="tab-'+i+'" aria-controls="tp-'+i+'" aria-selected="'+(i===cur)+'"'+(i===cur?"":' tabindex="-1"')+'>'+esc(t.label)+'</button>';
  }).join("");
  var panels = s.tabs.map(function(t,i){
    return '<div role="tabpanel" class="tabpanel" id="tp-'+i+'" aria-labelledby="tab-'+i+'"'+(i===cur?"":" hidden")+'>'+
      (t.intro?'<p class="tabintro">'+fmt(t.intro)+'</p>':"")+choices(t.items)+'</div>';
  }).join("");
  return '<div class="tabs" data-menu="'+id+'"><div class="tablist" role="tablist" aria-label="Momento de la llamada">'+bar+'</div>'+panels+'</div>';
}
function bindTabs(){
  var box = main.querySelector(".tabs");
  if(!box) return;
  var tabs = [].slice.call(box.querySelectorAll('[role="tab"]'));
  function select(i, focus){
    tabs.forEach(function(t,j){
      t.setAttribute("aria-selected", String(i===j));
      if(i===j) t.removeAttribute("tabindex"); else t.setAttribute("tabindex","-1");
      document.getElementById(t.getAttribute("aria-controls")).hidden = i!==j;
    });
    if(focus) tabs[i].focus();
    try{ sessionStorage.setItem("tab-"+box.dataset.menu, String(i)); }catch(e){}
  }
  tabs.forEach(function(t,i){
    t.addEventListener("click", function(){ select(i); });
    t.addEventListener("keydown", function(e){
      var n = tabs.length, k = e.key;
      if(k==="ArrowRight"||k==="ArrowLeft"||k==="Home"||k==="End"){
        e.preventDefault();
        select(k==="Home"?0:k==="End"?n-1:(i+(k==="ArrowRight"?1:n-1))%n, true);
      }
    });
  });
}

function renderMenu(s,id){
  var title = fmt(s.title);
  var h = s.logo
    ? '<div class="h1row"><svg class="h1logo" aria-hidden="true"><use href="#'+s.logo+'"/></svg><h1>'+title+'</h1></div>'
    : "<h1>"+title+"</h1>";
  if(s.intro) h += '<p class="lead">'+fmt(s.intro)+"</p>";
  h += s.tabs ? tabsHtml(s,id) : choices(s.items);
  if(s.extra) h += s.extra.map(function(x){return '<a class="btn block" href="#/'+x.to+'">'+esc(x.label)+"</a>"}).join("");
  return h;
}

function renderCards(s){
  var h = "<h1>"+fmt(s.title)+"</h1><p class=\"lead\">"+fmt(s.intro)+"</p>";
  h += s.cards.map(function(c){
    return '<a class="lcard" href="#/'+c.to+'">'+lamp(c.lamps)+"<h3>"+fmt(c.t)+"</h3><p>"+fmt(c.d)+'</p><span class="go">Ver qué hacer ›</span></a>';
  }).join("");
  return h;
}

function renderGuide(s,id){
  var h = "<h1>"+fmt(s.title)+"</h1>";
  if(s.lamps) h += lamp(s.lamps).replace('class="strip"','class="strip big"');
  if(s.lead) h += '<p class="lead">'+fmt(s.lead)+"</p>";
  h += s.blocks.map(renderBlock).join("");
  if(s.fix === true || (s.fix !== false && secOf(id) === "printer")) h += fixBlock();
  if(s.src) h += '<p class="src">Fuente: '+esc(SEC.srcPrefix)+esc(s.src)+".</p>";
  return h;
}

function panelSvg(){
  function ic(id,x,y,s){return '<use href="#'+id+'" x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'"/>'}
  function num(n,x,y){return '<circle cx="'+x+'" cy="'+y+'" r="14" fill="currentColor"/><text x="'+x+'" y="'+(y+6)+'" text-anchor="middle" font-size="18" font-weight="700" fill="var(--paper)" font-family="inherit">'+n+'</text>'}
  var btn = function(cx,icon,fill){return '<circle cx="'+cx+'" cy="82" r="27" fill="var(--surface)" stroke="currentColor" stroke-width="3"/>'+(icon||"")}
  return '<svg class="panel" viewBox="0 0 600 170" role="img" aria-label="Dibujo del panel de la impresora con sus botones y luces numerados">' +
    '<rect x="4" y="6" width="592" height="158" rx="22" fill="var(--brand-soft)" stroke="currentColor" stroke-width="3"/>' +
    /* encendido */ '<circle cx="52" cy="82" r="30" fill="var(--surface)" stroke="currentColor" stroke-width="3"/>'+ic("i-power",36,66,32) +
    /* luces wifi */ '<circle cx="128" cy="58" r="11" fill="var(--lamp-green)"/><circle cx="128" cy="106" r="11" fill="var(--lamp-green)" opacity=".55"/>'+ic("i-wifi",96,46,24)+ic("i-direct",96,94,24) +
    /* botones */ btn(204,'<text x="204" y="89" text-anchor="middle" font-size="17" font-weight="700" fill="currentColor" font-family="inherit">Wi-Fi</text>') +
                  btn(268,ic("i-info",256,70,24)) + btn(332,ic("i-copybw",318,68,28)) + btn(396,ic("i-copyc",382,68,28)) + btn(468,ic("i-stop",454,68,28)) +
    /* luces tinta / papel */ '<circle cx="552" cy="58" r="11" fill="var(--lamp-orange)"/><circle cx="552" cy="106" r="11" fill="var(--lamp-orange)" opacity=".55"/>'+ic("i-ink",518,46,24)+ic("i-paper",518,94,24) +
    num(1,52,136)+num(2,112,136)+num(3,204,136)+num(4,268,136)+num(5,332,136)+num(6,396,136)+num(7,468,136)+num(8,535,136) +
    "</svg>";
}
function renderPanel(s){
  return "<h1>"+s.title+"</h1><p class=\"lead\">Así se ve la parte delantera de la impresora. Cada número corresponde a una explicación de abajo.</p>" + panelSvg() +
    '<ol class="legend">' +
    "<li><b>Botón de encendido.</b> Su luz está dentro del botón. Pulsa para encender y apagar.</li>"+
    "<li><b>Dos luces de Wi-Fi.</b> La de arriba indica conexión por Wi-Fi; la de abajo, Wi-Fi directo.</li>"+
    "<li><b>Botón Wi-Fi.</b> Borra los errores de red. Mantenlo 5 segundos para conectar con el botón WPS del router.</li>"+
    "<li><b>Botón “i”.</b> Pulsación corta: imprime el informe de conexión. Mantenido 5 segundos: imprime la hoja de estado de la red.</li>"+
    "<li><b>Copia en blanco y negro.</b></li>"+
    "<li><b>Copia en color.</b></li>"+
    "<li><b>Botón de parar</b> (círculo con triángulo hacia abajo). Cancela la operación. Mantenido 5 segundos: limpia el cabezal. Para cambiar cartuchos, mantenido 10 segundos.</li>"+
    "<li><b>Luces de tinta (gota, arriba) y de papel (hoja, abajo).</b></li>"+
    "</ol>" +
    '<a class="btn block primary" href="#/lights">Ver qué significan las luces</a>';
}
function renderDone(s){
  return "<h1>"+s.title+"</h1><p class=\"lead\">Qué bien. Si vuelve a pasar, aquí estará la ayuda.</p><a class=\"btn primary block\" href=\"#/"+SEC.home+"\">Volver al inicio</a>";
}
function renderHelp(s){
  if(s.extraHtml) return renderHelpGeneric(s);
  var who = CONTACT.telefono
    ? '<p class="contact"><a href="tel:'+esc(CONTACT.telefono.replace(/\s+/g,""))+'">📞 Llamar a '+esc(CONTACT.nombre)+" · "+esc(CONTACT.telefono)+"</a></p>"
    : '<p class="contact">Pregunta a '+esc(CONTACT.nombre)+"</p>";
  return "<h1>"+s.title+"</h1><p class=\"lead\">No pasa nada. Algunas cosas solo las arregla el servicio técnico.</p>"+who+
    '<h2>Si hay que contactar con Epson</h2>'+
    '<p>Ten a mano estos datos, así te atenderán más rápido:</p>'+
    '<ul class="list"><li>El modelo: <b>XP-2200</b>.</li><li>El <b>número de serie</b>: está en una etiqueta, normalmente en la parte de atrás de la impresora.</li><li>El nombre y la versión del sistema del ordenador (Windows o Mac).</li></ul>'+
    '<a class="btn block primary" href="https://www.epson.eu/support" target="_blank" rel="noopener">Soporte técnico de Epson en Europa</a>'+
    '<p class="src">El manual indica que la forma de contactar con Epson figura en el documento de garantía paneuropea que viene con la impresora.</p>'+
    '<a class="btn block" href="#/'+SEC.home+'">Volver al inicio</a>';
}
function renderHelpGeneric(s){
  var who = CONTACT.telefono
    ? '<p class="contact"><a href="tel:'+esc(CONTACT.telefono.replace(/\s+/g,""))+'">📞 Llamar a '+esc(CONTACT.nombre)+" · "+esc(CONTACT.telefono)+"</a></p>"
    : '<p class="contact">Pregunta a '+esc(CONTACT.nombre)+"</p>";
  return "<h1>"+s.title+"</h1><p class=\"lead\">"+fmt(s.lead||"")+"</p>"+who+s.extraHtml+
    '<a class="btn block" href="#/'+SEC.home+'">Volver al inicio</a>';
}

function render(){
  var id = (location.hash.replace(/^#\/?/,"")) || "home";
  if(!S[id]) id = "home";
  var s = S[id], h;
  SEC = SECTIONS[secOf(id)];
  document.getElementById("foot").textContent = SEC.foot;
  switch(s.type){
    case "menu": h = renderMenu(s,id); break;
    case "cards": h = renderCards(s); break;
    case "guide": h = renderGuide(s,id); break;
    case "panel": h = renderPanel(s); break;
    case "done": h = renderDone(s); break;
    case "help": h = renderHelp(s); break;
    default: h = "";
  }
  stopSpeech();
  document.getElementById("pagenav").innerHTML = navRow(id);
  main.innerHTML = crumbs(id) + '<div id="readable">' + h + "</div>";
  document.title = (id==="home" ? SITE.title : s.title.replace(/<[^>]+>/g,"") + " · " + SITE.title);
  var back = document.getElementById("back");
  if(back) back.addEventListener("click", function(){ if(navCount>0) history.back(); else location.hash="#/"; });
  var say = document.getElementById("say");
  if(say) say.addEventListener("click", toggleSpeech);
  bindTabs();
  main.querySelectorAll(".demo-toggle").forEach(function(t){
    t.addEventListener("click", function(){
      var paused = t.closest(".demo").classList.toggle("paused");
      t.setAttribute("aria-pressed", String(paused));
      t.setAttribute("aria-label", paused ? "Reanudar la animación" : "Pausar la animación");
      t.textContent = paused ? "▶" : "❚❚";
    });
  });
  window.scrollTo(0,0);
  var h1 = main.querySelector("h1");
  if(h1){ h1.setAttribute("tabindex","-1"); h1.focus({preventScroll:true}); }
}

/* Leer en voz alta */
var speaking = false;
function stopSpeech(){
  if("speechSynthesis" in window){ try{ speechSynthesis.cancel(); }catch(e){} }
  speaking = false;
  var b = document.getElementById("say"); if(b){ b.setAttribute("aria-pressed","false"); b.textContent = "🔊 Leer en voz alta"; }
}
function toggleSpeech(){
  if(speaking){ stopSpeech(); return; }
  var el = document.getElementById("readable");
  if(!el) return;
  var u = new SpeechSynthesisUtterance(el.innerText);
  u.lang = "es-ES"; u.rate = 0.92;
  u.onend = u.onerror = stopSpeech;
  speaking = true;
  var b = document.getElementById("say"); if(b){ b.setAttribute("aria-pressed","true"); b.textContent = "⏹ Parar la lectura"; }
  speechSynthesis.speak(u);
}

/* Tamaño de letra */
function setFs(n){
  document.documentElement.setAttribute("data-fs", String(n));
  document.querySelectorAll(".sizes button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.fs === String(n))); });
  try{ localStorage.setItem("fs", String(n)); }catch(e){}
}
document.querySelectorAll(".sizes button").forEach(function(b){ b.addEventListener("click", function(){ setFs(b.dataset.fs); }); });
var saved = "0"; try{ saved = localStorage.getItem("fs") || "0"; }catch(e){}
setFs(saved);

window.addEventListener("hashchange", function(){ navCount++; render(); });
render();
})();
