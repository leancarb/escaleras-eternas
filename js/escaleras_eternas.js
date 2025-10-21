<<<<<<< Updated upstream
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
=======
let canvas; 
let ctx; 

// variables del juego
let puntos = 0; 
let vidas = 5;

// variables para las imágenes
let imgPersonaje = new Image(); 
let imgCarpeta = new Image();

// los objetos
let personajeUno = new Personaje(75, 650, 128, 128, imgPersonaje); 
let carpetaUno = new Elemento(200, 0, 64, 64, imgCarpeta,"obstaculo");


// Función constructora de elementos
function Elemento(x, y, ancho, alto, img, tipo) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.tipo = tipo;
  this.puntuado = false;

  this.dibujar = function () {
    ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
  };

  this.caer = function () {
    if (this.y < 850) {
      this.y += 3;
    } else {
      this.sortear();
    }
  };

  this.sortear = function () {
    this.x = Math.floor(Math.random() * (450 - 30 + 1)) + 30;
    this.y = Math.floor(Math.random() * ((-40) - (-130) + 1)) + (-130);
  };

  this.colisionar = function () {
    const estaColisionando =
      this.x > personajeUno.x - this.ancho &&
      this.x < personajeUno.x + personajeUno.ancho &&
      this.y > personajeUno.y - this.alto &&
      this.y < personajeUno.y + personajeUno.alto;

    if (estaColisionando) {
      if (this.tipo == "obstaculo") {
        vidas--;
      } else if (this.tipo == "enemigo") {
        vidas -= 2;
      }
      this.sortear();
      this.puntuado = false;
    }
    return estaColisionando;
  };

  this.evadir = function () {
    const colisione = this.colisionar();
    if (colisione == false && this.y >= personajeUno.y + this.alto - 1) {
      puntos++;
    }
  };
}

// Función constructora del personaje
function Personaje(x, y, ancho, alto, img) {
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.img = img;

  this.left = function () {
    this.x -= 18;
  };
  this.right = function () {
    this.x += 18;
  };
  this.dibujar = function () {
    ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
  };
}

// Crear y cargar la fuente
const fuente = new FontFace('ByteBounce', "url('font/ByteBounce.ttf') format('truetype')");

window.onload = async function () {
  // Seleccionar canvas
  canvas = document.getElementById("canvas");
  canvas.style.backgroundImage = "url('img/escaleraszoom.jpeg')";
  canvas.style.backgroundSize = "cover";
  canvas.style.backgroundPosition = "center";
>>>>>>> Stashed changes

  // Definir contexto
  ctx = canvas.getContext("2d");
<<<<<<< Updated upstream
  canvas.style.backgroundImage = "url('img/fondo.jpeg')";

  // Texto
  ctx.font = "16px 'Pixelify Sans', sans-serif";
  ctx.fillText("puntos: " + puntos, 20, 30);
  ctx.fillText("tiempo: " + vidas, 20, 50);
=======

  // Cargar la fuente y esperar a que esté lista
  await fuente.load();
  document.fonts.add(fuente);
  await document.fonts.ready;

  // Iniciar el juego
  iniciarJuego();
};

// Inicialización del juego
function iniciarJuego() {
  dibujarTexto();
>>>>>>> Stashed changes

  // Ubicacion personaje
  imgPersonaje.src = "img/dis_espalda.png";
  imgPersonaje.onload = function () {
    personaje1.dibujar();
  };
<<<<<<< Updated upstream
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
=======

  // Dibujar carpeta
  imgCarpeta.src = "img/carpeta.png";
  imgCarpeta.onload = function () {
    carpetaUno.dibujar();
  };

  // Bucle principal
  setInterval(function () {
    if (vidas > 0) {
      carpetaUno.caer();
      carpetaUno.colisionar();
      carpetaUno.evadir();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      personajeUno.dibujar();
      carpetaUno.dibujar();
      dibujarTexto();
    }
  }, 1000 / 24);
>>>>>>> Stashed changes
}

// Dibujo del texto en pantalla
function dibujarTexto() {
  ctx.font = "35px ByteBounce"; // fuente personalizada
  ctx.fillStyle = "white";      // color del texto
  ctx.strokeStyle = "black";    // borde del texto
  ctx.lineWidth = 4;
  // Puntos
  ctx.strokeText("Puntos: " + puntos, 20, 40);
  ctx.fillText("Puntos: " + puntos, 20, 40);
  // Vidas
  ctx.strokeText("Vidas: " + vidas, 480, 40);
  ctx.fillText("Vidas: " + vidas, 480, 40);
}

// Controles del jugador
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "a":
<<<<<<< Updated upstream
      personaje1.left();
      break;
=======
>>>>>>> Stashed changes
    case "ArrowLeft":
      personaje1.left();
      break;
    case "d":
<<<<<<< Updated upstream
      personaje1.right();
      break;
=======
>>>>>>> Stashed changes
    case "ArrowRight":
      personaje1.right();
      break;
  }
<<<<<<< Updated upstream
  limpiar();
});
=======
});
>>>>>>> Stashed changes
