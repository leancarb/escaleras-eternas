//1. Variables
let canvas;
let ctx;
let puntos = 0;
let vidas = 6;
let imgPersonaje = new Image();

// Objetos
let personaje1 = new personaje(175, 650, 128, 128, imgPersonaje);

window.onload = () => {
  // Seleccionar canvas
  canvas = document.getElementById("canvas");

  // Definir Contexto
  ctx = canvas.getContext("2d");
  canvas.style.backgroundImage = "url('images/bg450x800.jpeg')";

  // Texto
  ctx.font = "16px 'Pixelify Sans', sans-serif";
  ctx.fillText("puntos: " + puntos, 20, 30);
  ctx.fillText("tiempo: " + vidas, 20, 50);

  // Ubicacion personaje
  imgPersonaje.src = "images/dis_espalda.png";
  imgPersonaje.onload = function () {
    personaje1.dibujar();
  };
};

function limpiar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "16px 'Pixelify Sans', sans-serif";
  ctx.fillText("puntos: " + puntos, 20, 30);
  ctx.fillText("tiempo: " + vidas, 20, 50);

  // Redibujar
  personaje1.dibujar();
}

function personaje(x, y, ancho, alto, img) {
  // Atributos
  this.x = x;
  this.y = y;

  this.ancho = ancho;
  this.alto = alto;
  this.img = img;

  // Metodos
  this.left = function () {
    this.x -= 15;
  };
  this.right = function () {
    this.x += 15;
  };
  this.dibujar = function () {
    ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
  };
}

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "a":
      personaje1.left();
      break;
    case "ArrowLeft":
      personaje1.left();
      break;
    case "d":
      personaje1.right();
      break;
    case "ArrowRight":
      personaje1.right();
      break;
  }
  limpiar();
});
