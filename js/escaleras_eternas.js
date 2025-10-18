// componentes fundamentales para que consuma el .html
// inicializa el juego, crea al personaje y toma input del usuario

//1. Variables globales
// referencia al elemento canvas de html
let canvas; 
// contexto para operaciones de dibujo en 2d
let ctx; 
let puntos = 0; 
let vidas = 6;
// crea imagen objeto para cargar y guardar la img del pj
let imgPersonaje = new Image(); 

// Objetos
// instanciacion del nuevo personaje
// posicion en 175,650
// ancho y alto de 128x128 pixeles
// esta linkeado a la imgPersonaje 
let personaje1 = new personaje(175, 650, 128, 128, imgPersonaje); 

window.onload = () => {
  // Seleccionar canvas
  canvas = document.getElementById("canvas");

  // Definir Contexto
  ctx = canvas.getContext("2d");
  canvas.style.backgroundImage = "url('img/fondo.jpeg')";

  // Texto
  ctx.font = "16px 'Pixelify Sans', sans-serif";
  ctx.fillText("puntos: " + puntos, 20, 30);
  ctx.fillText("tiempo: " + vidas, 20, 50);

  // Ubicacion personaje
  imgPersonaje.src = "img/dis_espalda.png";
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

// funcion constructora del personaje
function personaje(x, y, ancho, alto, img) {
  // Atributos
  // almacena la posicion del personaje
  this.x = x;
  this.y = y;
  // dimensiones del personaje
  this.ancho = ancho;
  this.alto = alto;
  // imagen del persoanje
  this.img = img;

  // Metodos
  // mueve a la izquierda y derecha
  this.left = function () {
    this.x -= 15;
  };
  this.right = function () {
    this.x += 15;
  };
  // dibuja la imagen del personaje en el canvas
  this.dibujar = function () {
    //drawImage funcion propia de js que recibe estos parametros
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

