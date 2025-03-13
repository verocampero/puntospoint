import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  CartesianGrid,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Box, Link } from "@mui/material";
import { useFiltro } from "./FiltroContext";
import DownloadIcon from "@mui/icons-material/Download";
import GraficYTG from "../component/GraficYTG"; 

const fetchGraficoData = async (tiempoFiltro: string, tipoFiltro: string) => {
  const response = await fetch(
    `/api/datos?periodo=${tiempoFiltro}&tipo=${tipoFiltro}`
  );
  if (!response.ok) {
    throw new Error("Error al obtener los datos del gráfico");
  }
  return response.json();
};

const DashboardChart: React.FC = () => {
  const { tiempoFiltro, tipoFiltro } = useFiltro();
  const [chartData, setChartData] = useState<any[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["grafico", tiempoFiltro, tipoFiltro],
    queryFn: () => fetchGraficoData(tiempoFiltro, tipoFiltro.join(",")),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!data) return;

    let updatedChartData = [];

    switch (true) {
      case tiempoFiltro === "7D" &&
        tipoFiltro.includes("Dinero") &&
        tipoFiltro.includes("Clientes"):
        updatedChartData = data?.Todo7D?.sieteDias?.map(
          (dia: any, index: number) => ({
            dia,
            clientesNuevos: data?.Todo7D?.clientes_nuevos?.[index] ?? 0,
            compraron: data?.Todo7D?.compraron?.[index] ?? 0,
          })
        );
        break;

      case tiempoFiltro === "7D" &&
        tipoFiltro.includes("Cashback") &&
        tipoFiltro.includes("Clientes"):
        updatedChartData = data?.Cashback?.sieteDias?.map(
          (dia: any, index: number) => ({
            dia,
            clientesNuevos: data?.Cashback?.clientes_nuevos?.[index] ?? 0,
            compraron: data?.Cashback?.compraron?.[index] ?? 0,
          })
        );
        break;

      case tiempoFiltro === "Hoy" && tipoFiltro.includes("Clientes"):
        updatedChartData = data?.grafico?.horas?.map(
          (hora: any, index: number) => ({
            hora,
            clientesNuevos: data?.grafico?.clientes_nuevos?.[index] ?? 0,
            compraron: data?.grafico?.compraron?.[index] ?? 0,
          })
        );
        break;

      case tiempoFiltro === "7D" && tipoFiltro.includes("Clientes"):
        updatedChartData = data?.grafico7D?.sieteDias?.map(
          (dia: any, index: number) => ({
            dia,
            clientesNuevos: data?.grafico7D?.clientes_nuevos?.[index] ?? 0,
            compraron: data?.grafico7D?.compraron?.[index] ?? 0,
          })
        );
        break;

      case tiempoFiltro === "7D" &&
        tipoFiltro.includes("Transacciones") &&
        tipoFiltro.includes("Dinero"):
        updatedChartData = data?.graficoTransacciones?.sieteDias?.map(
          (dia: any, index: number) => ({
            dia,
            transacciones:
              data?.graficoTransacciones?.transacciones?.[index] ?? 0,
          })
        );
        break;

      case tiempoFiltro === "YTD/YTG" && tipoFiltro.includes("Dinero"):
        
        setChartData([]); 
        return; 

      default:
        updatedChartData = [];
    }

    setChartData(updatedChartData);
  }, [data, tiempoFiltro, tipoFiltro]);

  if (isLoading) return <p>Cargando...</p>;
  if (error instanceof Error)
    return <p>Error al cargar datos: {error.message}</p>;

  const isToday = tiempoFiltro === "Hoy";
  const isTransactionActive = tipoFiltro.includes("Transacciones");
  const isYtdYtgActive =
    tiempoFiltro === "YTD/YTG" && tipoFiltro.includes("Dinero");

  const barColors =
    tiempoFiltro === "7D" &&
    tipoFiltro.includes("Clientes") &&
    !tipoFiltro.includes("Dinero") &&
    !tipoFiltro.includes("Cashback")
      ? { clientesNuevos: " #EB7635", compraron: "#358DEB" }
      : tiempoFiltro === "7D" &&
        tipoFiltro.includes("Clientes") &&
        tipoFiltro.includes("Dinero")
      ? { clientesNuevos: "#2DCF5A", compraron: "#358DEB" }
      : tiempoFiltro === "7D" &&
        tipoFiltro.includes("Dinero") &&
        tipoFiltro.includes("Transaccion")
      ? { clientesNuevos: "#358DEB", compraron: "#358DEB" }
      : tiempoFiltro === "7D" &&
        tipoFiltro.includes("Clientes") &&
        tipoFiltro.includes("Cashback")
      ? { clientesNuevos: "#2DCF5A", compraron: "#358DEB" }
      : { clientesNuevos: "#EB7635", compraron: "#3B82F6" };

  return (
    <Box sx={{ textAlign: "center", width: "1042px", height: "456px" }}>
      {isYtdYtgActive ? (
        <GraficYTG  />
      ) : (
        <ResponsiveContainer width={948} height={420}>
          <BarChart data={chartData} barSize={80}>
            <CartesianGrid
                            horizontal={true}
                            vertical={false}
                            stroke="#ccc"
                            strokeDasharray="1 1"
                          />
            <XAxis dataKey={isToday ? "hora" : "dia"} />
            <YAxis
              domain={["dataMin", "dataMax"]}
              ticks={
                isToday
                  ? [0, 5, 8, 10, 20, 40, 60, 80, 100]
                  : [100, 200, 400, 600, 800, 1000, 1500, 2000, 2500]
              }
              tickMargin={15}
              interval="preserveStartEnd"
            />
            {isTransactionActive && (
              <YAxis
                domain={["dataMin", "dataMax"]}
                yAxisId="right"
                orientation="right"
                tickMargin={10}
                interval="preserveStartEnd"
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                ticks={[
                  500000, 750000, 1000000, 2000000, 4000000, 6000000, 8000000,
                  10000000, 15000000,
                ]}
              />
            )}

            <Tooltip />
            <Legend />
            {!isTransactionActive && (
              <>
                <Bar
                  dataKey=""
                  fill={barColors.compraron}
                  name="Clientes Totales"
                />
                <Bar
                  dataKey="clientesNuevos"
                  fill={barColors.clientesNuevos}
                  name="Clientes Nuevos"
                />

                <Bar
                  dataKey="compraron"
                  fill={barColors.compraron}
                  name="Compraron"
                />
                <Bar
                  dataKey=""
                  fill={barColors.clientesNuevos}
                  name="No Compraron"
                />
              </>
            )}
            <Line
              type="monotone"
              dataKey="monto"
              stroke="#D81B60"
              strokeWidth={4}
              yAxisId="right"
              name=""
            />
            {isTransactionActive && (
              <Bar
                dataKey="transacciones"
                fill={barColors.compraron}
                name="Transacciones"
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
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