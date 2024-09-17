from typing import Dict, Optional, Any
from psycopg2.extensions import cursor as PsycopgCursor
from ..database.postgre_sql import PostgreSQL
from datetime import datetime
from psycopg2 import IntegrityError

class ServicioEmpleado(object):

    def __init__(self):
        self.instancia = PostgreSQL.crear_instancia()
        
    def insertar_empleado(self, modelo_datos) -> Dict[str, Optional[Any]]:
        resultado: Dict[str, Optional[Any]] = {
            'mensaje' : None,
            'codigo' : None
        }
        cursor = None
        try:
            with self.instancia.abrir_conexion() as conexion:
                if (conexion is None):
                    resultado['mensaje'] = 'No se pudo establecer conexión hacia la base de datos de PostgreSQL'
                    resultado['codigo'] = 500
                else:
                    fecha_actual = datetime.now()
                    FUNCION_SQL = "INSERT INTO public.empleado (nombre, apellido_paterno, apellido_materno, numero_empleado, fecha_alta, rfc, curp, nss) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id"
                    parametros = (
                        modelo_datos['nombre'],
                        modelo_datos['apellidoPaterno'],
                        modelo_datos['apellidoMaterno'],
                        modelo_datos['numeroEmpleado'],
                        fecha_actual,
                        modelo_datos['rfc'],
                        modelo_datos['curp'],
                        modelo_datos['numeroSeguroSocial']
                    )
                    cursor: PsycopgCursor = conexion.cursor()
                    cursor.execute(FUNCION_SQL, parametros)
                    conexion.commit()
                    fila = cursor.fetchone()
                    if fila:
                        resultado['mensaje'] = 'registrado'
                        resultado['codigo'] = 201
                    else:
                        resultado['mensaje'] = 'No se pudo insertar el registro en la Base de Datos'
                        resultado['codigo'] = 500
        except IntegrityError as ex:
            if ex.pgcode == '23505':  # Código de error para violación de unicidad
                resultado['mensaje'] = 'El número de empleado ya existe en la base de datos.'
                resultado['codigo'] = 400
        except Exception as ex:
            print(ex)
            resultado['mensaje'] = f'Hubo un error al procesar la solicitud con la información de la Base de Datos'
            resultado['codigo'] = 500
        finally:
            if(cursor is not None):
                cursor.close()
            self.instancia.cerrar_conexion()
        return resultado