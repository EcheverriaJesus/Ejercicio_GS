import axios from "axios";
import React, { useEffect, useState } from "react";

interface StatusResponse {
  mensaje: string;
  folio: string;
}

const Status: React.FC = () => {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get<StatusResponse>('http://127.0.0.2:8000/practica-gs/v1/status');
        console.log("Respuesta de la API:", response.data);
        setStatus(response.data);
      } catch (err) {
        setError('Error al obtener el status de la API.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-white">Estado de la API:</h1>
      <p className="text-white">Mensaje: {status?.mensaje}</p>
      <p className="text-white">Folio: {status?.folio}</p>
    </div>
  );
};

export default Status;
