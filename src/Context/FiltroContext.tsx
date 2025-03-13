import React, { createContext, useState, useContext, useMemo } from "react";

interface FiltroContextType {
  tipoFiltro: string[];
  setTipoFiltro: (tipo: string[]) => void;
  tiempoFiltro: string;
  setTiempoFiltro: (tiempo: string) => void;
}

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

export const FiltroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tipoFiltro, setTipoFiltro] = useState<string[]>(["Clientes"]);
  const [tiempoFiltro, setTiempoFiltro] = useState("Hoy");

  // Memoiza el valor del contexto
  const value = useMemo(() => ({
    tipoFiltro,
    setTipoFiltro,
    tiempoFiltro,
    setTiempoFiltro,
  }), [tipoFiltro, tiempoFiltro]);

  return (
    <FiltroContext.Provider value={value}>
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