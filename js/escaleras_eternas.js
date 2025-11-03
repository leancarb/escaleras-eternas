let canvas;
let ctx;

// variables del juego
let puntos = 0;
let vidas = 5;
let piso = 0;
let juegoActivo = true;

// control de movimiento
let teclaIzquierda = false;
let teclaDerecha = false;

// Variables para las imagenes
//personaje
let imgPersonaje = new Image();

//cafe
let imgCafe = new Image();

//obstaculos
let imgCarpeta = new Image();
let imgEscuadra = new Image();
let imgCutter = new Image();
let imgPintura = new Image();

//enemigos
let imgArquitectura = new Image();
let imgIndustrial = new Image();
let imgGrafico = new Image();
let imgIndumentaria = new Image();
let imgPaisajismo = new Image();
let imgFondo = new Image();

// imagenes de ganar y perder
let imgGano = new Image();
let imgPerdio = new Image();

// personaje con sprite
let personaje = new Personaje(175, 580, 100, 100, imgPersonaje);

//cafe
let cafe = new Obstaculo(200, -200, 56, 80, imgCafe, "cafe");

//obstaculos
let carpeta = new Obstaculo(200, -400, 57, 80, imgCarpeta, "obstaculo");
let escuadra = new Obstaculo(200, -600, 79, 80, imgEscuadra, "obstaculo");
let cutter = new Obstaculo(200, -800, 80, 59, imgCutter, "obstaculo");
let pintura = new Obstaculo(200, -1000, 80, 80, imgPintura, "obstaculo");

// enemigos con sprite
let enemigoUno = new Enemigo(50, -300, 128, 128, imgArquitectura, "enemigo");
let enemigoDos = new Enemigo(200, -700, 128, 128, imgGrafico, "enemigo");
let enemigoTres = new Enemigo(100, -900, 128, 128, imgIndumentaria, "enemigo");
let enemigoCuatro = new Enemigo(250, -1200, 128, 128, imgPaisajismo, "enemigo");

// variables para animacion de sprites
let spriteColumna = 0;
let columnasTotales = 4; // cantidad de frames horizontales en el sprite
let animacionVelocidad = 4;
let contadorFrames = 0;

// fondo en movimiento
let posFondo = 0;
let velocidadFondo = 3;

// Funcion de elementos (objetos que caen)
function Obstaculo(x, y, ancho, alto, img, tipo) {
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
    if (this.y < 850) this.y += 6;
    else this.sortear();
  };

  this.sortear = function () {
    this.x =
      Math.floor(Math.random() * (canvas.width - this.ancho - 30 * 2)) + 30;
    this.y = Math.floor(Math.random() * (-50 - -600 + 1)) + -600;
    this.puntuado = false;
  };

  this.colisionar = function () {
    const estaColisionando =
      this.x < personaje.x + personaje.ancho &&
      this.x + this.ancho > personaje.x &&
      this.y < personaje.y + personaje.alto &&
      this.y + this.alto > personaje.y;

    if (estaColisionando) {
      if (this.tipo === "cafe") {
        puntos += 1; // el café suma
        actualizarPiso(); // ver si subi de piso
      } else {
        puntos -= 1; // otros objetos restan
        if (puntos < 0) puntos = 0; // no baja de 0
      }
      this.sortear();
    }
    return estaColisionando;
  };
}

// Funcion del personaje principal (sprite animado)
function Personaje(x, y, ancho, alto, img) {
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.img = img;

  this.mover = function () {
    if (teclaIzquierda) {
      this.x -= 10;
      if (this.x < 0) this.x = 0;
    }
    if (teclaDerecha) {
      this.x += 10;
      if (this.x + this.ancho > canvas.width)
        this.x = canvas.width - this.ancho;
    }
  };

  this.dibujar = function () {
    contadorFrames++;
    if (contadorFrames >= animacionVelocidad) {
      spriteColumna = (spriteColumna + 1) % columnasTotales;
      contadorFrames = 0;
    }

    const frameAncho = this.img.width / columnasTotales;
    const frameAlto = this.img.height;

    ctx.drawImage(
      this.img,
      spriteColumna * frameAncho,
      0,
      frameAncho,
      frameAlto,
      this.x,
      this.y,
      this.ancho,
      this.alto
    );
  };
}

// Funcion de enemigos (sprite animado)
function Enemigo(x, y, ancho, alto, img) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.puntuado = false;
  this.spriteColumna = 0;
  this.columnasTotales = 4;
  this.frameCount = 0;
  this.animacionVelocidad = 6;

  this.caer = function () {
    if (this.y < 850) this.y += 5;
    else this.sortear();
  };

  this.sortear = function () {
    this.x =
      Math.floor(Math.random() * (canvas.width - this.ancho - 30 * 2)) + 30;
    this.y = Math.floor(Math.random() * (-100 - -700 + 1)) + -700;
    this.puntuado = false;
  };

  this.colisionar = function () {
    const colision =
      this.x < personaje.x + personaje.ancho &&
      this.x + this.ancho > personaje.x &&
      this.y < personaje.y + personaje.alto &&
      this.y + this.alto > personaje.y;

    if (colision) {
      vidas -= 1; // al chocar resta vida
      this.sortear();
      this.puntuado = true;
    }
    return colision;
  };

  // funcion para cuando esquivo al enemigo
  this.evadir = function () {
    // si el enemigo paso por abajo del personaje y no lo toque
    if (this.puntuado == false && this.y > personaje.y + personaje.alto) {
      puntos = puntos + 2; // sumo 2 puntos
      this.puntuado = true; // marco que ya lo conte
      actualizarPiso(); // ver si subi de piso
    }
  };

  this.dibujar = function () {
    this.frameCount++;
    if (this.frameCount >= this.animacionVelocidad) {
      this.spriteColumna = (this.spriteColumna + 1) % this.columnasTotales;
      this.frameCount = 0;
    }

    const frameAncho = this.img.width / this.columnasTotales;
    const frameAlto = this.img.height;

    ctx.drawImage(
      this.img,
      this.spriteColumna * frameAncho,
      0,
      frameAncho,
      frameAlto,
      this.x,
      this.y,
      this.ancho,
      this.alto
    );
  };
}

// funcion para actualizar el piso cada 8 puntos
function actualizarPiso() {
  piso = Math.floor(puntos / 8);
}

/* INICIO DEL JUEGO */
const fuente = new FontFace(
  "ByteBounce",
  "url('font/ByteBounce.ttf') format('truetype')"
);

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.setAttribute("tabindex", "0");
  canvas.focus();

  fuente.load();
  document.fonts.add(fuente);
  document.fonts.ready;

  imgFondo.src = "img/fondoescaleras.png";
  imgCafe.src = "img/cafe.png";
  imgCarpeta.src = "img/carpeta.png";
  imgEscuadra.src = "img/escuadra.png";
  imgCutter.src = "img/cutter.png";
  imgPintura.src = "img/pintura.png";
  imgArquitectura.src = "img/arquitecturasprite.png";
  imgGrafico.src = "img/graficosprite.png";
  imgIndumentaria.src = "img/indumentariasprite.png";
  imgPaisajismo.src = "img/paisajismosprite.png";
  imgPersonaje.src = "img/dissprite.png";
  imgGano.src = "img/gano.png";
  imgPerdio.src = "img/perdio.png";

  imgPersonaje.onload = function () {
    iniciarJuego();
  };
};

function moverFondo() {
  posFondo += velocidadFondo;
  ctx.drawImage(imgFondo, 0, posFondo, canvas.width, canvas.height);
  ctx.drawImage(
    imgFondo,
    0,
    posFondo - canvas.height,
    canvas.width,
    canvas.height
  );
  if (posFondo >= canvas.height) posFondo = 0;
}

function iniciarJuego() {
  setInterval(function () {
    if (vidas > 0 && juegoActivo) {
      personaje.mover();

      //Caen
      cafe.caer();
      carpeta.caer();
      escuadra.caer();
      cutter.caer();
      pintura.caer();
      enemigoUno.caer();
      enemigoDos.caer();
      enemigoTres.caer();
      enemigoCuatro.caer();

      //Colision
      cafe.colisionar();
      carpeta.colisionar();
      escuadra.colisionar();
      cutter.colisionar();
      pintura.colisionar();
      enemigoUno.colisionar();
      enemigoDos.colisionar();
      enemigoTres.colisionar();
      enemigoCuatro.colisionar();

      // ver si esquive enemigos
      enemigoUno.evadir();
      enemigoDos.evadir();
      enemigoTres.evadir();
      enemigoCuatro.evadir();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      moverFondo();
      personaje.dibujar();
      cafe.dibujar();
      carpeta.dibujar();
      escuadra.dibujar();
      cutter.dibujar();
      pintura.dibujar();
      enemigoUno.dibujar();
      enemigoDos.dibujar();
      enemigoTres.dibujar();
      enemigoCuatro.dibujar();
      dibujarTexto();

      // ver si llego al piso 5
      if (piso >= 5) {
        juegoActivo = false;
        mostrarGano();
      }
    } else if (vidas <= 0) {
      mostrarPerdio();
    }
  }, 1000 / 24);
}

function dibujarTexto() {
  ctx.font = "35px ByteBounce";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;

  // puntos
  ctx.strokeText("Puntos: " + puntos, 20, 40);
  ctx.fillText("Puntos: " + puntos, 20, 40);

  // piso en el medio
  let pisoMostrar = piso;
  if (pisoMostrar > 4) {
    pisoMostrar = 4;
  }
  const textoPiso = "Piso: " + pisoMostrar;
  const anchoPiso = ctx.measureText(textoPiso).width;
  const xPiso = (canvas.width - anchoPiso) / 2;
  ctx.strokeText(textoPiso, xPiso, 40);
  ctx.fillText(textoPiso, xPiso, 40);

  // vidas
  ctx.strokeText("Vidas: " + vidas, 480, 40);
  ctx.fillText("Vidas: " + vidas, 480, 40);
}

// pantalla cuando gana
function mostrarGano() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dibujar imagen de gano
  ctx.drawImage(imgGano, 0, 0, canvas.width, canvas.height);

  // dibujar el texto encima
  ctx.font = "50px ByteBounce";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.textAlign = "center";
  const x = canvas.width / 2;
  const y = 700;
  ctx.strokeText("llegaste a tiempo! :D", x, y);
  ctx.fillText("llegaste a tiempo! :D", x, y);
  ctx.textAlign = "left";
}

// pantalla cuando pierde
function mostrarPerdio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dibujar imagen de perdio
  ctx.drawImage(imgPerdio, 0, 0, canvas.width, canvas.height);

  // dibujar el texto encima
  ctx.font = "50px ByteBounce";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.textAlign = "center";
  const x = canvas.width / 2;
  const y = 700;
  ctx.strokeText("la clase ya empezó :(", x, y);
  ctx.fillText("la clase ya empezó :(", x, y);
  ctx.textAlign = "left";
}

// Movimiento del personaje
document.addEventListener("keydown", function (e) {
  if (e.key === "a" || e.key === "ArrowLeft") teclaIzquierda = true;
  if (e.key === "d" || e.key === "ArrowRight") teclaDerecha = true;
});

document.addEventListener("keyup", function (e) {
  if (e.key === "a" || e.key === "ArrowLeft") teclaIzquierda = false;
  if (e.key === "d" || e.key === "ArrowRight") teclaDerecha = false;
});
