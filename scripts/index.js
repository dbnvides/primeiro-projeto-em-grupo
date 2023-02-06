import { receberForm } from "./inputs.js"
import { recebeLocalStorage } from "./localStorage.js"
import { abrirModal, modalCadastrar } from "./modal.js"
import { gerarCaminhoAleatorio } from "./randomPets.js"
import { login, meusPets } from "./request.js"

const formularioLogin = document.querySelector(".formLogin")
const botaoCadastrar  = document.querySelector(".cadastrar")
let token = recebeLocalStorage()

if (token) {
    window.location.href = "../pages/home"
}

function fundoAleatorio(){
    let div = document.querySelector(".divImagem")

    let petAleatorio = gerarCaminhoAleatorio()

    div.style.backgroundImage = `url(${petAleatorio})`
}

fundoAleatorio()

formularioLogin.addEventListener("submit", (event) =>{
    event.preventDefault()
    let corpo = receberForm(formularioLogin.elements)
    let mensagem = login(corpo)
})

botaoCadastrar.addEventListener("click", () => {
    abrirModal(modalCadastrar())
})