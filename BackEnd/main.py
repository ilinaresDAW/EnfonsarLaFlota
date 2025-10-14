from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Crear la aplicación
app = FastAPI(tittle="Hundir la flota", version="1.0.0")

# Ruta raíz
@app.get("/")
def read_root():
    return {"mensaje": "Hundir la flota!"}

@app.get("/createGame/{game_id}/{dimension}/{nom}")

@app.get("/shot/{game_id}/{cordsDisparo}")

@app.get("/game/{game_id}/")



# Para añadir al compa
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
