console.log("Frontend iniciado");

// Variables 
let disparos = 0;
let disparosFallados = 0;
let hundidos = 0;
let puntos = 0;

// Funcion 1: Generar ID de partida
function generarIdPartida() {
    return crypto.randomUUID();
}
const idPartida = generarIdPartida();
console.log("ID: ", idPartida);

// Funcion 2: Validar
function validarDimensiones(filas, columnas) {
    if (columnas > 20 || columnas < 7 || filas > 20 || filas < 7) {
        alert("Numero de filas o columnas invalido recuerda introducir del 7 a 20")
        return false
    }
    return true
}

// Funcion 3: Generar la tabla 
function generarTabla(filas, columnas) {
    let celdas = ""
    for (let i = 0; i < filas; i++) {
        celdas += "<tr>"
        for (let j = 0; j < columnas; j++) {
            celdas += "<td id=" + i + j + ">*</td>"
        }
        celdas += "</tr>"
    }
    document.getElementById("tabla").innerHTML = celdas
}
// Funcion 4: Abandonar 
async function abandonarPartida() {
    // Fetch
    fetch(`http://127.0.0.1:8000/abandonar/${idPartida}`)
        .then(response => response.json())
        .then(data => {
            console.log("Partida abandonada :", data)
        })
        .catch(error => {
            console.error("Error: ", error)
        });
    document.getElementById("bloc2").style.display = "none"
    document.getElementById("bloc1").style.display = "none"
    document.getElementById("final").style.color = "red"
    document.getElementById("final").textContent = "DERROTA"
    document.getElementById("bloc3").style.width = "100%"
}
//Funcion 5: Reiniciar
function reiniciarPartida(){
    location.reload()
}
// ¡¡¡PRINCIPAL!!!
let boton = document.getElementById('datos')
boton.addEventListener('click', function (event) {
    console.log('Click en datos')

    let filas = document.getElementById('filas').value
    let columnas = document.getElementById('columnas').value
    let nombre = document.getElementById('nombre').value
    console.log("nombre " + nombre + " filas " + filas + " columnas " + columnas)
<<<<<<< HEAD
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
                                if (estado === 'Derrota') {
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

=======
>>>>>>> 3caaa5f34138c2ed02fd8afd77a6f3aac76239af

    // Validar
    if (!validarDimensiones(filas, columnas)) {
        return; 
    }

    // Crear partida 
    fetch(`http://127.0.0.1:8000/createGame/${idPartida}/${filas}/${columnas}`)
        .then(response => response.json())
        .then(data => { console.log("Listado", data); })
        .catch(error => { console.error("Error al enviar datos:", error); })

    // jugador
    document.getElementById(`jugador`).textContent = `Jugador: ` + nombre
    // Generar tabla 
    generarTabla(filas, columnas)

    // Dificultad 
    let dificultadTexto = ""
    if (filas <= 10 && columnas <= 10) {
        dificultadTexto = "Facil"
        console.log(`dificultad establecida facil`)
    } else if (filas <= 15 && columnas <= 15) {
        dificultadTexto = "Media"
        console.log(`dificultad establecida media`)
    } else {
        dificultadTexto = "Dificil"
        console.log(`dificultad establecida dificil`)
    }
    document.getElementById(`dificultad`).textContent = dificultadTexto

    // Mostrar bloques 2 3
    document.getElementById('bloc2').style.display = 'block'
    document.getElementById('bloc3').style.display = 'block'

    // Configurar disparos
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            document.getElementById(i + '' + j).addEventListener('click', function (event) {
                let fila = i
                let col = j

                // revisar si ha disparado
                if (event.target.classList.contains('tocado') || event.target.classList.contains('agua') || event.target.classList.contains('hundido')) {
                    return
                }

                // Fetch disparo
                fetch(`http://127.0.0.1:8000/shot/${idPartida}/${fila}/${col}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Listado", data)
                        let resultado = data["resultado del disparo"].resultado
                        let totalPuntos = data["resultado del disparo"].total_puntos
                        let estado = data["resultado del disparo"].estado
                        document.getElementById(`puntos`).textContent = `Puntos: ` + totalPuntos

                        // resultado 
                        if (resultado === `agua`) {
                            event.target.classList.add(`agua`)
                            event.target.innerHTML = `·`
                            disparosFallados++
                            document.getElementById(`disparosFallados`).textContent = `Disparos Fallados: ` + disparosFallados
                            document.getElementById(`ultimaJugada`).innerHTML = "<p>Últim mssatge: " + nombre + " ha tocat " + resultado + " en " + fila + " " + col + "</p>"
                        } else if (resultado === `tocado`) {
                            event.target.innerHTML = `|`
                            event.target.classList.add(`tocado`)
                            disparos++
                            document.getElementById(`disparos`).textContent = "Disparos Acertados: " + disparos
                            document.getElementById(`ultimaJugada`).innerHTML = "<p>Últim mssatge: " + nombre + " ha tocat vaixell en " + fila + " " + col + "</p>"
                        } else if (resultado === `hundido`) {
                            event.target.classList.add(`hundido`)
                            event.target.innerHTML = `T`
                            hundidos++
                            document.getElementById(`barcosHundidos`).textContent = "Barcos Hundidos: " + hundidos
                            document.getElementById(`ultimaJugada`).innerHTML = "<p>Últim mssatge: " + nombre + " ha enfonsat vaixell en " + fila + " " + col + "</p>"
                        }

                        // Fin de juego
                        if (estado === 'Derrota') {
                            document.getElementById("bloc2").style.display = "none"
                            document.getElementById("bloc1").style.display = "none"
                            document.getElementById("final").style.color = "red"
                            document.getElementById("final").textContent = "DERROTA"
                            document.getElementById("bloc3").style.width = "100%"

                            console.log(`PERDEDOR`);
                        } else if (estado === 'Victoria') {
                            document.getElementById("bloc2").style.display = "none"
                            document.getElementById("bloc1").style.display = "none"
                            document.getElementById("final").style.color = "green"
                            document.getElementById("final").textContent = "VICTORIA"
                            document.getElementById("bloc3").style.width = "100%"

                            console.log(`GANADOR`);
                        }

                        // Total disparos
                        let totalDisparos = disparos + disparosFallados;
                        document.getElementById(`totalDisparos`).textContent = totalDisparos;
                    })
                    .catch(error => {
                        console.error("Error al enviar datos:", error);
                    });

                console.log('Click en ' + fila + ' y ' + col);
            });
        }
    }
});

let botonAbandonar = document.getElementById('abandonar')
botonAbandonar.addEventListener('click', function (event) {
    abandonarPartida();
})
let botonReiniciar = document.getElementById('reiniciar')
botonReiniciar.addEventListener('click', function (event) {
    console.log(`Reinicio`)
    reiniciarPartida();
})