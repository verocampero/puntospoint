import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Box, Link } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const fetchGraficoData = async () => {
  const response = await fetch("/api/datos");
  if (!response.ok) {
    throw new Error("Error al obtener los datos del gráfico");
  }
  const data = await response.json();
  return data.grafico;
};

const DashboardChart: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["grafico"],
    queryFn: fetchGraficoData,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error instanceof Error)
    return <p>Error al cargar datos: {error.message}</p>;

  console.log(data);

  const chartData = data.horas.map((hora: string, index: number) => ({
    hora,
    clientesNuevos: data.clientes_nuevos[index] || 0,
    compraron: data.compraron[index] || 0,
  }));

  return (
    <Box sx={{ textAlign: "center", p: 1, width: "1042px", height: "456px" }}>
      <ResponsiveContainer width={948} height={320}>
        <BarChart data={chartData} barSize={60}>
          <XAxis dataKey="hora" />
          <YAxis
            domain={["dataMin - 10", "dataMax"]}
            ticks={[0, 5, 8, 10, 20, 40, 60, 80, 100]}
            tickMargin={10}
            interval={0}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="clientesTotales"
            fill="#EB3535"
            style={{ opacity: "80%" }}
            name="Clientes Totales"
          />
          <Bar dataKey="clientesNuevos" fill="#FF6B6B" name="Clientes Nuevos" />
          <Bar dataKey="compraron" fill="#3B82F6" name="Compraron" />
          <Bar dataKey="noCompraron" fill="#4CAF50" name="No compraron" />
        </BarChart>
      </ResponsiveContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Link
          href="/"
          sx={{
        color: "#644BBA",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
          }}
        >
          <DownloadIcon sx={{ mr: 1 }} /> Exportar tabla
        </Link>
      </Box>
    </Box>
  );
};

export default DashboardChart;
