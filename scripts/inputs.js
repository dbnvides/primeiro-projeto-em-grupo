export function receberForm(elementos) {
    let corpoApi = {}
    
    let elementosFormulario = [...elementos]

    elementosFormulario.forEach((elemento) => {
        if (elemento.tagName == "INPUT" || elemento.tagName == 'SELECT' ) {
            corpoApi[elemento.id] = elemento.value
        }
    })
    return corpoApi
}