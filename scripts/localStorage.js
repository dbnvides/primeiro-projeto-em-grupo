export function recebeLocalStorage() {
  let retorno = JSON.parse(localStorage.getItem("token"));
  return retorno;
}
