console.log("FrotnEnd iniciado")

let tabla = document.getElementById('tabla')
tabla.addEventListener('click', function (marca) {
    if (marca.target.classList.contains('casilla')) {
        let Click = marca.target.id
        console.log("Clcik")
        console.log("diaparo a " + Click)
    }

})      