const inputEncripter = document.getElementById("inputEncripter");
const bttnEncripter = document.getElementById("bttnEncripter");
const bttnDesencripter = document.getElementById("bttnDesencripter");
const textoEncriptado = document.getElementById("textoEncriptado");
const bttnCopy = document.getElementById("bttnCopy");
const messageCopy = document.getElementById("messageCopy");
const title = document.getElementById("title");

bttnCopy.style.display = "none";

const encripter = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat"
};

const switchTitle = "Texto Encriptado";
const switchTitle2 = "Texto Desencriptado";

function encriptarTexto(texto) {
  let textoEncriptado = "";
  for (let i = 0; i < texto.length; i++) {
    let char = texto[i].toLowerCase();
    if (encripter[char]) {
      textoEncriptado += encripter[char];
    } else {
      textoEncriptado += texto[i];
    }
  }
  return textoEncriptado;
}

function desencriptarTexto(texto) {
  let textoDesencriptado = texto;
  for (let key in encripter) {
    let value = encripter[key];
    textoDesencriptado = textoDesencriptado.split(value).join(key);
  }
  textoEncriptado.style.display = "block";
  inputEncripter.style.display = "none";
  messageCopy.textContent = `Tienes 5s para copiar el texto`;

  setTimeout(() => {
    location.reload();
  }, 5000);
  return textoDesencriptado;
}

bttnEncripter.addEventListener("click", () => {
  let valor = inputEncripter.value.toLowerCase().trim();
  let textoModificado = encriptarTexto(valor);
  textoEncriptado.textContent = textoModificado;
  inputEncripter.style.display = "none";
  bttnEncripter.style.display = "none";
  bttnCopy.style.display = "block";
  bttnDesencripter.style.display = "none";
  title.textContent = switchTitle;
});

bttnDesencripter.addEventListener("click", () => {
  let valor = inputEncripter.value.toLowerCase().trim();
  let textoModificado = desencriptarTexto(valor);
  textoEncriptado.textContent = textoModificado;
  title.textContent = switchTitle2;
  title.style.fontSize = "30px";
  bttnEncripter.style.display = "none";
  bttnDesencripter.style.display = "none";
  bttnCopy.style.display = "block";
});

bttnCopy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(textoEncriptado.textContent)
    .then(() => {
      messageCopy.textContent = `Haz copiado el texto`;
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
  textoEncriptado.style.display = "none";
  inputEncripter.style.display = "block";
  bttnEncripter.style.display = "block";
  bttnDesencripter.style.display = "block";
  bttnCopy.style.display = "none";
  inputEncripter.value = "";

  setTimeout(() => {
    messageCopy.style.display = "none";
  }, 2000);
});

inputEncripter.addEventListener("input", () => {
  inputEncripter.value = inputEncripter.value.replace(/[^a-zA-Z\s]/g, "");
});
