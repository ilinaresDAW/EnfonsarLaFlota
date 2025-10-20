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
    def __init__(self, tamaño ):
        self.tamaño = tamaño
        self.cords = []
    
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
            PoX = rd.randint(0, self.taulell.Filas - 1)  # 👈 self.taulell
            PoY = rd.randint(0, self.taulell.Columnas - 1)
            
            if (PoX, PoY) in self.taulell.cords_ocupadas():  # 👈 self.taulell
                continue  # Sigue buscando
            else:
                self.cords = [(PoX, PoY)]  # Lista de tuplas
                self.tamaño = 1
                self.taulell.añadirlistabarco(self)  # 👈 self (instancia actual)
                salir = False
        
        return self.cords
    
    def crear_barcoGrande(self, tamaño):
        salir = True
        ocupado = taulell.cords_ocupadas
        cordsBarco = []
        cordsTemp = []
        while salir:
            PoX = rd.randint(0, taulell.Filas - 1)
            PoY = rd.randint(0, taulell.Columnas - 1)
            cordUsarX1 = self.comprobar_direccion(PoX, PoY, "X1", tamaño)
            cordUsarX2 = self.comprobar_direccion(PoX, PoY, "X2", tamaño)
            cordUsarY2 = self.comprobar_direccion(PoX, PoY, "Y2", tamaño)
            cordUsarY1 = self.comprobar_direccion(PoX, PoY, "Y1", tamaño)
            if not cordUsarX1 and not cordUsarX2 and not cordUsarY1 and not cordUsarY2:
                pass
            else:
                for i in cordUsarX1:
                    if i == ocupado:
                        cordsTemp.clear
                        break
                    else:
                        cordsTemp.append(i)
                if cordsTemp != cordUsarX1:
                    for i in cordUsarX2:
                        if i == ocupado:
                            cordsTemp.clear
                            break
                        else:
                            cordsTemp.append(i)
                if cordsTemp != cordUsarX2:
                    for i in cordUsarY1:
                        if i == ocupado:
                            cordsTemp.clear
                            break
                        else:
                            cordsTemp.append(i)
                if cordsTemp != cordUsarY1:
                    for i in cordUsarY2:
                        if i == ocupado:
                            cordsTemp.clear
                            break
                        else:
                            cordsTemp.append(i)
            cordsBarco = cordsTemp
            self.tamaño = tamaño
            self.cords = cordsBarco
            taulell.añadirlistabarco(barcos)
            salir = False
            

            

