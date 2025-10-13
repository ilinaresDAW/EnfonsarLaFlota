console.log("FrotnEnd iniciado")




let celdas = ""
let dimX = 7, dimY = 7
for (let i = 0; i < dimX; i++) {
    celdas += "<tr>"
    for (let j = 0; j < dimY; j++) {
        celdas += "<td id=" + i + j + ">*</td>"
    }
    celdas += "</tr>"

}
document.getElementById("tabla").innerHTML = celdas


for (let i = 0; i < dimX; i++) {
    for (let j = 0; j < dimY; j++) {
        document.getElementById(i + '' + j).addEventListener('click', (event) => {
            event.target.innerHTML = 1
            console.log ('Click en '+i+''+j)
            //fetch
        })
    }
}   

/*
let disparos = 0 //Variable para contar numero de disparos
tabla.addEventListener('click', function (marca) {
    if (marca.target.classList.contains('casilla')) {
        let Click = marca.target.id
        console.log("Clcik")
        console.log("diaparo a " + Click)
        marca.target.classList.add('tocado')//Cambia a tocado rojo
        disparos  ++
        document.getElementById('disparos').textContent = "Disparos: "+disparos //Aumenta numero de disparos
    }

})  //Fuction para cambiar de agua a tocado
  */
