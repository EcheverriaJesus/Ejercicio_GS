import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

interface Empleado {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numeroEmpleado: number;
  numeroSeguroSocial: number;
  rfc: string;
  curp: string;
}

interface PostResponse {
  mensaje: string;
  folio: string;
}

const AgregarEmpleado: React.FC = () => {
  const [empleado, setEmpleado] = useState<Empleado>({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    numeroEmpleado: 0,
    numeroSeguroSocial: 0,
    rfc: "",
    curp: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpleado((prevEmpleado) => ({
      ...prevEmpleado,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    try {
      const res = await axios.post<PostResponse>(
        'http://127.0.0.2:8000/practica-gs/v1/empleados',
        empleado
      );
      toast.success(`Empleado creado con éxito: ${res.data.folio}`);
    } catch (err) {
      toast.error("Error al agregar el empleado.");
      console.error("Error al realizar la solicitud POST:", err);
    }
  };

  return (
    <div className="">
      <Toaster position="top-center" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="relative h-auto w-full min-w-[200px] mt-2 space-y-4 flex flex-col justify-center items-center"
      >
        <div className="relative h-auto w-full min-w-[200px] mt-2">
          <input required
            type="text"
            name="nombre"
            placeholder=""
            value={empleado.nombre}
            onChange={handleChange}
            className="peer h-full w-full rounded-md border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500  peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent text-black"
          >
            Nombre
          </label>
        </div>

        <div className="relative h-auto w-full min-w-[200px] mt-2">
          <input required
            type="text"
            name="apellidoPaterno"
            placeholder=""
            value={empleado.apellidoPaterno}
            onChange={handleChange}
            className="peer h-full w-full rounded-md border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500  peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent text-black"
          >
            Apellido Paterno
          </label>
        </div>

        <div className="relative h-auto w-full min-w-[200px] mt-2">
          <input required
            type="text"
            name="apellidoMaterno"
            placeholder=""
            value={empleado.apellidoMaterno}
            onChange={handleChange}
            className="peer h-full w-full rounded-md border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500  peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent text-black"
          >
            Apellido Materno
          </label>
        </div>

        <div className="relative h-auto w-full min-w-[200px] mt-2">
          <input required
            type="number"
            name="numeroEmpleado"
            placeholder=""
            value={empleado.numeroEmpleado}
            onChange={handleChange}
            className="peer h-full w-full rounded-md border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500  peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent text-black"
          >
            Número de empleado
          </label>
        </div>

        <div className="relative h-auto w-full min-w-[200px] mt-2">
          <input required
            type="number"
            name="numeroSeguroSocial"
            placeholder=""
            value={empleado.numeroSeguroSocial}
            onChange={handleChange}
            className="peer h-full w-full rounded-md border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500  peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent text-black"
          >
            Número de seguro social
          </label>
        </div>
       
        <div className="relative h-auto w-full min-w-[200px] mt-2">
          <input required
            type="text"
            name="rfc"
            placeholder=""
            value={empleado.rfc}
            onChange={handleChange}
            className="peer h-full w-full rounded-md border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500  peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent text-black"
          >
            RFC con homoclave
          </label>
        </div>

        <div className="relative h-auto w-full min-w-[200px] mt-2">
          <input required
            type="text"
            name="curp"
            placeholder=""
            value={empleado.curp}
            onChange={handleChange}
            className="peer h-full w-full rounded-md border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500  peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent text-black"
          >
              CURP
          </label>
        </div>
        <button
          type="submit"
          className="text-white inline-flex justify-center whitespace-nowrap rounded-lg px-8 py-2.5 text-sm font-medium bg-blue-500 shadow relative before:absolute before:inset-0 before:rounded-[inherit] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms] hover:scale-95 hover:duration-200"
        > Registrar
        </button>
      </form>
    </div>
  );
};

export default AgregarEmpleado;
