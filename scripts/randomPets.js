function numeroAleatorio() {
    return Math.floor(Math.random() * (7 - 2) + 2)
}

function gerarCaminhoAleatorio(){
    return `../assets/img/randomBackground/random-pet-${numeroAleatorio()}.svg`
}

export {
    gerarCaminhoAleatorio,
}