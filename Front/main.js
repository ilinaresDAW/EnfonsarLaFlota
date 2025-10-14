console.log("FrotnEnd iniciado")


let boton = document.getElementById('datos')
boton.addEventListener('click', (event) => {
    console.log('Click en datos')
    let disparos = 0 //Variable para contar numero de disparos
    let filas = document.getElementById('filas').value
    let columnas = document.getElementById('columnas').value
    let nombre = document.getElementById('nombre').value
    console.log("nombre " + nombre + " filas " + filas + " columnas " + columnas)
    //fetch
    //Recogida de datos nombre fila y columna
    if (columnas > 20||columnas < 7 || filas > 20||filas < 7) {
        alert("Numero de filas o columnas invalido recuerda introducir del 7 a 20")
    } else {
        let celdas = ""
        let dimX = filas, dimY = columnas //Dimensiones de la tabla
        for (let i = 0; i < dimX; i++) {
            celdas += "<tr>"
            for (let j = 0; j < dimY; j++) {
                celdas += "<td id=" + i + j + ">*</td>"
            }
            celdas += "</tr>"
        }
        document.getElementById("tabla").innerHTML = celdas
        //Generacion de la tabla

        for (let i = 0; i < dimX; i++) {
            for (let j = 0; j < dimY; j++) {
                document.getElementById(i + '' + j).addEventListener('click', (event) => {
                    if (event.target.classList.contains('tocado')) {
                        return
                    }//if para si la casilla ya tiene la clase tocado no pueda volver a hacer click cambiar porque si es agua se podria cambiar
                    event.target.innerHTML = 1
                    console.log('Click en ' + i + '' + j)

                    event.target.classList.add('tocado')//Cambia a tocado rojo
                    disparos++
                    document.getElementById('disparos').textContent = "Disparos " + disparos

                    //fetch
                })
            }
        }
    }
})







