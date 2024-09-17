from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from .routes import ruta_revisar_salud, ruta_empleado

def iniciar() -> FastAPI:
    aplicacion: FastAPI = FastAPI()
     
    aplicacion.add_middleware(
        CORSMiddleware,
        allow_origins = ['*'],  
        allow_credentials = True,
        allow_methods = ['*'],
        allow_headers = ['*'],
    )
    
    enrutadores = [
     ruta_revisar_salud.rutas,  
     ruta_empleado.rutas   
    ]
    
    RUTA_BASE: str = config('RUTA_BASE')
    
    for enrutador in enrutadores:
        aplicacion.include_router(enrutador, prefix = RUTA_BASE)
    return aplicacion