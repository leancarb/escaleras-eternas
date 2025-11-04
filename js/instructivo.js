let canvas;
let ctx;

//Sonido
let sonidoFondo = new Audio ("aud/murmullo.wav");
sonidoFondo.loop = true;
sonidoFondo.volume = 0.4;
window.addEventListener("load", () => {
  sonidoFondo.play();
});

//Variables para las imagenes
let imgIzquierda = new Image();
let imgDerecha = new Image();
let imgCorrer = new Image();
let imgCafe = new Image();
let imgObjetos = new Image();
let imgEnemigos = new Image();

//los objetos
let Izquierda = new Elemento(imgIzquierda,20,290,100,50,"control"); //img,x,y,ancho,alto,tipo
let Derecha = new Elemento(imgDerecha,20,340,100,50,"control");
let Cafe = new Elemento(imgCafe,20,465,60,80,"objeto");
let Objetos = new Elemento(imgObjetos,30,550,150,60,"objetos");
let Enemigos = new Elemento(imgEnemigos,30,610,220,90,"enemigos")

let hoverJugar = false;

// Dibujo elementos
function Elemento(img,x,y,ancho,alto,tipo){
  this.img = img;
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.tipo = tipo;

  this.dibujar = function(){
    ctx.drawImage(this.img,this.x,this.y,this.ancho,this.alto);
  }
}

// Crear y cargar la fuente
const fuente = new FontFace('ByteBounce', "url('font/ByteBounce.ttf') format('truetype')");

// Mostrar imagen fondo en canvas
window.onload = function() {
  canvas = document.getElementById("canvas");
  canvas.style.backgroundImage = "url('img/escalerasblur.png')";
  canvas.style.backgroundSize = "cover"; 
  canvas.style.backgroundPosition = "center";
  ctx = canvas.getContext('2d');
  // Cargar fuente
  fuente.load().then(function() {
    document.fonts.add(fuente);
    // Cargar imagenes
    imgIzquierda.src = "img/izquierda.png";
    imgDerecha.src = "img/derecha.png";
    imgObjetos.src = "img/objetos.png";
    imgCafe.src = "img/cafe.png"; 
    imgEnemigos.src = "img/enemigos.png";

    imgEnemigos.onload = function() {
      dibujarMenu();
    };

    // Detectar hover
    canvas.addEventListener("mousemove", detectarHover);
    // Detectar click
    canvas.addEventListener("click", detectarClick);
  });
};

// Dibujo del menú
function dibujarMenu(hover = false) {
  hoverJugar = hover;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Caracteristicas generales
  ctx.lineWidth = 6;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";

  //Titulo
  ctx.textAlign = "center";
  ctx.font = "75px ByteBounce";
  ctx.strokeText("¿Cómo jugar?", 300, 70);
  ctx.fillText("¿Cómo jugar?", 300, 70);

  //Objetivo 
  ctx.textAlign = "right";
  ctx.font = "63px ByteBounce";
  ctx.strokeText("Objetivo", 210, 120);
  ctx.fillText("Objetivo", 210, 120);

  ctx.textAlign = "center";
  ctx.font = "37px ByteBounce";
  ctx.strokeText("Llegar a clase al 4to piso a tiempo", 300, 160);
  ctx.fillText("Llegar a clase al 4to piso a tiempo", 300, 160);
  ctx.strokeText("sin chocarte a alumnos de otras carreras", 300, 190);
  ctx.fillText("sin chocarte a alumnos de otras carreras", 300, 190);

  // Titulo "Controles"
  ctx.textAlign = "right";
  ctx.font = "63px ByteBounce";
  ctx.strokeText("Controles", 245, 270);
  ctx.fillText("Controles", 245, 270);
  // dibujar imagenes
  Izquierda.dibujar();
  Derecha.dibujar();
  // texto idicativo de controles
  ctx.font = "35px ByteBounce";
  ctx.strokeText("- mover izquierda",360,328);
  ctx.fillText("- mover izquierda",360,328);

  ctx.strokeText("- mover derecha",345,380);
  ctx.fillText("- mover derecha",345,380);

  // Titulo "Elementos"
  ctx.textAlign = "right";
  ctx.font = "63px ByteBounce";
  ctx.strokeText("Elementos", 260, 460);
  ctx.fillText("Elementos", 260, 460);
  // dibujar imagenes
  Cafe.dibujar();
  Objetos.dibujar();
  Enemigos.dibujar();
  // texto inficativo de elementos
  ctx.textAlign = "left";
  ctx.font = "30px ByteBounce";
  ctx.strokeText("+ 1 punto", Cafe.x + Cafe.ancho + 20, Cafe.y + 55);
  ctx.fillText("+ 1 punto", Cafe.x + Cafe.ancho + 20, Cafe.y + 55);

  ctx.textAlign = "left";
  ctx.font = "30px ByteBounce";
  ctx.strokeText("- 1 punto", Objetos.x + Objetos.ancho + 20, Objetos.y + 40);
  ctx.fillText("- 1 punto", Objetos.x + Objetos.ancho + 20, Objetos.y + 40);

  ctx.strokeText("- 1 vida", Enemigos.x + Enemigos.ancho + 20, Enemigos.y + 50);
  ctx.fillText("- 1 vida", Enemigos.x + Enemigos.ancho + 20, Enemigos.y + 50);
  ctx.strokeText("+ 2 puntos si esquiva", Enemigos.x + Enemigos.ancho + 20, Enemigos.y + 80);
  ctx.fillText("+ 2 puntos si esquiva", Enemigos.x + Enemigos.ancho + 20, Enemigos.y + 80);

  // Botón "Jugar"
  ctx.textAlign = "right";
  ctx.font = "70px ByteBounce";
  ctx.fillStyle = hoverJugar ? "gray" : "white";
  ctx.strokeText("Jugar", 360, 770);
  ctx.fillText("Jugar", 360, 770);
  ctx.fillStyle = "white";
}

// Hover
function detectarHover(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const dentroDeJugar = x > 200 && x < 520 && y > 740 && y < 800;
  dibujarMenu(dentroDeJugar);
}

// Clicks
function detectarClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Click en "Jugar"
  if (x > 200 && x < 520 && y > 740 && y < 800) {
    window.location.href = "escaleras_eternas.html";
  }

  // Click en "¿Cómo jugar?"
  if (x > 80 && x < 520 && y > 20 && y < 90) {
    window.location.href = "inicio.html";
  }
}