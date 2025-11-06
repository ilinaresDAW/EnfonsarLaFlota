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
function validarDimensiones(filas, columnas,nombre) {
    if (columnas > 20 || columnas < 7 || filas > 20 || filas < 7) {
        alert("Numero de filas o columnas invalido recuerda introducir del 7 a 20")
        return false
    } else if (nombre === "Anonimo") {
        alert("Introduce nombre !!!")
        return false
    } else {
        return true

    }
}

// Funcion 3: Generar la tabla 
function generarTabla(filas, columnas) {
    let celdas = ""
    for (let i = 0; i < filas; i++) {
        celdas += "<tr>"
        for (let j = 0; j < columnas; j++) {
            celdas += "<td id=" + i + j + ">💧​</td>"
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
    document.getElementById('bloc3').style.display = 'block'

}
//Funcion 5: Reiniciar
function reiniciarPartida() {
    location.reload()
}
//Funcion 6: mostrar estadistias
function mostrarEstats() {
    fetch(`http://127.0.0.1:8000/stats/${idPartida}/${nombre}/`)
        .then(response => response.json())
        .then(data => { console.log("Listado", data); })
        .catch(error => { console.error("Error al enviar datos:", error); })
}
// ¡¡¡PRINCIPAL!!!
let boton = document.getElementById('datos')
boton.addEventListener('click', function (event) {
    console.log('Click en datos')

    let filas = document.getElementById('filas').value
    let columnas = document.getElementById('columnas').value
    let nombre = document.getElementById('nombre').value.trim() || 'Anonimo'
    console.log("nombre " + nombre + " filas " + filas + " columnas " + columnas)

    // Validar
    if (!validarDimensiones(filas, columnas,nombre)) {
        return;
    }

    // Crear partida 
    fetch(`http://127.0.0.1:8000/createGame/${idPartida}/${filas}/${columnas}/${nombre}`)
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
                        let puntosGanados = data["resultado del disparo"].puntos_ganados
                        let totalPuntos = data["resultado del disparo"].total_puntos
                        let estado = data["resultado del disparo"].estado

                        // resultado 
                        if (resultado === `agua`) {
                            event.target.classList.add(`agua`)
                            event.target.innerHTML = `🌊​`
                            disparosFallados++
                            document.getElementById(`disparosFallados`).textContent = `Disparos Fallados: ` + disparosFallados
                            document.getElementById(`ultimaJugada`).innerHTML = "<p>Últim mssatge: " + nombre + " ha tocat aigua en fila: " + fila + " columna: " + col + " ha perdut: " + puntosGanados + " punts</p>"
                            document.getElementById(`puntosGanados`).textContent = puntosGanados
                            document.getElementById(`puntosGanados`).style.color = `#ED2E14`
                        } else if (resultado === `tocado`) {
                            event.target.innerHTML = `​💣​`
                            event.target.classList.add(`tocado`)
                            disparos++
                            document.getElementById(`disparos`).textContent = "Disparos Acertados: " + disparos
                            document.getElementById(`ultimaJugada`).innerHTML = "<p>Últim mssatge: " + nombre + " ha tocat vaixell en fila: " + fila + " columna: " + col + " ha guanyat: +" + puntosGanados + " punts</p>"
                            document.getElementById(`puntosGanados`).textContent = `+` + puntosGanados
                            document.getElementById(`puntosGanados`).style.color = `#22CC2D`
                        } else if (resultado === `hundido`) {
                            event.target.classList.add(`hundido`)
                            event.target.innerHTML = `☠️​`
                            hundidos++
                            document.getElementById(`barcosHundidos`).textContent = "Barcos Hundidos: " + hundidos
                            document.getElementById(`ultimaJugada`).innerHTML = "<p>Últim mssatge: " + nombre + " ha enfonsat vaixell en fila: " + fila + " columna: " + col + " ha guanyat: +" + puntosGanados + " punts</p>"
                            document.getElementById(`puntosGanados`).textContent = `+ ` + puntosGanados
                            document.getElementById(`puntosGanados`).style.color = `#22CC2D`
                        }
                        document.getElementById(`puntos`).textContent = totalPuntos + ` Punts`

                        // Fin de juego
                        if (estado === 'Derrota') {
                            document.getElementById("bloc2").style.display = "none"
                            document.getElementById("bloc1").style.display = "none"
                            document.getElementById("final").style.color = "red"
                            document.getElementById("final").textContent = "DERROTA"
                            document.getElementById("bloc3").style.width = "100%"
                            mostrarEstats()
                            console.log(`PERDEDOR`);
                        } else if (estado === 'Victoria') {
                            document.getElementById("bloc2").style.display = "none"
                            document.getElementById("bloc1").style.display = "none"
                            document.getElementById("final").style.color = "green"
                            document.getElementById("final").textContent = "VICTORIA"
                            document.getElementById("bloc3").style.width = "100%"
                            console.log(`GANADOR`);
                            mostrarEstats()

                        }

                        // Total disparos
                        let totalDisparos = disparos + disparosFallados;
                        document.getElementById(`totalDisparos`).textContent = totalDisparos;
                    })
                    .catch(error => {
                        console.error("Error al enviar datos:", error);
                    })

                console.log('Click en ' + fila + ' y ' + col);
            })
        }
    }
});

let botonAbandonar = document.getElementById('abandonar')
botonAbandonar.addEventListener('click', function (event) {
    abandonarPartida()
    console.log(`Abandono`)
})
let botonReiniciar = document.getElementById('reiniciar')
botonReiniciar.addEventListener('click', function (event) {
    console.log(`Reinicio`)
    reiniciarPartida();
})

