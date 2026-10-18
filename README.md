# Ayuda con mi impresora (Epson XP-2200)

Web estática, sin dependencias ni paso de compilación. Guía paso a paso en español para una impresora Epson XP-2200: luces, papel, tinta, calidad de impresión y Wi-Fi.

## Estructura

```
index.html        Estructura de la página
css/styles.css    Estilos (colores en :root, modo oscuro incluido)
js/data.js        CONTENIDO: todas las pantallas y textos (objeto S) y el contacto (CONTACT)
js/app.js         Lógica: navegación, dibujo de las luces, lectura en voz alta, tamaño de letra
```

## Desarrollar en VS Code

1. Abre la carpeta: `code .` (o Archivo > Abrir carpeta).
2. Opcional: instala la extensión **Live Server** (Ritwick Dey) para ver los cambios al guardar.
3. Arrancar en local, cualquiera de estas opciones:
   - Clic derecho en `index.html` > **Open with Live Server**.
   - `npm run dev` y abrir http://localhost:3000.
   - Doble clic en `index.html` (también funciona sin servidor).

## Editar el contenido

- Teléfono de contacto: busca `CONTACT` al inicio de `js/data.js`.
- Cada pantalla es una entrada de `S` (`S.home`, `S["g-jam"]`…). Los tipos son `menu`, `cards`, `guide`, `panel`, `done` y `help`.
- Dentro de una guía, `blocks` admite: `p`, `warn`, `tip`, `steps`, `list`, `cases`, `acc` y `btns`.
- Texto: `**negrita**` y enlaces internos con `[[id-de-pantalla|texto]]`.
- Estados de luz en `lamps`: `on`, `blink`, `slow`, `fast`, `alt`.
- Cada guía lleva `src` con las páginas de la Guía del usuario de las que sale.

## Publicar

1. Subir a GitHub (repositorio nuevo, rama `main`).
2. En vercel.com: **Add New > Project**, importa el repositorio. Framework: **Other**. Sin comando de build; carpeta de salida: la raíz.
3. Cada `git push` a `main` vuelve a publicar.

## Origen del contenido

Guía del usuario Epson XP-2200 (NPD6908-02), reescrita en español. Ilustraciones propias. Guía no oficial.
