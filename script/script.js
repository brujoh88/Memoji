/* -------------------DECLARACIONES DE VARIABLES GLOBALES---------------------------- *\
/* -------------------TRAER ELEMENTOS DEL DOM E IMAGENES----------------------------- */
var CONT_M = document.getElementById("min");
var CONT_S = document.getElementById("seg");
var CONT_MS = document.getElementById("mseg");
var PLAY = document.getElementById("iniciar");
var BOX = document.getElementsByClassName("box");
var CONT_BOX = document.getElementsByClassName("container__game");
var tablero = document.getElementById("tablero");
var contexto = tablero.getContext("2d");
var emoji = {
  url: [
    "../img/1.jpg",
    "../img/2.jpg",
    "../img/3.jpg",
    "../img/4.jpg",
    "../img/5.jpg",
    "../img/6.jpg",
    "../img/7.jpg",
    "../img/8.jpg",
    "../img/9.jpg",
    "../img/10.jpg",
    "../img/11.jpg",
    "../img/12.jpg",
    "../img/13.jpg",
    "../img/14.jpg",
    "../img/15.jpg",
    "../img/16.jpg",
    "../img/17.jpg",
    "../img/18.jpg",
    "../img/19.jpg",
    "../img/20.jpg",
    "../img/21.jpg",
    "../img/22.jpg",
    "../img/23.jpg",
    "../img/24.jpg",
    "../img/25.jpg",
    "../img/26.jpg",
    "../img/27.jpg",
    "../img/28.jpg",
    "../img/29.jpg",
    "../img/30.jpg",
    "../img/31.jpg",
    "../img/32.jpg"
  ],
  cargaOK: false
};

var random = [];
var posicion; //"coordenadas" del click
var activos = 0; //tarjetas visibles
var tarjetasActivas = [,]; // Memoria para tarjetas visibles
var siguienteBox = false;
var mach = 0;
var cont_m = 0;
var cont_s = 0;
var cont_ms = 0;
var run;

/* -------------------FIN DECLARACION DE VARIABLES---------------------------------*/

/* -------------------CRONOMETRO INICIAL---------------------------------*/
CONT_MS.innerHTML = `${cont_ms}0 ms`;
CONT_S.innerHTML = `${cont_s}0 s :`;
CONT_M.innerHTML = `${cont_m}0 m :`;

/* -------------------UBICACION RANDOM DE LAS IMAGENES---------------------------*\
/---------------------SE HACE EN DOS PARTES 32 y 32------------------------------*/
for (let i = 0; i < 32; i++) {
  random[i] = Math.floor(Math.random() * 32);
  for (let x = 0; x < random.length; x++) {
    if (random[i] == random[x] && i != x) {
      x = random.length;
      i--;
    }
  }
}

for (let i = 32; i < 64; i++) {
  random[i] = Math.floor(Math.random() * 32);
  for (let x = 32; x < random.length; x++) {
    if (random[i] == random[x] && i != x) {
      x = random.length;
      i--;
    }
  }
}
/* ------------------------------------FIN RANDOM-----------------------------------*/

/* -----------A LA ESPERA DE INICIAR AL BOTON PLAY---------------------------------*/
PLAY.addEventListener("click", iniciar);

/* -------------------ESCUCHA DE LOS DISTINTOS BOX---------------------------- */
function iniciar() {
  PLAY.classList.add("none");
  cronometro();
  for (let i = 0; i < 64; i++) {
    BOX[i].addEventListener("click", () => {
      if (!BOX[i].classList.contains("boxActivo") && siguienteBox === false) {
        //¿No contiene la clase boxActivo?
        posicion = i;
        if (activos < 2) {
          activar();
          tarjetasActivas[activos] = posicion;
          activos++;
          crearEmoji();
          if (
            random[tarjetasActivas[0]] === random[tarjetasActivas[1]] &&
            activos === 2
          ) {
            BOX[tarjetasActivas[0]].classList.add("boxCoincidencia");
            BOX[tarjetasActivas[1]].classList.add("boxCoincidencia");
            activos = 0;
            mach++;
            gameOver();
            //Lanzar funcion de Exito(coincidencia) y cuantificar a 32 IMG
          } else if (activos === 2) {
            siguienteBox = true;
            setTimeout(seleccionEliminar, 500);
          }
        }
      }
    });
  }
}

/* ---------------------FIN ESCUCHA------------------------------------------- */
function cronometro() {
  run = setInterval(startCrono, 10);
}
function startCrono() {
  if (cont_ms === 99) {
    cont_ms = 0;
    cont_s++;
    if (cont_s === 60) {
      cont_m++;
      cont_s = 0;
    }
  }
  cont_ms++;
  if (cont_ms < 10) {
    CONT_MS.innerHTML = `0${cont_ms} ms`;
  } else {
    CONT_MS.innerHTML = `${cont_ms} ms`;
  }
  if (cont_s < 10) {
    CONT_S.innerHTML = `0${cont_s} s :`;
  } else {
    CONT_S.innerHTML = `${cont_s} s :`;
  }
  if (cont_m < 10) {
    CONT_M.innerHTML = `0${cont_m} m :`;
  } else {
    CONT_M.innerHTML = `${cont_m} m :`;
  }
}

function seleccionEliminar() {
  for (let i = 0; i < 2; i++) {
    posicion = tarjetasActivas[i];
    descativar();
  }
  activos = 0;
  siguienteBox = false;
}

function descativar() {
  BOX[posicion].classList.add("boxDesactivo");
  BOX[posicion].classList.remove("boxActivo");
}
function activar() {
  BOX[posicion].classList.remove("boxDesactivo");
  BOX[posicion].classList.add("boxActivo");
}
function crearEmoji() {
  emoji.imagen = new Image();
  emoji.imagen.src = emoji.url[random[posicion]];
  emoji.imagen.addEventListener("load", cargarEmoji);
}

function cargarEmoji() {
  emoji.cargaOK = true;
  dibujar();
}
function gameOver() {
  if (mach === 32) {
    clearInterval(run);
    CONT_BOX[0].classList.add("winner");
  }
}

function dibujar() {
  if (emoji.cargaOK) {
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
  }
}
