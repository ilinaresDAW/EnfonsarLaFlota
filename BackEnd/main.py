from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Crear la aplicación
app = FastAPI(tittle="Hundir la flota", version="1.0.0")

# Ruta raíz
@app.get("/")
def read_root():
    return {"mensaje": "Hundir la flota!"}

@app.get("/createGame/{game_id}/{dimension}/{nom}")
def crear_juego():
    return


@app.get("/shot/{game_id}/{cordsDisparo}")
def crear_disparo():
    return

@app.get("/game/{game_id}/")
def juego():
    return

