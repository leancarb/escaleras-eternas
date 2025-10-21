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

function Elemento(x,y,ancho,alto,img,tipo){ //img,x,y,ancho, alto,tipo
    //atributos
    this.img=img;
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.alto=alto;
    this.tipo=tipo;
    this.puntuado=false

    //metodos
    this.dibujar=function(){
        ctx.drawImage(this.img,this.x,this.y,this.ancho,this.alto);//img,x,y,ancho,alto
    }

    this.caer=function(){
        if(this.y<850){
            this.y+=3;
        }else{
            this.sortear();
        }
    }

    this.sortear=function(){
        //cuando los elementos se vayan de pantalla, los vamos a reubicar
        /*
            Math.floor(Math.random() * (max - min + 1))+ min;
        */
        //x entre 30 (minimo) y 450 (maximo)
        this.x=Math.floor(Math.random() * (450 - 30 + 1))+ 30;

        //y entre -40 (maximo) y -130 (minimo)
        this.y=Math.floor(Math.random() * ((-40) - (-130) + 1))+ (-130);
    }

    this.colisionar=function(){
        //guardo resultado de expresion booleana en constante para usar en metodo evadir
        const estaColisionando = (
            (this.x > personajeUno.x - this.ancho) 
            && (this.x < personajeUno.x + personajeUno.ancho)
            && (this.y > personajeUno.y - this.alto)
            && (this.y < personajeUno.y + personajeUno.alto)
        );
        
        {
            //console.log("colisioné");
          if (estaColisionando){
              if(this.tipo=="obstaculo"){
                  vidas--;
              }else if(this.tipo=="enemigo"){
                  vidas=vidas-2;
              }
            this.sortear();
            this.puntuado = false;
        }

        // retornamos valor estaColisionando para usar en metodo evadir
        return estaColisionando;
    }
  }

  this.evadir = function(){
    // guardo el valor booleano retornado de this.colisionar
    const colisione = this.colisionar();

    // verificio si colisione, si no gano puntos
    if (
        (colisione == false) 
        && (this.y >= personajeUno.y + 1) 
        && (this.puntuado == false)
    ) {
        puntos++;
        this.puntuado = true;
    }
    console.log(this.puntuado)
}
    // this.evadir=function(){
    //   if(
    //     (this.colisionar == false)
    //     && (this.y >= personajeUno.y+1)
    //   ){
    //     puntos++;
    //   }
    // }

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
    ctx.font = "16px 'Pixelify Sans', sans-serif";
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

