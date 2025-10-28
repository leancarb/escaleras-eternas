let canvas;
let ctx;

//Variables para las imagenes
let imgIzquierda = new Image();
let imgDerecha = new Image();
let imgCorrer = new Image();
let imgObjetos = new Image();
let imgEnemigos = new Image();

//los objetos
let Izquierda = new Elemento(imgIzquierda,20,270,100,50,"control");
let Derecha = new Elemento(imgDerecha,20,320,100,50,"control");
let Correr = new Elemento(imgCorrer,20,370,100,50,"control");
let Objetos = new Elemento(imgObjetos,20,490,200,80,"objetos");
let Enemigos = new Elemento(imgEnemigos,20,570,300,100,"enemigos");

let hoverJugar = false;

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

window.onload = function() {
  canvas = document.getElementById("canvas");
  canvas.style.backgroundImage = "url('img/escalerasblur.png')";
  canvas.style.backgroundSize = "cover"; 
  canvas.style.backgroundPosition = "center";
  
  ctx = canvas.getContext('2d');

  fuente.load().then(function() {
    document.fonts.add(fuente);

    imgIzquierda.src = "img/izquierda.png";
    imgDerecha.src = "img/derecha.png";
    imgCorrer.src = "img/correr.png";
    imgObjetos.src = "img/objetos.png";
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
  ctx.font = "65px ByteBounce";
  ctx.strokeText("Objetivo", 210, 130);
  ctx.fillText("Objetivo", 210, 130);

  ctx.textAlign = "center";
  ctx.font = "40px ByteBounce";
  ctx.strokeText("Llega al 4to piso a tiempo", 300, 170);
  ctx.fillText("Llega al 4to piso a tiempo", 300, 170);
  ctx.strokeText("y suma la mayor cantidad de puntos", 300, 200);
  ctx.fillText("y suma la mayor cantidad de puntos", 300, 200);

  //Controles
  ctx.textAlign = "right";
  ctx.font = "65px ByteBounce";
  ctx.strokeText("Controles", 245, 260);
  ctx.fillText("Controles", 245, 260);

  ctx.font = "35px ByteBounce";
  ctx.strokeText("- mover izquierda", 360, 310);
  ctx.fillText("- mover izquierda", 360, 310);

  ctx.strokeText("- mover derecha", 345, 360);
  ctx.fillText("- mover derecha", 345, 360);

  ctx.strokeText("- correr", 232, 410);
  ctx.fillText("- correr", 232, 410);

  //Elementos
  ctx.textAlign = "right";
  ctx.font = "65px ByteBounce";
  ctx.strokeText("Elementos", 260, 480);
  ctx.fillText("Elementos", 260, 480);

  Izquierda.dibujar();
  Derecha.dibujar();
  Correr.dibujar();
  Objetos.dibujar();
  Enemigos.dibujar();

  ctx.textAlign = "left";
  ctx.font = "30px ByteBounce";
  ctx.strokeText("- 1 punto", Objetos.x + Objetos.ancho + 20, Objetos.y + 40);
  ctx.fillText("- 1 punto", Objetos.x + Objetos.ancho + 20, Objetos.y + 40);
  ctx.strokeText("+ 1 punto si esquiva", Objetos.x + Objetos.ancho + 20, Objetos.y + 65);
  ctx.fillText("+ 1 punto si esquiva", Objetos.x + Objetos.ancho + 20, Objetos.y + 65);
  ctx.strokeText("- 1 vida", Enemigos.x + Enemigos.ancho + 20, Enemigos.y + 50);
  ctx.fillText("- 1 vida", Enemigos.x + Enemigos.ancho + 20, Enemigos.y + 50);
  ctx.strokeText("+ 2 puntos si esquiva", Enemigos.x + Enemigos.ancho + 20, Enemigos.y + 80);
  ctx.fillText("+ 2 puntos si esquiva", Enemigos.x + Enemigos.ancho + 20, Enemigos.y + 80);

  // Botón "Jugar"
  ctx.textAlign = "right";
  ctx.font = "70px ByteBounce";
  ctx.fillStyle = hoverJugar ? "gray" : "white";
  ctx.strokeText("Jugar", 360, 790);
  ctx.fillText("Jugar", 360, 790);
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

  // Click en el título "¿Cómo jugar?"
  if (x > 80 && x < 520 && y > 20 && y < 90) {
    window.location.href = "inicio.html";
  }
}