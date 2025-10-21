from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import barcos as b
import generadorID as id

# Crear la aplicación
app = FastAPI(title="Hundir la flota", version="1.0.0")
mi_taulell = b.taulell(7,7) 
mi_barco = b.barcos(1, mi_taulell)
# Ruta raíz
@app.get("/")
def read_root():
    return {"mensaje": "Hundir la flota!"}

@app.get("/createGame/{game_id}/{PoX}/{PoY}")
def crear_juego(game_id: str,PoX: int, PoY: int):
    resultado = mi_taulell.crear_matriz(PoX, PoY) 
    
    if isinstance(resultado, str):  # Si da error enseña el mensaje
        return {"error": resultado}
    else:  # Si funciona da el resultado
        return {
            "game_id": game_id,
            "matrix": resultado,
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

@app.get("/createShipBig/{game_id}/{tamaño}")
def crear_barcoB(game_id: str, tamaño: int):
    nuevo_barco = b.barcos(tamaño, mi_taulell)
    resultado = nuevo_barco.crear_barcoGrande(tamaño)
    return{
        "game_id": game_id,
        "barco": resultado,
        "status": "created successfully"
    }

@app.get("/shot/{game_id}/{PoX}/{PoY}")
def crear_disparo():
    return

@app.get("/game/{game_id}/")
def juego():
    return

