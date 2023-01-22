import React, { useEffect, useState } from "react";
import resultSet from "../store/interfaces/resultSet.interface";
import axios from "axios";
import indicador from "../store/interfaces/indicador.interface";
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]
export const IndicadoresPage = () => {
  // author:string,
  // version:string;
  // fecha: string,
  
  const [indicadores, setIndicadores] = useState<resultSet>();
  const [fecha, setFecha] = useState<string>();

  useEffect(() => {
    getIndicadores();
  }, []);

  const getIndicadores = async () => {
    const api_url: string = process.env.REACT_APP_API;

    const resp = await axios.get<any>(api_url);
    const fecha: string = resp.data.fecha;
    setFecha(new Date(fecha).toLocaleDateString('es-cl',{year:"numeric",month:"long",day:"2-digit"}))
    setIndicadores(resp.data);
  };

  if (!indicadores) return null;
  return (
    <div className="container my-auto mt-4 mx-auto px-4 sm:px-6 lg:px-8">
      
      <h3 className="text-lg font-medium leading-6 text-gray-900">Fecha de valores {fecha}</h3>
      
      <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className=" px-2 text-sm text-gray-500">Valores internacionales</span>
      </div>
    </div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {indicadorElement(indicadores.dolar)}
        {indicadorElement(indicadores.euro)}
        {indicadorElement(indicadores.bitcoin)}
      </dl>


      <div className="relative mt-3">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className=" px-2 text-sm text-gray-500">Valores nacionales</span>
      </div>
    </div>
      
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">

        {indicadorElement(indicadores.uf)}
        {indicadorElement(indicadores.utm)}
        {indicadorElement(indicadores.libra_cobre)}

      </dl>

    </div>
  );
};



const indicadorElement = (item:indicador) => {
  
    return(<div key={item.nombre} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <dt className="truncate text-sm font-medium text-gray-500">{item.nombre}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.valor}</dd>
    </div>)
  
}