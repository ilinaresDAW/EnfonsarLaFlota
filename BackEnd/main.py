from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import barcos as b
import generadorID as id

# Crear la aplicación
app = FastAPI(title="Hundir la flota", version="1.0.0")
mi_taulell = b.taulell(7,7) 

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # Permitir el origen de tu front-end
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta raíz
@app.get("/")
def read_root():
    return {"mensaje": "Hundir la flota!"}

@app.get("/createGame/{game_id}/{PoX}/{PoY}")
def crear_juego(game_id: str, PoX: int, PoY: int):
    resultado = mi_taulell.crear_matriz(PoX, PoY)
    if isinstance(resultado, str):  # Si da error enseña el mensaje
        return {"error": resultado}
    else:  # Si funciona, genera barcos automáticamente
        mi_taulell.generar_barcos_automaticos()
        return {
            "game_id": game_id,
            "matrix": resultado,
            "barcos": [
                {
                    "tamaño": barco.tamaño,
                    "coordenadas": barco.cords
                }
                for barco in mi_taulell.lista_barcos
            ],
            "status": "created successfully",
            "size": {"rows": PoX, "cols": PoY}
        }


@app.get("/createShipSmall/{game_id}")
def crear_barcoS(game_id: str):
    nuevo_barco = b.barcos(1, mi_taulell)
    resultado = nuevo_barco.crear_barcoPequeño()
    return{
        "game_id": game_id,
        "barco": resultado,
        "status": "created successfully"
    }

@app.get("/createShipBig/{game_id}/{medida}")
def crear_barcoB(game_id: str, medida: int):
    nuevo_barco = b.barcos(medida, mi_taulell)
    resultado = nuevo_barco.crear_barcoGrande(medida)
    if isinstance(resultado, str):  # Si da error enseña el mensaje
        return {"error": resultado}
    else:  # Si funciona da el resultado
        return{
            "game_id": game_id,
            "barco": resultado,
            "status": "created successfully"
        }

@app.get("/shot/{game_id}/{PoX}/{PoY}")
def crear_disparo(game_id: str, PoX: int, PoY: int):
    if mi_taulell.lista_barcos:
        resultado = mi_taulell.lista_barcos[0].disparo(PoX, PoY)
    else:
        resultado = {"error": "No hay barcos creados"}
    return{
        "game_id": game_id,
        "resultado del disparo": resultado,
        "status": "created succesfully"
    }

@app.get("/game/{game_id}/")
def juego(game_id: str):
    resultado = mi_taulell.mostrar_partida()
    return{
        "game_id": game_id,
        "partida": resultado,
        "status": "created successfully"
    }

