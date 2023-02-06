function toast(message, status) {
    if (document.querySelector(".toast")) {
        document.querySelector(".toast").remove()
    }

    let toast = document.createElement("div")
    let borda = document.createElement("div")
    let conteudo = document.createElement("div")
    let toastHead = document.createElement("div")
    let p = document.createElement("p")

    

    if (status === "erro") {
        toastHead.insertAdjacentHTML("afterbegin",`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="23.7426" height="24" rx="11.8713" fill="#DA566D"/>
                        <path d="M8.54413 7.494H9.10413C9.33747 7.494 9.5428 7.62 9.72013 7.872L12.0861 11.274C12.4688 10.826 12.8421 10.3173 13.2061 9.748C13.5795 9.17867 13.8548 8.72133 14.0321 8.376L14.2981 7.872C14.4568 7.62 14.6575 7.494 14.9001 7.494H15.4741C15.6701 7.494 15.7681 7.58267 15.7681 7.76C15.7681 7.83467 15.7308 7.928 15.6561 8.04C15.5908 8.152 15.4695 8.35733 15.2921 8.656C15.1148 8.94533 14.7648 9.454 14.2421 10.182C13.7288 10.9007 13.2341 11.5167 12.7581 12.03L15.8941 16.538C15.9501 16.622 15.9781 16.7013 15.9781 16.776C15.9781 16.9253 15.8848 17 15.6981 17H15.0961C14.8255 17 14.6015 16.86 14.4241 16.58L12.0021 12.8C11.6661 13.1547 11.2975 13.6493 10.8961 14.284C10.5041 14.9093 10.1915 15.4507 9.95813 15.908L9.60813 16.58C9.4308 16.86 9.2068 17 8.93613 17H8.33413C8.1568 17 8.06813 16.9253 8.06813 16.776C8.06813 16.5333 8.60013 15.656 9.66413 14.144C10.1775 13.416 10.7141 12.716 11.2741 12.044L8.30613 7.942C8.25947 7.87667 8.23613 7.816 8.23613 7.76C8.23613 7.58267 8.3388 7.494 8.54413 7.494Z" fill="#FCFEFF"/>
                        </svg>
                        <h3>Erro!</h3>
        `)
    }
    if (status === "sucesso") {
        toastHead.insertAdjacentHTML("afterbegin",`
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.721191" width="25" height="25" rx="11.8713" fill="#087F5B"/>
            <path d="M10.8904 16.3359C11.0955 16.541 11.4441 16.541 11.6492 16.3359L17.6785 10.3066C17.8836 10.1016 17.8836 9.75293 17.6785 9.54785L16.9402 8.80957C16.7351 8.60449 16.407 8.60449 16.2019 8.80957L11.28 13.7314L8.96266 11.4346C8.75758 11.2295 8.42946 11.2295 8.22438 11.4346L7.4861 12.1729C7.28102 12.3779 7.28102 12.7266 7.4861 12.9316L10.8904 16.3359Z" fill="#FCFEFF"/>
            </svg>
            <h3>Sucesso!</h3>
        `)
    }

    toast.classList = "toast"
    borda.classList = "borda"
    conteudo.classList = "conteudo"

    p.innerText = message.charAt(0).toUpperCase() + message.slice(1)

    conteudo.append(toastHead, p)
    toast.append(borda,conteudo)

    document.body.append(toast)

    setTimeout(() => {
        toast.remove()
    }, 3000);
}

export {
    toast
}