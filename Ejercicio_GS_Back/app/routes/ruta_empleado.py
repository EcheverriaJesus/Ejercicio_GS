import uuid
from fastapi import APIRouter, Body
from typing import Dict, Any, List
from ..models.api_respuesta import APIRespuesta
from ..utils.validaciones import ValidarParametros
from ..services.servicio_empelado import ServicioEmpleado

folio: uuid.UUID = uuid.uuid4()
rutas: APIRouter  = APIRouter()
validar_instancia = ValidarParametros()
servicio_empleado = ServicioEmpleado()

@rutas.post('/empleados')
def insertar_sesion(cuerpo: Dict[str, Any] = Body(...)):
    try:
        lista_errores = validar_instancia.Validar(cuerpo)
        if (len(lista_errores) <= 0):
            resultado = servicio_empleado.insertar_empleado(cuerpo)
            if (resultado['codigo'] == 201):
                respuesta = APIRespuesta.solicitud_creada(folio)
            elif (resultado['codigo'] == 400):
                respuesta = APIRespuesta.solicitud_incorrecta(resultado['mensaje'], folio)
            else: 
                respuesta = APIRespuesta.error_interno_del_servidor(resultado['mensaje'], folio)
        else:
            respuesta = APIRespuesta.solicitud_incorrecta(lista_errores, folio)
    except Exception as ex:
        print(ex)
        mensaje: List[str] = [f'Su petición no fue ejecutada de manera correcta: {ex}']
        respuesta = APIRespuesta.solicitud_incorrecta(mensaje, folio)
    return respuesta
