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
                let dimX = filas, dimY = columnas //Dimensiones de la tabla
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
            //Mecanica de disparo
            let disparos = 0 //Variable para contar numero de disparos
            let disparoFallados = 0
            let hundidos = 0
            let puntos = 0
            for (let i = 0; i < dimX; i++) {
                for (let j = 0; j < dimY; j++) {
                    document.getElementById(i + '' + j).addEventListener('click', async (event) => {
                        if (event.target.classList.contains(`tocado` || `agua` || `hundido`)) {
                            return
                        }  //if para si la casilla ya tiene la clase tocado no pueda volver a hacer click !!cambiar porque si es agua se podria clickar mas!!
                        event.target.innerHTML = `-`
                        event.target.classList.add(`agua`)
                        disparoFallados++
                        document.getElementById('disparosFallados').textContent = `Disparos Fallados ` + disparoFallados
                        fetch(`https:/172.0.0.1:8000/shot/${idPartida}/${filas}/${columnas}/${nombre}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log("Listado", data);
                                if (data.resultat === `agua`) {
                                    event.target.classList.add(`agua`)
                                    event.target.innerHTML = `-`
                                    disparoFallados++
                                    document.getElementById(`disparosFallados`).textContent = `Disparos Fallados ` + disparoFallados

                                } else if (data.resultat === `tocado`) {
                                    event.target.innerHTML = `1`
                                    event.target.classList.add(`tocado`)
                                    disparos++
                                    document.getElementById(`disparos`).textContent = "Disparos " + disparos

                                } else if (data.resultat === `hundido`) {
                                    event.target.classList.add(`hundido`)
                                    event.target.innerHTML = `!`
                                    hundidos++
                                    document.getElementById(`hundido`)

                                }
                                puntos = data.puntos
                                document.getElementById(`puntos`).textContent = `Puntos: ` + puntos
                            })
                            .catch(error => {
                                console.error("Error al enviar datos:", error);
                            });




                        console.log('Click en ' + i + '' + j)

                    })
                }
            }

        }})