let canvas; 
let ctx; 

// variables del juego
let puntos = 0; 
let vidas = 6;

// variables para las imagenes
let imgPersonaje = new Image(); 
let imgCarpeta = new Image();

// los objetos
let personajeUno = new Personaje(175, 650, 128, 128, imgPersonaje); 
let carpetaUno = new Elemento(200, 0, 64, 64, imgCarpeta, "obstaculo");
// let arquitecturaUno = new Elemento(100, 0, 64, 64, imgCarpeta, "enemigo");

function Elemento(x,y,ancho,alto,img,tipo){
    this.img=img;
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.alto=alto;
    this.tipo=tipo;
    this.puntuado = false;

    // metodos
    this.dibujar=function(){
        ctx.drawImage(this.img,this.x,this.y,this.ancho,this.alto);
    }

    this.caer=function(){
        if(this.y<850){
            this.y+=3;
        }else{
            this.sortear();
        }
    }

    this.sortear=function(){
        /*
            Math.floor(Math.random() * (max - min + 1))+ min;
        */
        this.x=Math.floor(Math.random() * (450 - 30 + 1))+ 30;
        this.y=Math.floor(Math.random() * ((-40) - (-130) + 1))+ (-130);
    }


    this.colisionar=function(){ 
        const estaColisionando = (
            (this.x > personajeUno.x - this.ancho) 
            && (this.x < personajeUno.x + personajeUno.ancho)
            && (this.y > personajeUno.y - this.alto)
            && (this.y < personajeUno.y + personajeUno.alto)
        );
        {
          if (estaColisionando){
              if(this.tipo=="obstaculo"){
                  vidas--;
              }else if(this.tipo=="enemigo"){
                  vidas=vidas-2;
              }
            this.sortear();
            this.puntuado = false;
          }
          return estaColisionando; // para usar en this.evadir()
        }
    }

    this.evadir = function(){
      const colisione = this.colisionar();
      if (
          (colisione == false) 
          && (this.y >= personajeUno.y + this.alto - 1)
      ) {
          puntos++;
      }
    }
}

// funcion constructora del personaje
function Personaje(x, y, ancho, alto, img) {
  // Atributos
  // almacena la posicion del personaje
  this.x=x;
  this.y=y;
  // dimensiones del personaje
  this.ancho=ancho;
  this.alto=alto;
  // imagen del persoanje
  this.img=img;

  // Metodos
  // mueve a la izquierda y derecha
  this.left = function () {
    this.x -= 18;
  };
  this.right = function () {
    this.x += 18;
  };
  // dibuja la imagen del personaje en el canvas
  this.dibujar = function () {
    //drawImage funcion propia de js que recibe estos parametros
    ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
  };
}

window.onload = function() {
  // Seleccionar canvas
  canvas = document.getElementById("canvas");
  canvas.style.backgroundImage = "url('img/bg450x800.jpeg')";

  // Definir Contexto
  ctx = canvas.getContext("2d");


  // Texto
  dibujarTexto();

  // Dibujar personaje
  imgPersonaje.src = "img/dis_espalda.png";
  imgPersonaje.onload = function () {
    personajeUno.dibujar();
  };

  // Dibujar carpeta
  imgCarpeta.src = "img/carpeta.png";
  imgCarpeta.onload = function () {
    carpetaUno.dibujar();
  }


  setInterval(function(){ 
    if(vidas>0){
        carpetaUno.caer();

        carpetaUno.colisionar();
        carpetaUno.evadir();


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personajeUno.dibujar();
        carpetaUno.dibujar();
        dibujarTexto();
      
    }
  },1000/24);
};

function dibujarTexto(){
    ctx.font = "16px 'ByteBounce', sans-serif";
    ctx.fillText("puntos: " + puntos, 20, 30);
    ctx.fillText("vidas: " + vidas, 20, 50);
}

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "a":
      personajeUno.left();
      break;
    case "ArrowLeft":
      personajeUno.left();
      break;
    case "d":
      personajeUno.right();
      break;
    case "ArrowRight":
      personajeUno.right();
      break;
  }
});

