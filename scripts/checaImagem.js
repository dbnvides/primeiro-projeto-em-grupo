export function checkImagem(pet, tag) {
  let img = new Image();
  img.src = pet.avatar_url;
  img.onload = function () {
    tag.src = pet.avatar_url;
    tag.alt = `Foto do ${pet.name} (${pet.species})`;
  };
  img.onerror = function () {
    tag.src = "../../assets/img/sem-imagem-perfil.webp";
    tag.alt = "Foto indisponível";
  };
}
