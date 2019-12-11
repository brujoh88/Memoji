/* -------------------DECLARACIONES DE VARIABLES GLOBALES---------------------------- *\
/* -------------------TRAER ELEMENTOS DEL DOM E IMAGENES----------------------------- */

var BOX = document.getElementsByClassName("box");
const IMG = document.getElementsByClassName("emoji");
var tablero = document.getElementById("tablero");
var contexto = tablero.getContext("2d");
var emoji = {
  url: "../img/guiño.jpg",
  cargaOK: false
};
var posicion;

/* -------------------ESCUCHA DE LOS DISTINTOS BOX---------------------------- *\
/* -------------------             +              ---------------------------- *\
/* -------------------AGREGADO DE Class SEGUN TENGA O NO---------------------- */
for (let i = 0; i < 64; i++) {
  BOX[i].addEventListener("click", () => {
    if (BOX[i].classList.contains("boxActivo")) {
      /* -----DESACTIVAR----- */
      /* -------------------- */
      BOX[i].classList.add("boxDesactivo"); /* +(1)Class */

      BOX[i].classList.remove("boxActivo"); /* -(2)Class */
      /* -------------------- */
      /* -----FIN DESACTIVAR- */
    } else {
      /* -----ACTIVAR-------- */
      /* -------------------- */

      posicion = i;

      emoji.imagen = new Image();
      emoji.imagen.src = emoji.url;
      emoji.imagen.addEventListener("load", cargarEmoji);

      BOX[i].classList.remove("boxDesactivo"); /* +(1)Class */
      BOX[i].classList.add("boxActivo"); /* +(2)Class */
      /* -------------------- */
      /* -----FIN ACTIVAR---- */
    }
  });
}
/* ---------------------FIN ESCUCHA------------------------------------------- */

function cargarEmoji() {
  emoji.cargaOK = true;
  dibujar();
}

function dibujar() {
  if (emoji.cargaOK) {
    console.log(posicion);
    if (posicion <= 7) {
      contexto.drawImage(emoji.imagen, posicion * 100, 0);
    } else if (posicion <= 15) {
      contexto.drawImage(emoji.imagen, (posicion - 8) * 100, 100);
    } else if (posicion <= 23) {
      contexto.drawImage(emoji.imagen, (posicion - 16) * 100, 200);
    } else if (posicion <= 31) {
      contexto.drawImage(emoji.imagen, (posicion - 24) * 100, 300);
    } else if (posicion <= 39) {
      contexto.drawImage(emoji.imagen, (posicion - 32) * 100, 400);
    } else if (posicion <= 47) {
      contexto.drawImage(emoji.imagen, (posicion - 40) * 100, 500);
    } else if (posicion <= 55) {
      contexto.drawImage(emoji.imagen, (posicion - 48) * 100, 600);
    } else {
      contexto.drawImage(emoji.imagen, (posicion - 56) * 100, 700);
    }

    /* contexto.drawImage(emoji.imagen, posicion * 10, posicion * 10); */
  } else {
  }
}
