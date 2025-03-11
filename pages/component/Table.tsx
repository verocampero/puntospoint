import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";

const fetchTransacciones = async () => {
  const res = await fetch("/api/datos");
  if (!res.ok) {
    throw new Error("Error al obtener datos");
  }
  const data = await res.json();
  return data.transacciones;
};

export default function CustomTable() {
  const { data, isLoading, error } = useQuery<{ hora: string; columnas: number[]; total: number }[]>({ queryKey: ["transacciones"], queryFn: fetchTransacciones });

  if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 2 }} />;
  if (error) return <Typography color="error" align="center" mt={2}>Error al cargar los datos</Typography>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto", backgroundColor: "#E6E1E6", marginBottom:'50px'  }}>
      <Table>
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
            <TableCell>Horas</TableCell>
            <TableCell>Column 1</TableCell>
            <TableCell>Column 2</TableCell>
            <TableCell>Column 3</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row, index: number) => (
            <TableRow key={index}>
              <TableCell>{row.hora}</TableCell>
              <TableCell>{row.columnas[0]}</TableCell>
              <TableCell>{row.columnas[1]}</TableCell>
              <TableCell>{row.columnas[2].toFixed(3)}</TableCell>
              <TableCell>{row.total.toFixed(3)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
