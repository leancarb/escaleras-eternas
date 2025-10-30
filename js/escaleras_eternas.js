let canvas;
let ctx;

// variables del juego
let puntos = 0;
let vidas = 5;
let piso = 0;
let velocidadCaida = 2;
let velocidadMovimiento = 50;
let margenX = 30;
let respawnMin = 40;
let respawnMax = 130;
let juegoActivo = true;
let ultimoAumento = 0;

// variables para las imagenes del personaje
let imgPersonaje = new Image();

// variables para las imagenes de obstaculos
let imgCarpeta = new Image();
let imgCutter = new Image();
let imgEscuadra = new Image();
let imgPintura = new Image();

// variables para las imagenes de enemigos
let imgGrafico = new Image();
let imgIndumentaria = new Image();
let imgPaisajismo = new Image();
let imgIndustrial = new Image();
let imgArquitectura = new Image();

// los objetos
let personajeUno = new Personaje(175, 580, 100, 100, imgPersonaje);
let obstaculoUno = new Elemento(200, 0, 80, 80, imgCarpeta, "obstaculo");
let enemigoUno = new Elemento(100, 0, 128, 128, imgGrafico, "enemigo");

function Elemento(x, y, ancho, alto, img, tipo) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.tipo = tipo;
  this.puntuado = false;

  // metodos
  this.dibujar = function () {
    ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
  };

  this.caer = function () {
    if (this.y < canvas.height + this.alto) {
      this.y += velocidadCaida;
    } else {
      this.sortear();
    }
  };

  this.sortear = function () {
    /* Math.floor(Math.random() * (max - min + 1))+ min */
    this.x =
      Math.floor(Math.random() * (canvas.width - this.ancho - margenX * 2)) +
      margenX;
    const extra =
      Math.floor(Math.random() * (respawnMax - respawnMin + 1)) + respawnMin;
    this.y = -this.alto - extra;

    this.puntuado = false;

    // cambiar imagen segun el piso
    if (this.tipo == "obstaculo") {
      if (piso == 0) {
        this.img = imgCarpeta;
      } else if (piso == 1) {
        this.img = imgCutter;
      } else if (piso == 2) {
        this.img = imgEscuadra;
      } else if (piso == 3) {
        this.img = imgPintura;
      } else if (piso >= 4) {
        this.img = imgPintura;
      }
    } else if (this.tipo == "enemigo") {
      if (piso == 0) {
        this.img = imgGrafico;
      } else if (piso == 1) {
        this.img = imgIndumentaria;
      } else if (piso == 2) {
        this.img = imgPaisajismo;
      } else if (piso == 3) {
        this.img = imgIndustrial;
      } else if (piso >= 4) {
        this.img = imgArquitectura;
      }
    }
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
        vidas = vidas - 2;
      }
      this.sortear();
      this.puntuado = false;
    }
    return estaColisionando;
  };

  this.evadir = function (colisione) {
    if (
      colisione == false &&
      this.y >= personajeUno.y + this.alto - 1 &&
      !this.puntuado
    ) {
      if (this.tipo == "obstaculo") {
        puntos += 1;
      } else if (this.tipo == "enemigo") {
        puntos += 2;
      }
      this.puntuado = true;

      // actualizar piso
      piso = Math.floor(puntos / 8);

      // aumentar velocidad cada 8 puntos
      if (Math.floor(puntos / 8) > ultimoAumento) {
        velocidadCaida += 1;
        ultimoAumento = Math.floor(puntos / 8);
      }
    }
  };
}

// funcion constructora del personaje
function Personaje(x, y, ancho, alto, img) {
  // Atributos
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.img = img;

  // Metodos
  this.left = function () {
    this.x -= velocidadMovimiento;
    if (canvas) {
      this.x = Math.max(0, Math.min(this.x, canvas.width - this.ancho));
    }
  };
  this.right = function () {
    this.x += velocidadMovimiento;
    if (canvas) {
      this.x = Math.max(0, Math.min(this.x, canvas.width - this.ancho));
    }
  };
  this.dibujar = function () {
    ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
  };
}

// crear y cargar la fuente
const fuente = new FontFace(
  "ByteBounce",
  "url('font/ByteBounce.ttf') format('truetype')"
);

window.onload = function () {
  // seleccionar canvas
  canvas = document.getElementById("canvas");
  canvas.style.backgroundImage = "url('img/fondoescaleras.png')";

  // definir contexto
  ctx = canvas.getContext("2d");

  // cargar la fuente
  fuente.load();
  document.fonts.add(fuente);
  document.fonts.ready;

  // cargar imagen del personaje
  imgPersonaje.src = "img/dis_espalda.png";

  // cargar imagenes de obstaculos
  imgCarpeta.src = "img/carpeta.png";
  imgCutter.src = "img/cutter.png";
  imgEscuadra.src = "img/escuadra.png";
  imgPintura.src = "img/pintura.png";

  // cargar imagenes de enemigos
  imgGrafico.src = "img/grafico.png";
  imgIndumentaria.src = "img/indumentaria.png";
  imgPaisajismo.src = "img/paisajismo.png";
  imgIndustrial.src = "img/industrial.png";
  imgArquitectura.src = "img/arquitectura.png";

  // iniciar el juego
  iniciarJuego();
};

function iniciarJuego() {
  obstaculoUno.sortear();
  enemigoUno.sortear();

  let posicionFondo = 0;
  setInterval(function () {
    posicionFondo += velocidadCaida;
    canvas.style.backgroundPositionY = posicionFondo + "px";

    if (vidas > 0 && juegoActivo) {
      obstaculoUno.caer();
      enemigoUno.caer();

      const colisionObstaculo = obstaculoUno.colisionar();
      obstaculoUno.evadir(colisionObstaculo);

      const colisionEnemigo = enemigoUno.colisionar();
      enemigoUno.evadir(colisionEnemigo);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      personajeUno.dibujar();
      obstaculoUno.dibujar();
      enemigoUno.dibujar();
      dibujarTexto();

      // verificar si llego al piso 5
      if (piso >= 5) {
        juegoActivo = false;
        mostrarMensajeFinal("Llegaste a tiempo!");
      }
    } else if (vidas <= 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      mostrarMensajeFinal("La clase ya empezó :(");
    } else if (!juegoActivo && piso >= 5) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      mostrarMensajeFinal("Llegaste a tiempo!");
    }
  }, 1000 / 60);
}

// dibujo del texto en pantalla
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

// mostrar mensaje final
function mostrarMensajeFinal(mensaje) {
  ctx.font = "50px ByteBounce";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.textAlign = "center";

  const x = canvas.width / 2;
  const y = canvas.height / 2;

  ctx.strokeText(mensaje, x, y);
  ctx.fillText(mensaje, x, y);

  ctx.textAlign = "left";
}

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "a":
    case "ArrowLeft":
      personajeUno.left();
      break;
    case "d":
    case "ArrowRight":
      personajeUno.right();
      break;
  }
});
