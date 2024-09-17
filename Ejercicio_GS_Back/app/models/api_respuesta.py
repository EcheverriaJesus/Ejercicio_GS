from fastapi.responses import JSONResponse
from typing import Any, Dict, Union
from decouple import config

class APIRespuesta(object):
    
    def __init__(self) -> None:
        pass
    INFO: str = config('INFORMACION')
    VERSION: str = config('VERSION')
    API: str = config('API')

    @classmethod
    def solicitud_correcta(cls, resultado: Any, folio: str) -> JSONResponse:
        respuesta: Dict[str, Union[str, Any]] = {
            'mensaje': 'Operación exitosa',
            'folio': str(folio)
        }
        tipo_dato = type(resultado)
        if resultado and tipo_dato == list:
            respuesta['resultado'] = {
				'registros': resultado
			}
        elif resultado and tipo_dato == dict:
            respuesta['resultado'] = resultado
        return JSONResponse(content = respuesta, status_code = 200)
    
    @classmethod
    def solicitud_creada(cls, folio: str) -> JSONResponse:
        respuesta: Dict[str, Union[str, Any]] = {
            'mensaje': 'Operación exitosa',
            'folio': str(folio)
        }
        return JSONResponse(content = respuesta, status_code = 201)
    
    @classmethod
    def solicitud_incorrecta(cls, errores: Any, folio: str) -> JSONResponse:
        respuesta: Dict[str, Union[str, Any]] = {
  			'codigo': f'400.{ cls.API }.{ cls.VERSION }',
  			'mensaje': 'Petición no válida, favor de validar su información',
  			'folio': str(folio),
  			'info': f'{ cls.INFO }400.{ cls.API }.{ cls.VERSION }',
  			'detalles': errores
  		}
        return JSONResponse(content = respuesta, status_code = 400)
    
    @classmethod
    def no_autorizada(cls, errores: Any, folio: str) -> JSONResponse:
        respuesta: Dict[str, Union[str, Any]] = {
  			'codigo': f'401.{ cls.API }.{ cls.VERSION }',
  			'mensaje': 'Acceso no autorizado al recurso',
  			'folio': str(folio),
  			'info': f'{ cls.INFO }401.{ cls.API }.{ cls.VERSION }',
  			'detalles': errores
  		}
        return JSONResponse(content = respuesta, status_code = 401)
    
    @classmethod
    def informacion_no_encontrada(cls, error: Any,folio: str) -> JSONResponse:
        respuesta: Dict[str, Union[str, Any]] = {
			'codigo': f'404.{ cls.API }.{ cls.VERSION }',
			'mensaje': 'Información no encontrada',
			'folio': str(folio),
			'info': f'{ cls.INFO }404.{ cls.API }.{ cls.VERSION }',
			'detalles': [
				str(error)
			]
		}
        return JSONResponse(content = respuesta, status_code = 404)
    
    @classmethod
    def error_interno_del_servidor(cls, errores: Any, folio: str) -> JSONResponse:
        respuesta: Dict[str, Union[str, Any]] = {
			'codigo': f'500.{ cls.API }.{ cls.VERSION }',
			'mensaje': 'Error interno del servidor',
			'folio': str(folio),
			'info': f'{ cls.INFO }500.{ cls.API }.{ cls.VERSION }',
			'detalles': [
				str(errores)
			]
		}
        return JSONResponse(content = respuesta, status_code = 500)