import uuid
from fastapi import APIRouter
from ..models.api_respuesta import APIRespuesta

folio: uuid.UUID = uuid.uuid4()
rutas: APIRouter  = APIRouter()

@rutas.get('/status')
def estado_salud():
    try:
        respuesta  = APIRespuesta.solicitud_correcta(None, folio)
    except Exception as ex:
        mensaje: str = 'Error Interno del Servidor'
        respuesta  = APIRespuesta.error_interno_del_servidor(mensaje, folio)
    return respuesta