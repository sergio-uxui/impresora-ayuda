/* Lógica de la interfaz: navegación por hash, dibujo de luces, voz y tamaño de letra. */
(function(){
"use strict";

/* ========= RENDER ========= */
var main = document.getElementById("main");
var navCount = 0;

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

/* Migas de pan: el padre de cada pantalla es la primera desde la que se llega a ella partiendo del inicio */
var PARENT = (function(){
  var parent = {home:null}, queue = ["home"];
  function links(o, out){
    if(Array.isArray(o)) o.forEach(function(x){ links(x, out); });
    else if(o && typeof o === "object") Object.keys(o).forEach(function(k){
      if(k === "to" && typeof o[k] === "string") out.push(o[k]); else links(o[k], out);
    });
    return out;
  }
  while(queue.length){
    var id = queue.shift();
    links(S[id], []).forEach(function(to){
      if(S[to] && !(to in parent) && to !== "ok" && to !== "help"){ parent[to] = id; queue.push(to); }
    });
  }
  return parent;
})();
function crumbLabel(id){ return S[id].crumb || String(S[id].title).replace(/<[^>]+>/g,""); }
function crumbs(id){
  var path = [id];
  for(var p = PARENT[id] === undefined ? "home" : PARENT[id]; p; p = PARENT[p]) path.unshift(p);
  return '<nav class="crumbs" aria-label="Estás aquí"><ol>' + path.map(function(c, i){
    return i === path.length - 1
      ? '<li><span aria-current="page">'+esc(crumbLabel(c))+"</span></li>"
      : '<li><a href="#/'+(c === "home" ? "" : c)+'">'+esc(crumbLabel(c))+"</a></li>";
  }).join("") + "</ol></nav>";
}

function navRow(id){
  var h = '<div class="toprow">';
  if(id !== "home"){
    h += '<button class="btn" type="button" id="back">← Volver</button>';
    h += '<a class="btn" href="#/">🏠 Inicio</a>';
  }
  if("speechSynthesis" in window){
    h += '<button class="btn" type="button" id="say" aria-pressed="false">🔊 Leer en voz alta</button>';
  }
  h += "</div>";
  return id === "home" ? h : h + crumbs(id);
}

function fixBlock(){
  return '<section class="fix" aria-labelledby="fixh"><h2 id="fixh">¿Se ha solucionado?</h2><div class="row">' +
    '<a class="btn primary block" href="#/ok">Sí, ya funciona</a>' +
    '<a class="btn block" href="#/help">No, sigue igual</a></div></section>';
}

function listOrText(a){
  if(Array.isArray(a)){
    return '<ul class="list">'+a.map(function(x){return "<li>"+fmt(x)+"</li>"}).join("")+"</ul>";
  }
  return "<p>"+fmt(a)+"</p>";
}

function renderBlock(b){
  switch(b.k){
    case "p": return "<p>"+fmt(b.t)+"</p>";
    case "warn": return '<div class="warn" role="note"><b>'+fmt(b.h||"Cuidado")+"</b><p>"+fmt(b.t)+"</p></div>";
    case "tip": return '<div class="tip" role="note"><b>'+fmt(b.h||"Consejo")+"</b><p>"+fmt(b.t)+"</p></div>";
    case "steps":
      return (b.h?"<h2>"+fmt(b.h)+"</h2>":"") + '<ol class="steps">' + b.items.map(function(it){
        if(typeof it === "string") return "<li>"+fmt(it)+"</li>";
        return "<li>"+fmt(it.t)+(it.n?'<span class="stepnote">'+fmt(it.n)+"</span>":"")+"</li>";
      }).join("") + "</ol>";
    case "list":
      return (b.h?"<h2>"+fmt(b.h)+"</h2>":"") + '<ul class="list">'+b.items.map(function(x){return "<li>"+fmt(x)+"</li>"}).join("")+"</ul>";
    case "cases":
      return b.items.map(function(c){
        return '<article class="case"><h3>'+fmt(c.q)+"</h3>"+listOrText(c.a)+
          (c.to?'<a class="btn" href="#/'+c.to+'">'+esc(c.toLabel||"Ver cómo")+"</a>":"")+"</article>";
      }).join("");
    case "acc":
      return b.items.map(function(c){
        return '<details class="acc"><summary>'+fmt(c.q)+'</summary><div class="accb">'+listOrText(c.a)+"</div></details>";
      }).join("");
    case "btns":
      return b.items.map(function(x){return '<a class="btn block" href="#/'+x.to+'">'+esc(x.label)+"</a>"}).join("");
    case "fixrow": return "";
  }
  return "";
}

function renderMenu(s,id){
  var h = "<h1>"+fmt(s.title)+"</h1>";
  if(s.intro) h += '<p class="lead">'+fmt(s.intro)+"</p>";
  h += '<nav class="choices" aria-label="Opciones">' + s.items.map(function(it){
    return '<a class="choice" href="#/'+it.to+'"><span class="ci" aria-hidden="true">'+it.ic+'</span><span class="ct"><b>'+fmt(it.t)+"</b>"+(it.sub?"<small>"+fmt(it.sub)+"</small>":"")+'</span><span class="chev" aria-hidden="true">›</span></a>';
  }).join("") + "</nav>";
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
  if(s.fix !== false) h += fixBlock();
  if(s.src) h += '<p class="src">Fuente: Guía del usuario Epson XP-2200, '+esc(s.src)+".</p>";
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
  return "<h1>"+s.title+"</h1><p class=\"lead\">Qué bien. Si vuelve a pasar, aquí estará la ayuda.</p><a class=\"btn primary block\" href=\"#/\">Volver al inicio</a>";
}
function renderHelp(s){
  var who = CONTACT.telefono
    ? '<p class="contact"><a href="tel:'+esc(CONTACT.telefono.replace(/\s+/g,""))+'">📞 Llamar a '+esc(CONTACT.nombre)+" · "+esc(CONTACT.telefono)+"</a></p>"
    : '<p class="contact">Pregunta a '+esc(CONTACT.nombre)+"</p>";
  return "<h1>"+s.title+"</h1><p class=\"lead\">No pasa nada. Algunas cosas solo las arregla el servicio técnico.</p>"+who+
    '<h2>Si hay que contactar con Epson</h2>'+
    '<p>Ten a mano estos datos, así te atenderán más rápido:</p>'+
    '<ul class="list"><li>El modelo: <b>XP-2200</b>.</li><li>El <b>número de serie</b>: está en una etiqueta, normalmente en la parte de atrás de la impresora.</li><li>El nombre y la versión del sistema del ordenador (Windows o Mac).</li></ul>'+
    '<a class="btn block primary" href="https://www.epson.eu/support" target="_blank" rel="noopener">Soporte técnico de Epson en Europa</a>'+
    '<p class="src">El manual indica que la forma de contactar con Epson figura en el documento de garantía paneuropea que viene con la impresora.</p>'+
    '<a class="btn block" href="#/">Volver al inicio</a>';
}

function render(){
  var id = (location.hash.replace(/^#\/?/,"")) || "home";
  if(!S[id]) id = "home";
  var s = S[id], h;
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
  main.innerHTML = navRow(id) + '<div id="readable">' + h + "</div>";
  document.title = (id==="home" ? "Ayuda con mi impresora" : s.title.replace(/<[^>]+>/g,"") + " · Ayuda con mi impresora");
  var back = document.getElementById("back");
  if(back) back.addEventListener("click", function(){ if(navCount>0) history.back(); else location.hash="#/"; });
  var say = document.getElementById("say");
  if(say) say.addEventListener("click", toggleSpeech);
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

/* Transición suave entre pantallas */
var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)");
function go(){
  if(calm && calm.matches){ render(); return; }
  if(document.startViewTransition){ document.startViewTransition(render); return; }
  render();
  main.classList.remove("enter"); void main.offsetWidth; main.classList.add("enter");
}

window.addEventListener("hashchange", function(){ navCount++; go(); });
render();
})();
