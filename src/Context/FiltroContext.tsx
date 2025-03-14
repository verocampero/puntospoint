import React, { createContext, useState, useContext, useMemo } from "react";

interface FiltroContextType {
  tipoFiltro: string[];
  setTipoFiltro: (tipo: string[]) => void;
  tiempoFiltro: string;
  setTiempoFiltro: (tiempo: string) => void;
}

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

/**
 * Proveedor de contexto para los filtros de la aplicación.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos secundarios que serán envueltos por el proveedor.
 * 
 * @returns {JSX.Element} Un proveedor de contexto que envuelve a sus hijos y proporciona el estado y las funciones para manejar los filtros.
 * 
 * @example
 * ```tsx
 * import { FiltroProvider } from './Context/FiltroContext';
 * 
 * const App = () => (
 *   <FiltroProvider>
 *     <YourComponent />
 *   </FiltroProvider>
 * );
 * ```
 * 
 * @context
 * @property {string[]} tipoFiltro - Estado que almacena los tipos de filtro seleccionados.
 * @property {Function} setTipoFiltro - Función para actualizar el estado de tipoFiltro.
 * @property {string} tiempoFiltro - Estado que almacena el filtro de tiempo seleccionado.
 * @property {Function} setTiempoFiltro - Función para actualizar el estado de tiempoFiltro.
 */
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