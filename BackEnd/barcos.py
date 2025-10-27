import random as rd


# Clase taulell
class taulell:
    
    def __init__(self, filas, columnas):
        self.Filas = filas
        self.Columnas = columnas
        self.tabla = []
        self.lista_barcos = []
        self.puntuacion = 1000
        self.historial_disparos = []
        self.barcosHundidos = 0
        self.casillasMarcadas = 0

    # Añadir barcos desde la clase barcos
    def añadirlistabarco (self, barcos):
        self.lista_barcos.append(barcos)

    # Crear la matriz y devolver mensaje si está mal
    def crear_matriz(self, filas, columnas):
        if filas < 7 or columnas < 7: 
            return "La matriz debe ser mayor a 7x7"
        else:  
            self.Filas = filas
            self.Columnas = columnas
            matriz = []
            for i in range(filas):
                fila = []
                for j in range(columnas):
                    fila.append("X")
                matriz.append(fila)
            self.tabla = matriz
            self.lista_barcos = []      
            self.historial_disparos = []  
            self.puntuacion = 1000  
            return self.tabla
    
    def cleanPartida(self):
        self.Filas = 0
        self.Columnas = 0
        self.tabla = []
        self.lista_barcos = []
        self.puntuacion = 1000
        self.historial_disparos = []

    
    def generar_barcos_auto(self):
        totalMatriz = self.Filas * self.Columnas
        maxTamaño = int(totalMatriz * 0.33)  # Max 33% de las celdas
        celdasOcupadas = 0
        tamañoDisponible = [1, 2, 3, 4, 5]  
        max_intentos = 1000  #Creo esta variable de intentos para q no este siemple en un constante bucle y no se pete, es decir, un limite
        intentos = 0

        barco1.minimos_barcos()#Creo los barcos minimos para la martiz
        while celdasOcupadas < maxTamaño and intentos < max_intentos:
            tamaño = rd.choice(tamañoDisponible)  # Seleccionar tamaño aleatorio
            if celdasOcupadas + tamaño > maxTamaño:
                intentos += 1
                continue
            barco1 = barcos(tamaño, self)
            if tamaño == 1:
                resultado = barco1.crear_barcoPequeño()
            else:
                resultado = barco1.crear_barcoGrande(tamaño)
            if isinstance(resultado, str):  # Si hay error, intentar de nuevo
                intentos += 1
                continue
            celdasOcupadas += tamaño  # Actualizar celdas ocupadas
            intentos = 0  # Resetear intentos tras éxito
        if intentos >= max_intentos:
            print("Deja de funcionar por bucle infinito MAX INTNETOS")
    
    
    
    # Verificar si ya hay algún barco con esas coordenadas
    def cords_ocupadas(self):
        ocupadas = set()# Lo paso a set para mejor rendimiento
        for barco in self.lista_barcos:
            ocupadas.update(barco.cords) 
        return ocupadas
    
    # Muestro la partida del jugador ID
    def mostrar_partida(self):
        return {
            "matriz": self.tabla,
            "barcos": [
                {
                    "tamaño": barco.tamaño,
                    "coordenadas": barco.cords,
                    "estado": "activo" if len(barco.cords) > 0 else "hundido"
                }
                for barco in self.lista_barcos
            ],
            "puntuacion": self.puntuacion,
            "historial_disparos": self.historial_disparos
        }
    
    #registrar los dipsaros y los puntos acorde a la palabra
    def registrar_disparo(self,resultado, PoX, PoY):
            puntos = 0
            if resultado == "agua":
                puntos = -10
            elif resultado == "tocado":
                puntos = +20
            elif resultado == "hundido":
                puntos = +50
            self.historial_disparos.append({
            "coordenadas": (PoX, PoY),
            "resultado": resultado,
            "puntos": puntos
            })
            if resultado == "agua":
                self.puntuacion -= 10
            elif resultado == "tocado":
                self.puntuacion += 20
            elif resultado == "hundido":
                self.puntuacion += 50 
                self.barcosHundidos += 1

    def registrar_casilla(Self):
        Self.casillasMarcadas += 1


# Clase barocs

class barcos:
    def __init__(self, tamaño, taulell = None  ):#pongo taulell q es none ya q si creo barco no podria acceder a los datos del taulell
        self.tamaño = tamaño
        self.cords = []
        self.taulell = taulell
    
    # compruebo si no me salgo de la matriz em todos los lados, si es el caso q en un lado funciona paso solamente ese
    def comprobar_direccion(self, PoX, PoY, direccion, tamaño):
        coords = []
        if direccion == 'X1':  # Horizontal derecha
            if PoX + (tamaño - 1) >= self.taulell.Filas:
                return []
            for i in range(tamaño):
                coords.append((PoX + i, PoY))
        elif direccion == "X2":   # Horizontal izquierda
            if PoX - (tamaño - 1) < 0:
                return []
            for i in range(tamaño):
                coords.append((PoX - i, PoY))
        elif direccion == 'Y2':  # Vertical abajo
            if PoY + (tamaño - 1) >= self.taulell.Columnas:
                return []
            for i in range(tamaño):
                coords.append((PoX, PoY + i))
        elif direccion == "Y1": # Vertical arriba
            if PoY - (tamaño - 1) < 0:
                return []
            for i in range(tamaño):
                coords.append((PoX, PoY - i))
        return coords
    
    def minimos_barcos(self):
        medidas = [1, 2, 3, 4, 5]
        for tamaño in medidas:
            barco = barcos(tamaño, self)
            if tamaño == 1:
                barco.crear_barcoPequeño()
            else:
                barco.crear_barcoGrande(tamaño)
    
    # creo barco pequeño usando funcionas ya creadas para ayudarme
    def crear_barcoPequeño(self):
        salir = True
        while salir:
            PoX = rd.randint(0, self.taulell.Filas - 1)  
            PoY = rd.randint(0, self.taulell.Columnas - 1)
            
            if (PoX, PoY) in self.taulell.cords_ocupadas():  
                continue  # sigue buscando
            else:
                self.cords = [(PoX, PoY)]
                self.tamaño = 1
                self.taulell.añadirlistabarco(self) 
                salir = False
        
        return self.cords
    
    def crear_barcoGrande(self, tamaño):
        if tamaño > 5:
            return "Tamaño incorrecto"
        else:
            salir = True
            while salir:
                PoX = rd.randint(0, self.taulell.Filas - 1)
                PoY = rd.randint(0, self.taulell.Columnas - 1)
                
                direcciones = [
                    self.comprobar_direccion(PoX, PoY, "X1", tamaño),
                    self.comprobar_direccion(PoX, PoY, "X2", tamaño),
                    self.comprobar_direccion(PoX, PoY, "Y1", tamaño),
                    self.comprobar_direccion(PoX, PoY, "Y2", tamaño)
                ]
                for coords in direcciones:
                    if len(coords) == tamaño:
                        ocupado = self.taulell.cords_ocupadas() 
                        if all(coord not in ocupado for coord in coords):
                            self.cords = coords
                            self.tamaño = tamaño
                            self.taulell.añadirlistabarco(self)
                            salir = False
                            break        
            return self.cords

    def disparo(self, PoX, PoY):        
        if PoX >= self.taulell.Filas or PoY >= self.taulell.Columnas or PoX < 0 or PoY < 0:
            return "Fuera de la tabla"
        else:
            barco_tocado = None # Cambiar de 0 a None ya q detecta 0 cada vez q lo busca en vez de las cords(basicamente es false)
            for barco in self.taulell.lista_barcos:
                if(PoX, PoY) in barco.cords:
                    barco_tocado = barco
                    break
            taulell.registrar_casilla()
            if barco_tocado == None:
                resultado = "agua"
                taulell.registrar_disparo(resultado, PoX, PoY)
                return {
                    "valor": "agua",
                    "resultado": resultado,
                    "coordenadas": (PoX, PoY),
                    "puntos": -10,
                    "total_puntos": self.taulell.puntuacion
                }  
            barco_tocado.cords.remove((PoX, PoY))
            if len(barco_tocado.cords) == 0:  
                resultado = "hundido"
                taulell.registrar_disparo(resultado, PoX, PoY)  
                return{
                    "valor": "barco",
                    "resultado": resultado,
                    "coordenadas": (PoX, PoY),
                    "puntos": +50,
                    "total_puntos": self.taulell.puntuacion
                } 
            else:
                resultado = "tocado"
                taulell.registrar_disparo(resultado, PoX, PoY)
                return {
                    "resultado": "tocado",
                    "coordenadas": (PoX, PoY),
                    "barco_tamaño": barco_tocado.tamaño,
                    "puntos_ganados": +20,
                    "total_puntos": self.taulell.puntuacion
                }
