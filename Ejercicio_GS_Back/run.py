from app import iniciar
from fastapi import FastAPI
import uvicorn

aplicacion: FastAPI = iniciar()

if __name__ == "__main__":
    uvicorn.run('run:aplicacion', host = "127.0.0.2", port = 8000)