console.log("FrotnEnd iniciado")
// Crear id de partida
function generarIdPartida() {
    return crypto.randomUUID();
} 
const idPartida = generarIdPartida();
console.log("ID: ", idPartida);

let boton = document.getElementById('datos')
boton.addEventListener('click', async (event) => {
    console.log('Click en datos')

    let filas = document.getElementById('filas').value
    let columnas = document.getElementById('columnas').value
    let nombre = document.getElementById('nombre').value
    console.log("nombre " + nombre + " filas " + filas + " columnas " + columnas)
    //Recogida de datos nombre fila y columna


    if (columnas > 20 || columnas < 7 || filas > 20 || filas < 7) {//If por si introduce valores superiores a los permitidos
        alert("Numero de filas o columnas invalido recuerda introducir del 7 a 20")
    } else {

        //Fetch para pasar valores creacion de tablero y nombre d'usuario
        fetch(`https:/172.0.0.1:8000/creategame/${idPartida}/${filas}/${columnas}/${nombre}`)
            .then(response => response.json())
            .then(data => {
                console.log("Listado de productos:", data);
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
            });


        //Generacion de la tabla
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


        //Disparo
        let disparos = 0 //Variable para contar numero de disparos
        for (let i = 0; i < dimX; i++) {
            for (let j = 0; j < dimY; j++) {
                document.getElementById(i + '' + j).addEventListener('click', (event) => {
                    if (event.target.classList.contains('tocado')) {
                        return
                    }//if para si la casilla ya tiene la clase tocado no pueda volver a hacer click !!cambiar porque si es agua se podria clickar mas!!
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







