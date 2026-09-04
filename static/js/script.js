const imagens = [
  "/static/images/fundo-1.svg",
  "/static/images/fundo-2.svg",
  "/static/images/fundo-3.svg",
  "/static/images/fundo-4.svg"
];

function trocarImagemDeFundo() {
  const indiceAleatorio = Math.floor(Math.random() * imagens.length);
  document.body.style.backgroundImage = `url("${imagens[indiceAleatorio]}")`;
}

document.addEventListener("DOMContentLoaded", trocarImagemDeFundo);