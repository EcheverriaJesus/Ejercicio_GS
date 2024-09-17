import psycopg2, threading
from decouple import config

class PostgreSQL(object):
	bloqueo_instancia = threading.Lock()
	instancia = None

	def __init__(self) -> None:
		self.ip: str = config("IP_POSTGRE_SQL")
		self.puerto: int = config("PUERTO_POSTGRE_SQL")
		self.usuario: str = config("USUARIO_POSTGRE_SQL")
		self.contrasenia: str = config("CONTRASENIA_POSTGRE_SQL")
		self.base_datos: str = config("BASE_DATOS_POSTGRE_SQL")
		self.esquema: str = config("ESQUEMA_POSTGRE_SQL")
		self.conexion = None

	@classmethod
	def crear_instancia(cls) -> "PostgreSQL":
		if (cls.instancia is None):
			with cls.bloqueo_instancia:
				if (cls.instancia is None):
					cls.instancia = cls()
		return cls.instancia

	def abrir_conexion(self) -> psycopg2.extensions.connection:
		if self.conexion is None or self.conexion.closed != 0:
			try:
				self.conexion = psycopg2.connect(host = self.ip, port = self.puerto, database = self.base_datos, user = self.usuario, password = self.contrasenia, options = f'-c search_path="{ self.esquema }"')
				print("Conexión a PostgreSQL establecida correctamente.")
			except Exception as ex:
				self.conexion = None
		return self.conexion

	def cerrar_conexion(self) -> None:
		self.conexion = None
		self.instancia = None
		print("Conexión a PostgreSQL cerrada correctamente.")