from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Crear la aplicación
app = FastAPI(tittle="Hundir la flota", version="1.0.0")

# Ruta raíz
@app.get("/")
def read_root():
    return {"mensaje": "Hundir la flota!"}

@app.get("/createGame/{game_id}/{PoX}/{PoY}/{nom}")
def crear_juego():
    return

@app.get("/createShip/{game_id}/{Size}")
def crear_barco():
    return

@app.get("/shot/{game_id}/{PoX}/{PoY}")
def crear_disparo():
    return

@app.get("/game/{game_id}/")
def juego():
    return

