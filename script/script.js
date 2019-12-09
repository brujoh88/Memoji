var BOX = document.getElementsByClassName("box");
const IMG = document.getElementsByClassName("emoji");

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
      IMG[i].classList.remove("emoji--active"); /* -(3)Class */
      /* -------------------- */
      /* -----FIN DESACTIVAR- */
    } else {
      /* -----ACTIVAR-------- */
      /* -------------------- */
      BOX[i].classList.remove("boxDesactivo"); /* +(1)Class */
      BOX[i].classList.add("boxActivo"); /* +(2)Class */
      IMG[i].classList.add("emoji--active"); /* +(3)Class */
      /* -------------------- */
      /* -----FIN ACTIVAR---- */
    }
  });
}
/* ---------------------FIN ESCUCHA------------------------------------------- */
