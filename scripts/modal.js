import { receberForm } from "./inputs.js"
import { recebeLocalStorage } from "./localStorage.js";
import { cadastroUsuario, atualizarPerfil, cadastrarPet, atualizarPet, deletarPet, deletarPerfil } from "./request.js"
import { toast } from "./toast.js";

const body = document.querySelector("body");

export const abrirModal = (children) => {
  const fundoDoModal = document.createElement("div");
  fundoDoModal.classList.add("fundoDoModal");

  const modal = document.createElement("div");
  modal.classList = "modal";

  const bgModal = document.createElement("div");
  bgModal.classList.add("bgModal");

  const btnFechar = document.createElement("button");
  btnFechar.classList.add("fecharModal");

  btnFechar.addEventListener("click", () => {
    fundoDoModal.remove();
  });

  modal.appendChild(btnFechar);
  bgModal.append(children);
  modal.append(bgModal);
  fundoDoModal.append(modal);
  body.appendChild(fundoDoModal);

  btnFechar.addEventListener("click", () => {
    fundoDoModal.remove();
  });

  modal.appendChild(btnFechar);
  bgModal.append(children);
  modal.append(bgModal);
  fundoDoModal.append(modal);
  body.appendChild(fundoDoModal);
};

export const modalCadastrar = () => {
  let formModal = document.createElement("form");
  formModal.classList.add("formModal");

  formModal.insertAdjacentHTML(
    "afterbegin",
    `
        <h2>Cadastrar</h2>
            <input type="text" name="nome" id="name" placeholder="Nome" class="inputPadrao" required>
            <input type="email" name="email" id="email" placeholder="E-mail" class="inputPadrao" required>
            <input type="password" name="senha" id="password" placeholder="Senha" class="inputPadrao" required>
            <input type="avatar" name="avatar" id="avatar_url" placeholder="Avatar"
            class="inputPadrao" required>
        <button type="submit" class="botaoBrand1">Cadastrar</button>
    `
  );

  formModal.addEventListener("submit", (event) => {
    event.preventDefault();
    let corpo = receberForm(formModal.elements);
    cadastroUsuario(corpo);
  });

  return formModal;
};

export const fecharModal = (request) => {
  const modal = document.querySelector(".fundoDoModal");

  if (request) {
    modal.remove();
  } else {
    toast('Deu algum erro!', 'erro' )
  }
};

export const modalAtualizarPet = ({name, bread, species, avatar_url, id}) => {
  let formModal = document.createElement("form");
  formModal.classList = "formModal modalAtualizar";

  formModal.insertAdjacentHTML(
    "afterbegin",
    `
    <h2>Atualizar pet</h2>
      <label for="nome">Nome</label>
        <input type="avatar" value="${name}" name="nome" id="name" placeholder="Nome" class="inputPadrao" required>
      <label for="bread">Raça</label>
        <input type="text" value=${bread} name="bread" id="bread" placeholder="Raça" class="inputPadrao" required>
      <label for="especie">Espécie</label>
        <input type="text" value=${species} name="especie" id="species" placeholder="Espécie" class="inputPadrao" required>
      <label for="avatar">Avatar</label>
        <input type="avatar" value=${avatar_url} name="avatar" id="avatar_url" placeholder="Avatar" class="inputPadrao" required>
    <button type="submit" class="botaoBrand1">Atualizar</button>
    `
  );

  formModal.addEventListener("submit", (event) => {
    event.preventDefault();
    let corpo = receberForm(formModal.elements);
    atualizarPet(corpo, id);
  });

  return formModal;
};

export const modalCadastrarPet = () => {
  let formModal = document.createElement("form");
  formModal.classList = "formModal modalAtualizar";

  formModal.insertAdjacentHTML(
    "afterbegin",
    `
      <h2>Cadastrar pet</h2>
        <input type="text" name="nome" id="name" placeholder="Nome" class="inputPadrao" required>
        <input type="text" name="bread" id="bread" placeholder="Raça" class="inputPadrao" required>
        <select name="selecionarRaca" id="species" class="inputPadrao">
          <option value="selecionarEspecie">Selecionar espécie</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
          <option value="Aves">Aves</option>
          <option value="Repteis">Répteis</option>
          <option value="Outros">Outros</option>
        </select>
        <input type="avatar" name="avatar" id="avatar_url" placeholder="Avatar"class="inputPadrao" required>
      <button type="submit" class="botaoBrand1">Cadastrar</button>
    `
  );

  formModal.addEventListener("submit", (event) => {
    event.preventDefault();
    let corpo = receberForm(formModal.elements);
    cadastrarPet(corpo);
  });

    return formModal
}

export const modalAtualizarPerfil = ({ name, avatar_url }) => {
  let formModal = document.createElement("form");
  formModal.classList = "formModal modalAtualizar";

  formModal.insertAdjacentHTML(
    "afterbegin",
    `
        <h2>Atualizar perfil</h2>
            <input type="text" value="${name}" name="nome" id="name" placeholder="Nome" class="inputPadrao" required>
            <input type="avatar" value=${avatar_url} name="avatar" id="avatar_url" placeholder="Avatar"
            class="inputPadrao" required>
        <button type="submit" class="botaoBrand1">Atualizar</button>
    `)
    
    formModal.addEventListener("submit", async (event) => {
        event.preventDefault()
        let corpo = receberForm(formModal.elements)
        await atualizarPerfil(corpo)
    })
   
    return formModal
}

export const modalDeletarPet = (idPet) => {
  let formModal = document.createElement("form");
  formModal.classList = "formModal modalDeletar";

  formModal.insertAdjacentHTML(
    "afterbegin",
    `
        <h2>Deseja mesmo deletar esse pet?</h2>
        <button type="button" id="btnCancelar" class="botaoBrand1 buttonModal">Não desejo deletar esse pet</button>
        <button type="submit" id="btnDeletar" class="botaoBrand2 buttonModal">Quero deletar esse pet</button>
    `
  );

  formModal.addEventListener("submit", async (event) => {
    event.preventDefault();
    await deletarPet(idPet);
  });

  const elements = [...formModal.elements];
  elements.forEach((element) => {
    if (element.id == "btnCancelar") {
      element.addEventListener("click", () => {
        const fundoModal = document.querySelector(".fundoDoModal");
        fundoModal.remove();
      });
    }
  });

  return formModal;
};


export const modalDeletarPerfil = () => {
  const token = recebeLocalStorage();
  let formModal = document.createElement("form");
  formModal.classList = "formModal modalDeletar";

  formModal.insertAdjacentHTML(
    "afterbegin",
    `
        <h2>Deseja mesmo deletar sua conta?</h2>
        <button type="button" id="btnCancelar" class="botaoBrand1 buttonModal">Não desejo deletar minha conta</button>
        <button type="submit" id="btnDeletar" class="botaoBrand2 buttonModal">Quero deletar minha conta</button>
    `
  );

  formModal.addEventListener("submit", async (event) => {
    event.preventDefault();
    await deletarPerfil(token);
  });

  const elements = [...formModal.elements];
  elements.forEach((element) => {
    if (element.id == "btnCancelar") {
      element.addEventListener("click", () => {
        const fundoModal = document.querySelector(".fundoDoModal");
        fundoModal.remove();
      });
    }
  });

  return formModal;
};
