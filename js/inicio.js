let canvas;
let ctx;
let fuente = new FontFace('ByteBounce', "url('font/ByteBounce.ttf') format('truetype')");
// Esperar a que cargue la fuente
document.fonts.add(fuente);
fuente.load().then(dibujar);

window.onload=function(){
  //Seleccionamos el canvas ya definido en html
  canvas=document.getElementById("canvas");
  //Agregamos el fondo
  canvas.style.backgroundImage = "url('img/escaleras.png')";
  canvas.style.backgroundSize = "cover"; // ajusta la imagen al tamaño del canvas
  canvas.style.backgroundPosition = "center";
  //Contexto
  ctx=canvas.getContext('2d');
  //Cargamos la fuente
  fuente.load().then(function() {
    document.fonts.add(fuente);
    dibujar();
  });
};

//Dibujamos los textos
function dibujar(){
  // Configuración general
  ctx.textAlign = "center";
  ctx.lineWidth = 6;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";

  // Título
  ctx.font = "bold 75px ByteBounce";
  ctx.strokeText("Escaleras eternas", 300, 200);
  ctx.fillText("Escaleras eternas", 300, 200);

  // Subtítulo
  ctx.font = "bold 75px ByteBounce";
  ctx.strokeText("FADU", 300, 250);
  ctx.fillText("FADU", 300, 250);

  // Botón JUGAR
  ctx.font = "bold 60px ByteBounce";
  ctx.strokeText("JUGAR", 300, 500);
  ctx.fillText("JUGAR", 300, 500);

  // Botón ¿CÓMO JUGAR?
  ctx.font = "bold 40px ByteBounce";
  ctx.strokeText("¿CÓMO JUGAR?", 300, 600);
  ctx.fillText("¿CÓMO JUGAR?", 300, 600);
}


