import { checkImagem} from "../../scripts/checaImagem.js";
import { adotaPet, meuPerfil, todosPets } from "../../scripts/request.js";

const token = localStorage.getItem("token");
const botaoDrop = document.querySelector(".botaoDropdown");
const navegacao = document.querySelector("nav");

if (!token) {
  window.location.href = "../../"
}

botaoDrop.addEventListener("click", () => {
  navegacao.classList.toggle("naoAparecer");
  botaoDrop.classList.toggle('fecharMenu')

  if(botaoDrop.classList.contains('fecharMenu')){
    botaoDrop.innerHTML = ''
    botaoDrop.classList.add('fecharMenu')
  }else{
    botaoDrop.innerHTML = ''
    botaoDrop.innerText = '='
  }
});

async function renderizaCardsPets() {
  const listaPetsHtml = document.querySelector(".listaPets");
  const listaPets = await todosPets();
  const infoUsuario = await meuPerfil(JSON.parse(token));
  
  listaPets.forEach((pet) => {
    if (pet.available_for_adoption) {
      criaCard(pet, infoUsuario.id, listaPetsHtml)
    } else {
      if (pet.guardian.id == infoUsuario.id) {
        criaCard(pet, infoUsuario.id, listaPetsHtml)
      }
    }
  });
}

function criaCard(pet, idUsuario, listaHtml) {
  const bodyDoRequest = {
    pet_id: pet.id,
  };

  const card = document.createElement("li");
  const figure = document.createElement("figure");
  const fotoPet = document.createElement("img");
  const sectionInfo = document.createElement("section");
  const divNomeEspecie = document.createElement("div");
  const nome = document.createElement("h2");
  const especie = document.createElement("p");
  const botaoAdotar = document.createElement("button");

  card.classList = "cardPet";
  figure.classList = "fotoPet";
  sectionInfo.classList = "infoPet";
  nome.classList = "nomePet";
  especie.classList = "especiePet";

  nome.innerText = pet.name;
  especie.innerText = pet.species;

  checkImagem(pet, fotoPet)

  if (pet.available_for_adoption) {
    botaoAdotar.innerText = "Me adota?";
    botaoAdotar.classList = "botaoAdocao meAdota";
    botaoAdotar.addEventListener("click", () => {
      adotaPet(bodyDoRequest);
    });
  } else {
    if (pet.guardian.id == idUsuario) {
      botaoAdotar.innerText = "Já adotou";
      botaoAdotar.classList = "botaoAdocao adotado";
      botaoAdotar.setAttribute("disabled", true);
    }
  }

  divNomeEspecie.append(nome, especie);
  sectionInfo.append(divNomeEspecie, botaoAdotar);
  figure.append(fotoPet);
  card.append(figure, sectionInfo);
  listaHtml.append(card);
}

export function botaoLogoutEvent() {
  const botaoLogout = document.querySelector("#logout");

  botaoLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("../../index.html");
  });
}

function botaoPerfilEvent() {
  const botaoPerfil = document.querySelector("#perfil");

  botaoPerfil.addEventListener("click", () => {
    window.location.replace("../profile/index.html");
  });
}

renderizaCardsPets();
botaoLogoutEvent();
botaoPerfilEvent();
