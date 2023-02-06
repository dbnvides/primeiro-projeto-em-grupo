import { checkImagem } from "../../scripts/checaImagem.js";
import {
    abrirModal,
    modalAtualizarPerfil,
    modalAtualizarPet,
    modalCadastrarPet,
    modalDeletarPerfil,
    modalDeletarPet,
} from "../../scripts/modal.js";
import { meuPerfil, meusPetParaAdocao, meusPets } from "../../scripts/request.js";


const token = JSON.parse(localStorage.getItem("token"));
const dadosPessoais = document.querySelector(".dados");
const imagemPerfil = document.querySelector(".cabecalho img");
const botaoDrop = document.querySelector(".botaoDropdown");
const botoes = document.querySelector("header div");

if (!token) {
    window.location.href = "../../"
}

botaoDrop.addEventListener("click", () => {
    botoes.classList.toggle("naoAparecer");
    botaoDrop.classList.toggle('fecharMenu')

    if(botaoDrop.classList.contains('fecharMenu')){
      botaoDrop.innerHTML = ''
      botaoDrop.classList.add('fecharMenu')
    }else{
      botaoDrop.innerHTML = ''
      botaoDrop.innerText = '='
    }
});


async function criarPerfil() {
    let perfil = await meuPerfil(token);
    let listaMeusPets = await meusPetParaAdocao(token);
    dadosPessoais.insertAdjacentHTML(
        "afterbegin",
        `
    <h2><span>Nome:</span> ${perfil.name}</h2>
    <h2><span>E-mail:</span> ${perfil.email}</h2>
    `
    );
    if (listaMeusPets.length == 0) {
        dadosPessoais.insertAdjacentHTML(
            "beforeend",
            `
            <h2>Você ainda não adotou nenhum pet</h2>
            `
        );
    } else if (listaMeusPets.length == 1) {
        dadosPessoais.insertAdjacentHTML(
            "beforeend",
            `
            <h2><span>Você adotou:</span> ${listaMeusPets.length} pet</h2>
            `
        );
    } else {
        dadosPessoais.insertAdjacentHTML(
            "beforeend",
            `
            <h2><span>Você adotou:</span> ${listaMeusPets.length} pets</h2>
            `
        );
    }
    imagemPerfil.src = perfil.avatar_url;
}

function botaoHomeEvent() {
    const botaoHome = document.querySelector("#botaoHome");

    botaoHome.addEventListener("click", () => {
        window.location.replace("../home/index.html");
    });
}

function botaoLogoutEvent() {
    const botaoLogout = document.querySelector("#botaoLogout");

    botaoLogout.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.replace("../../index.html");
    });
}

async function atualizarPerfilEvent() {
    const botaoAttPerfil = document.querySelector("#atualizarInformacoes");

    const token = JSON.parse(localStorage.getItem("token"));
    const perfilInfo = await meuPerfil(token);

    botaoAttPerfil.addEventListener("click", () =>
        abrirModal(modalAtualizarPerfil(perfilInfo))
    );
}

function criaCardPetProfile(pet) {

    const card = document.createElement("li");
    const figure = document.createElement("div");
    const fotoPet = document.createElement("img");
    const divCorpoCard = document.createElement("div");
    const nome = document.createElement("h3");
    const especie = document.createElement("h3");
    const adotavel = document.createElement("h3");
    const botaoAtualizar = document.createElement("button");
    const botaoDeletar = document.createElement("button");

    card.classList.add('cardPet2')
    figure.classList.add('caixaImagem')
    fotoPet.classList.add('bgImg')
    divCorpoCard.classList.add('corpoCard')
    botaoAtualizar.classList.add('buttonBrand1')
    botaoDeletar.classList.add('buttonBrand1')

    botaoAtualizar.id = "btnAtualizar";

    nome.insertAdjacentHTML("afterbegin",`<span>Nome: </span>${pet.name}`);
    especie.insertAdjacentHTML("afterbegin", `<span>Espécie: </span>${pet.species}`);

    if (pet.available_for_adoption) {
        adotavel.insertAdjacentHTML("afterbegin", `<span>Adotável: </span>Sim`)
    } else {
        adotavel.insertAdjacentHTML("afterbegin", `<span>Pet adotado</span>`)
    }

    checkImagem(pet, fotoPet)


    botaoAtualizar.innerText = 'Atualizar'
    botaoAtualizar.classList.add('botaoBrand1')
    botaoAtualizar.addEventListener('click', () => {
        abrirModal(modalAtualizarPet(pet))
    })

    botaoDeletar.innerText = 'Deletar'
    botaoDeletar.classList.add('botaoBrand2')
    botaoDeletar.addEventListener('click', () => {
        abrirModal(modalDeletarPet(pet.id))
    })


    figure.appendChild(fotoPet)
    divCorpoCard.append(nome, especie, adotavel, botaoAtualizar, botaoDeletar)
    card.append(figure, divCorpoCard)

    return card
}


async function renderizaCardPetProfile() {
    const ul = document.querySelector('.listaDePets')

    let localS = JSON.parse(localStorage.getItem('token'))

    let allmypet = await meusPets(localS)
   
    if (allmypet.length !== 0) {
        allmypet.forEach(element => {
            ul.append(criaCardPetProfile(element))
        })
    }

    else {
        let caixaVazia = document.createElement('div')
        let textoVazio = document.createElement('h2')
        textoVazio.innerText = 'Sem Pets para adoção'

        caixaVazia.classList.add('caixaVazia')

        caixaVazia.appendChild(textoVazio)
        ul.appendChild(caixaVazia)
    }

}

async function deletarPerfil() {
    const botaoDeletarPerfil = document.querySelector("#deletarConta");

    botaoDeletarPerfil.addEventListener("click", () => {
        abrirModal(modalDeletarPerfil());
    });
}

function cadastrarPet() {
    const novoPet = document.querySelector("#cadastrarNovoPet")

    novoPet.addEventListener("click", () => {
        abrirModal(modalCadastrarPet())
    })
}

async function filtrarPetsCriados() {

    let localS = JSON.parse(localStorage.getItem('token'))

    let allmypet = await meusPets(localS)

    let todosPetParaAdotar = []

    allmypet.forEach(pet => {
        if (pet.available_for_adoption == true) {
            todosPetParaAdotar = [...todosPetParaAdotar, pet]
        }
    })

    return todosPetParaAdotar
}

filtrarPetsCriados()
botaoHomeEvent();
botaoLogoutEvent();
atualizarPerfilEvent();
cadastrarPet()
criarPerfil();
deletarPerfil();
renderizaCardPetProfile()