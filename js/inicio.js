let canvas;
let ctx;
let fuente = new FontFace('ByteBounce', "url('font/ByteBounce.ttf') format('truetype')");

// Definimos áreas de botones
const botones = [
  { texto: "JUGAR", x: 300, y: 500, width: 300, height: 70, enlace: "escaleras_eternas.html" },
  { texto: "¿CÓMO JUGAR?", x: 300, y: 600, width: 400, height: 70, enlace: "instructivo.html" }
];

window.onload = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // Fondo 
 canvas.style.backgroundImage = "url('img/escaleras.png')";
 canvas.style.backgroundSize = "cover";
 canvas.style.backgroundPosition = "center";

  // Cargar fuente
  fuente.load().then(() => {
    document.fonts.add(fuente);
    dibujarMenu();
  });

  // Eventos
  canvas.addEventListener("mousemove", manejarHover);
  canvas.addEventListener("click", manejarClick);
};

function dibujarMenu(hoverIndice = -1) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Configuración general
  ctx.textAlign = "center";
  ctx.lineWidth = 6;

  // Título
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.font = "bold 75px ByteBounce";
  ctx.strokeText("Escaleras eternas", 300, 200);
  ctx.fillText("Escaleras eternas", 300, 200);

  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.font = "bold 75px ByteBounce";
  ctx.strokeText("FADU", 300, 250);
  ctx.fillText("FADU", 300, 250);

  // Botones
  botones.forEach((boton, indice) => {
    if (indice === hoverIndice) {
      ctx.fillStyle = "gray"; //hover
    } else {
      ctx.fillStyle = "white";
    }
    ctx.strokeStyle = "black";
    ctx.font = "bold 60px ByteBounce";

    ctx.strokeText(boton.texto, boton.x, boton.y);
    ctx.fillText(boton.texto, boton.x, boton.y);
  });
}

function manejarHover(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let hoverIndice = -1;
  botones.forEach((boton, indice) => {
    if (
      x > boton.x - boton.width / 2 &&
      x < boton.x + boton.width / 2 &&
      y > boton.y - boton.height / 2 &&
      y < boton.y + boton.height / 2
    ) {
      hoverIndice = indice;
    }
  });

  dibujarMenu(hoverIndice);
}

function manejarClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  botones.forEach((boton) => {
    if (
      x > boton.x - boton.width / 2 &&
      x < boton.x + boton.width / 2 &&
      y > boton.y - boton.height / 2 &&
      y < boton.y + boton.height / 2
    ) {
      window.location.href = boton.enlace;
    }
  });
}
