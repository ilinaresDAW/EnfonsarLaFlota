console.log("FrotnEnd iniciado")
// Crear id de partida
function generarIdPartida() {
    return crypto.randomUUID();
}
const idPartida = generarIdPartida();
console.log("ID: ", idPartida);

let disparos = 0 //Variable para contar numero de disparos
let disparoFallados = 0
let hundidos = 0
let puntos = 0

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
        console.log(`hola`)
        //Fetch para pasar valores creacion de tablero y nombre d'usuario
        fetch(`http://127.0.0.1:8000/createGame/${idPartida}/${filas}/${columnas}`)
            .then(response => response.json())
            .then(data => { console.log("Listado", data); })
            .catch(error => {
                console.error("Error al enviar datos:", error);
            });
        document.getElementById(`jugador`).textContent = `Jugador: ` + nombre
        //Generacion de la tabla
        let celdas = ""
        let dimX = filas, dimY = columnas
        for (let i = 0; i < dimX; i++) {
            celdas += "<tr>"
            for (let j = 0; j < dimY; j++) {
                celdas += "<td  id=" + i + j + ">*</td>"
            }
            celdas += "</tr>"
        }
        document.getElementById("tabla").innerHTML = celdas

        /* function genera_tabla() {
             let dimX = filas, dimY = columnas //Dimensiones de la tabla
             let tabla = document.createElement("table")
             let tbody = document.createElement("tbody")
             for (let i = 0; i < dimX; i++) {
                 let fila = document.createElement("tr")
                 for (let j = 0; j < dimY; j++) {
                     let celda = document.createElement("td")
                     celda.id = i, j
                     fila.appendChild(celda)
                 }
                 tbody.appendChild(fila)
             }
             tabla.appendChild(tbody)
             document.getElementById("tabla").appendChild(tabla)
         }*/

        //Nivel difcultad
        let dificultad = document.getElementById("difcultad")
        if (dimX === 7 && dimY === 7 || dimX <= 10 && dimY <= 10) {
            console.log(`difulctad establecida facil`)
            document.getElementById(`dificultad`).textContent = `Facil`
        } else if (dimX === 11 && dimY === 11 || dimX <= 15 && dimY <= 15) {
            console.log(`difulctad establecida media`)
            document.getElementById(`dificultad`).textContent = `Media`
        } else {
            console.log(`difulctad establecida dificil`)
            document.getElementById(`dificultad`).textContent = `Dificil`

        }
        document.getElementById('bloc2').style.display = 'block'
        document.getElementById('bloc3').style.display = 'block'

        //Mecanica de disparo
        for (let i = 0; i < dimX; i++) {
            for (let j = 0; j < dimY; j++) {
                document.getElementById(i + '' + j).addEventListener('click', async (event) => {
                    let fila = i;
                    let col = j;
                    if (event.target.classList.contains('tocado') || event.target.classList.contains('agua') || event.target.classList.contains('hundido')) {  // <-- Mejora: Comprueba todas las clases
                        return;
                    } else {

                        fetch(`http://127.0.0.1:8000/shot/${idPartida}/${fila}/${col}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log("Listado", data)
                                let resultado = data["resultado del disparo"].resultado
                                //let puntosGanados = data["resultado del disparo"].puntos_ganados
                                let totalPuntos = data["resultado del disparo"].total_puntos
                                let estado = data["resultado del disparo"].estado
                                document.getElementById(`puntos`).textContent = `Puntos: ` + totalPuntos
                                if (resultado === `agua`) {
                                    event.target.classList.add(`agua`)
                                    event.target.innerHTML = `·`
                                    disparoFallados++
                                    document.getElementById(`disparosFallados`).textContent = `Disparos Fallados: ` + disparoFallados
                                    document.getElementById(`ultimaJugada`).textContent = "Últim mssatge: " + nombre + " ha tocat " + resultado + " en " + i + " " + j
                                } else if (resultado === `tocado`) {
                                    event.target.innerHTML = `|`
                                    event.target.classList.add(`tocado`)
                                    disparos++  // Suma si tocado
                                    document.getElementById(`disparos`).textContent = "Disparos Acertados: " + disparos
                                    document.getElementById(`ultimaJugada`).textContent = "Últim mssatge: " + nombre + " ha tocat vaixell en " + i + " " + j
                                } else if (resultado === `hundido`) {
                                    event.target.classList.add(`hundido`)
                                    event.target.innerHTML = `T`
                                    hundidos++
                                    document.getElementById(`barcosHundidos`).textContent = "Barcos hundidos: " + hundidos
                                    document.getElementById(`ultimaJugada`).textContent = "Últim mssatge: " + nombre + " ha enfonsat vaixell en " + i + " " + j

                                }
                                if (estado === 'Derrofta') {
                                    document.getElementById("bloc2").style.display = "none"
                                    document.getElementById("bloc3").style.display = "none"
                                    console.log(`loser`)
                                }
                                let totalDisparos = disparos + disparoFallados
                                document.getElementById(`totalDisparos`).textContent = "Disparos " + totalDisparos


                            })
                            .catch(error => {
                                console.error("Error al enviar datos:", error);
                            });

                        console.log('Click en ' + fila + 'y' + col);
                    }
                });
            }
        }


    }
})
