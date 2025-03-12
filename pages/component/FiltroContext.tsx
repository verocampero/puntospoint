import React, { createContext, useState, useContext } from "react";

interface FiltroContextType {
  tipoFiltro: string[]; // Cambiar a un array de strings
  setTipoFiltro: (tipo: string[]) => void; // Aceptar un array de filtros
  tiempoFiltro: string;
  setTiempoFiltro: (tiempo: string) => void;
}

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

export const FiltroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializar tipoFiltro como un array vacío
  const [tipoFiltro, setTipoFiltro] = useState<string[]>(["Clientes"]);
  const [tiempoFiltro, setTiempoFiltro] = useState("Hoy");

  return (
    <FiltroContext.Provider value={{ tipoFiltro, setTipoFiltro, tiempoFiltro, setTiempoFiltro }}>
      {children}
    </FiltroContext.Provider>
  );
};

export const useFiltro = () => {
  const context = useContext(FiltroContext);
  if (!context) {
    throw new Error("useFiltro debe usarse dentro de un FiltroProvider");
  }
  return context;
};
