import random as rd


# Clase taulell
class taulell:
    
    def __init__(self, filas, columnas):
        self.Filas = filas
        self.Columnas = columnas
        self.tabla = []
        self.lista_barcos = []

    # creo funcion para añadir barcos desde la clase barcos
    def añadirlistabarco (self, barcos):
        self.lista_barcos.append(barcos)

    # creo la matriz y devuelvo mensaje si esta mal
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
            return self.tabla
    
    # funcion para verificar si ya hay algun barco con esas cords
    def cords_ocupadas(self):
        ocupadas = set()# lo paso a set para mejor rendimiento
        for barco in self.lista_barcos:
            for cord in barco.cords:
                ocupadas.add(cord)
        return ocupadas

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
            #Explicar este for = Pendiente
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
            

            

