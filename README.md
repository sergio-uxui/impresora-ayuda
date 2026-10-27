# Ayuda paso a paso

Web estática, sin dependencias ni paso de compilación. Una sola página con varias guías en español sencillo:

- **La impresora** (Epson XP-2200): luces, papel, tinta, calidad de impresión, Wi-Fi y cómo hacer cosas. Fuente: Guía del usuario NPD6908-02.
- **Videollamadas con Teams**: entrar a una clase, probar cámara y sonido, compartir pantalla y qué hacer si algo falla. Fuente: Microsoft Soporte y guías de universidades.

Pensada para usarla con letra grande, leer en voz alta y modo oscuro.

## Estructura

```
index.html        Estructura de la página (y los iconos)
css/styles.css    Estilos (colores en :root, modo oscuro incluido)
js/data.js        CONTENIDO: todas las pantallas (objeto S), contacto (CONTACT) y secciones (SECTIONS)
js/app.js         Lógica: navegación, secciones, luces de la impresora, barra de Teams, voz, tamaño de letra
```

## Arrancar en local

- `npm run dev` y abrir http://localhost:3000, o
- doble clic en `index.html` (también funciona sin servidor).

## Editar el contenido

- Teléfono de contacto: `CONTACT` al inicio de `js/data.js`.
- Cada pantalla es una entrada de `S`. La de inicio es `S.home`; cada guía tiene su entrada (`S.printer`, `S["teams"]`).
- Las pantallas de **Teams** llevan el prefijo `t-` (`t-join`, `t-share`…). Las de la impresora no.
- Una pantalla pertenece a una sección según su identificador (ver `secOf` en `js/app.js`). `SECTIONS` define, para cada una, su subtítulo, el pie y adónde llevan “Sí, ya funciona” y “Volver al inicio”.
- Tipos de pantalla: `menu`, `cards`, `guide`, `panel`, `done`, `help`.
- Bloques de una guía (`blocks`): `p`, `warn`, `tip`, `steps`, `list`, `cases`, `acc`, `btns`, `toolbar` y `demo`.
- `demo` es una animación en bucle (como un GIF) que repite una acción: `{k:"demo", v:"<nombre en DEMOS>"}`. Se dibuja con HTML y CSS en `DEMOS` (`js/app.js`); tiene botón de pausa y, con movimiento reducido, muestra una imagen fija.
- Un paso también puede llevar su propia animación debajo: `{t:"…", demo:"join-link"}` (ver "Entrar con el enlace" y "Compartir pantalla").
- Texto: `**negrita**` y enlaces internos con `[[id-de-pantalla|texto]]`.
- Cada guía lleva `src` con su fuente.

## Añadir otra guía (por ejemplo, Moodle)

1. Añade en `SECTIONS` una sección nueva y reconócela en `secOf`.
2. Escribe sus pantallas con un prefijo propio (`m-…`) y su entrada de menú.
3. Añade una opción en `S.home`.

## Pendiente de verificar con capturas reales

Teams rediseñó los controles de las reuniones. Los nombres exactos de los botones (Compartir / Compartir pantalla, Salir / Dejar / Colgar, ajustes de dispositivos) se han tomado de guías de Microsoft y de universidades, algunas anteriores al rediseño. Conviene comprobarlos en la pantalla real y ajustar `js/data.js`.

## Publicar

1. Subir a GitHub (repositorio nuevo, rama `main`).
2. En vercel.com: **Add New > Project**, importa el repositorio. Framework: **Other**. Sin comando de build; carpeta de salida: la raíz.
