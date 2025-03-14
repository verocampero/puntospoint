import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const fetchTransacciones = async () => {
  const res = await fetch("/api/datos");
  if (!res.ok) {
    throw new Error("Error al obtener datos");
  }
  const data = await res.json();
  return data.transacciones;
};

/**
 * Componente `CustomTable` que muestra una tabla con datos de transacciones.
 * Utiliza `useQuery` para obtener los datos de las transacciones desde una API.
 * 
 * @returns {JSX.Element} Un componente de tabla que muestra las transacciones.
 * 
 * @component
 * 
 * @example
 * // Uso del componente CustomTable
 * import CustomTable from './Table';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <CustomTable />
 *     </div>
 *   );
 * }
 * 
 * @remarks
 * - Muestra un indicador de carga (`CircularProgress`) mientras se obtienen los datos.
 * - Muestra un mensaje de error (`Typography`) si ocurre un error al cargar los datos.
 * - La tabla se adapta a dispositivos móviles utilizando `useMediaQuery` y `useTheme`.
 * - La tabla tiene un ancho mínimo en dispositivos móviles para permitir el desplazamiento horizontal.
 * 
 * @hook
 * - `useQuery` para obtener los datos de las transacciones.
 * - `useTheme` para obtener el tema actual.
 * - `useMediaQuery` para detectar si el dispositivo es móvil.
 * 
 * @dependencies
 * - `@mui/material`: Componentes de Material-UI.
 * - `react-query`: Para la gestión de datos asíncronos.
 */
export default function CustomTable() {
  const { data, isLoading, error } = useQuery<
    { hora: string; columnas: number[]; total: number }[]
  >({ queryKey: ["transacciones"], queryFn: fetchTransacciones });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading)
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 2 }} />;
  if (error)
    return (
      <Typography color="error" align="center" mt={2}>
        Error al cargar los datos
      </Typography>
    );

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: isMobile ? "100%" : 600,
        margin: "auto",
        backgroundColor: "#E6E1E6",
        marginBottom: "50px",
        overflowX: isMobile ? "auto" : "hidden", // Permite el desplazamiento horizontal en móviles
      }}
    >
      <Table sx={{ minWidth: isMobile ? 600 : "auto" }}> {/* Asegura que la tabla tenga un ancho mínimo en móviles */}
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2} sx={{ fontWeight: "bold" }}>
              HOY
            </TableCell>
            <TableCell align="center" colSpan={3} sx={{ fontWeight: "bold" }}>
              Clientes
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Horas</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Column 1</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Column 2</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Column 3</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: isMobile ? "8px" : "16px" }}>
                  {row.hora}
                </TableCell>
                <TableCell sx={{ padding: isMobile ? "8px" : "16px" }}>
                  {row.columnas[0]}
                </TableCell>
                <TableCell sx={{ padding: isMobile ? "8px" : "16px" }}>
                  {row.columnas[1]}
                </TableCell>
                <TableCell sx={{ padding: isMobile ? "8px" : "16px" }}>
                  {row.columnas[2].toFixed(3)}
                </TableCell>
                <TableCell sx={{ padding: isMobile ? "8px" : "16px" }}>
                  {row.total.toFixed(3)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}