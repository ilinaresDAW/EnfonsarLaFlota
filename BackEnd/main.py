from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import barcos as b
import generadorID as id

# Crear la aplicación
app = FastAPI(tittle="Hundir la flota", version="1.0.0")
mi_taulell = b.taulell(7,7) 
mi_barco = b.barcos(1, mi_taulell)
# Ruta raíz
@app.get("/")
def read_root():
    return {"mensaje": "Hundir la flota!"}

@app.get("/createGame/{game_id}/{PoX}/{PoY}")
def crear_juego(game_id: str,PoX: int, PoY: int): # Crear instancia
    resultado = mi_taulell.crear_matriz(PoX, PoY)  # Store the result
    
    if isinstance(resultado, str):  # If it's an error message
        return {"error": resultado}
    else:  # If it's the matrix
        return {
            "game_id": game_id,
            "matrix": resultado,
            "status": "created successfully",
            "size": {"rows": PoX, "cols": PoY}
        }


@app.get("/createShipSmall/{game_id}")
def crear_barco(game_id: str):
    resultado = mi_barco.crear_barcoPequeño()
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

