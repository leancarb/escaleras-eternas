let canvas;
let ctx;

//Variables para las imagenes
let imgObjetos = new Image ();
let imgEnemigos = new Image ();

//los objetos
let Objetos = new Elemento(imgObjetos,20,450,200,80,"objetos");
let Enemigos = new Elemento(imgEnemigos,20,550,300,100,"enemigos");

function Elemento(img,x,y,ancho,alto,tipo){ //img,x,y,ancho,alto,tipo
  //atributos
  this.img=img;
  this.x=x;
  this.y=y;
  this.ancho=ancho;
  this.alto=alto;
  this.tipo=tipo;
  
  //metodos
    this.dibujar=function(){
        ctx.drawImage(this.img,this.x,this.y,this.ancho,this.alto);//img,x,y,ancho,alto
    }
}

// Crear y cargar la fuente
const fuente = new FontFace('ByteBounce', "url('font/ByteBounce.ttf') format('truetype')");

window.onload = function() {
  //Seleccionamos el canvas ya definido en html y dibujamos fondo
  canvas = document.getElementById("canvas");
  canvas.style.backgroundImage = "url('img/escalerasblur.png')";
  canvas.style.backgroundSize = "cover"; 
  canvas.style.backgroundPosition = "center";
  
  //Contexto
  ctx = canvas.getContext('2d');

  //Cargamos la fuente
  fuente.load().then(function() {
    document.fonts.add(fuente);

    //Cargar imágenes y dibujar todo
    imgObjetos.src = "img/objetos.png";
    imgEnemigos.src = "img/enemigos.png";

    //Esperar a que todas carguen antes de dibujar
    imgEnemigos.onload = function() {
      dibujarMenu();
    };
  });
};

// Función para dibujar el menú
function dibujarMenu() {
  // Características generales
  ctx.lineWidth = 6;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";

  // Título
  ctx.textAlign = "center";
  ctx.font = "75px ByteBounce";
  ctx.strokeText("¿Cómo jugar?", 300, 70); //tipo de texto, ubicacion en x,ubicacion y
  ctx.fillText("¿Cómo jugar?", 300, 70);

  // Instructivo
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

  // Controles
  ctx.textAlign = "right";
  ctx.font = "65px ByteBounce";
  ctx.strokeText("Controles", 245, 280);
  ctx.fillText("Controles", 245, 280);

  ctx.font = "35px ByteBounce";
  ctx.strokeText("A o flecha izquierda - mover izquierda", 550, 320);
  ctx.fillText("A o flecha izquierda - mover izquierda", 550, 320);
  ctx.strokeText("D o flecha derecha - mover derecha", 523, 345);
  ctx.fillText("D o flecha derecha - mover derecha", 523, 345);
  ctx.strokeText("W o flecha arriba - correr", 385, 370);
  ctx.fillText("W o flecha arriba - correr", 385, 370);

  // Elementos
  ctx.textAlign = "right";
  ctx.font = "65px ByteBounce";
  ctx.strokeText("Elementos", 260, 450);
  ctx.fillText("Elementos", 260, 450);

  // Dibujar imágenes
  Objetos.dibujar();
  Enemigos.dibujar();

  // Textos de elementos
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

  // Botón Jugar
  ctx.textAlign = "right";
  ctx.font = "70px ByteBounce";
  ctx.strokeText("Jugar", 360, 790);
  ctx.fillText("Jugar", 360, 790);
}

