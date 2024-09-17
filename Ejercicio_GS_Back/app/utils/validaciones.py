import re

class ValidarParametros:
    def Validar(self, cuerpo):
        errores_requeridos = []
        errores_longitud = []
        """ errores_rfc = [] """

        parametros_requeridos = [
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "numeroEmpleado",
            "numeroSeguroSocial",
            "rfc",
            "curp"
        ]

        # Verificar los parámetros requeridos
        for parametro in parametros_requeridos:
            if parametro not in cuerpo or not cuerpo[parametro]:
                errores_requeridos.append(parametro)
        
        # Validar la longitud del campo 'nombre'
        if "nombre" in cuerpo and cuerpo["nombre"]:
            if not (3 <= len(cuerpo["nombre"]) <= 50):
                errores_longitud.append("nombre")

        # Validar la longitud del campo 'apellidoPaterno'
        if "apellidoPaterno" in cuerpo and cuerpo["apellidoPaterno"]:
            if not (3 <= len(cuerpo["apellidoPaterno"]) <= 50):
                errores_longitud.append("apellidoPaterno")

        # Validar la longitud del campo 'apellidoMaterno'
        if "apellidoMaterno" in cuerpo and cuerpo["apellidoMaterno"]:
            if not (3 <= len(cuerpo["apellidoMaterno"]) <= 50):
                errores_longitud.append("apellidoMaterno")
                     
        # Construir mensajes de error
        mensajes = []
        if errores_requeridos:
            if len(errores_requeridos) == 1:
                mensajes.append(f"El parámetro {errores_requeridos[0]} es requerido.")
            else:
                if len(errores_requeridos) == 2:
                    campos = f"{errores_requeridos[0]} y {errores_requeridos[1]}"
                else:
                    campos = ", ".join(errores_requeridos[:-1]) + f" y {errores_requeridos[-1]}"
                mensajes.append(f"Los parámetros {campos} son requeridos.")
        
        if errores_longitud:
            if len(errores_longitud) == 1:
                mensajes.append(f"El parámetro {errores_longitud[0]} debe tener entre 3 y 50 caracteres.")
            else:
                campos = ", ".join(errores_longitud[:-1]) + f" y {errores_longitud[-1]}"
                mensajes.append(f"Los parámetros {campos} deben tener entre 3 y 50 caracteres.")
        return mensajes
