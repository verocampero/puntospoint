/**
 * Componente `DashboardChart` que muestra un gráfico de barras utilizando la librería `recharts`.
 * El gráfico se adapta a diferentes tamaños de pantalla y muestra datos basados en los filtros seleccionados.
 *
 * @component
 * @returns {JSX.Element} El componente `DashboardChart`.
 *
 * @example
 * <DashboardChart />
 *
 * @remarks
 * Este componente utiliza `useQuery` de `@tanstack/react-query` para obtener datos del gráfico desde una API.
 * Los datos se actualizan automáticamente cuando cambian los filtros `tiempoFiltro` y `tipoFiltro`.
 *
 * @description
 * El componente `DashboardChart` muestra un gráfico de barras que se adapta a diferentes tamaños de pantalla (móvil, tablet, escritorio).
 * Los datos del gráfico se obtienen de una API basada en los filtros seleccionados (`tiempoFiltro` y `tipoFiltro`).
 * Dependiendo de los filtros, el gráfico muestra diferentes conjuntos de datos y colores de barras.
 *
 * @returns {JSX.Element} El componente `DashboardChart`.
 *
 * @throws {Error} Si hay un error al obtener los datos del gráfico.
 *
 * @see {@link https://recharts.org/en-US/api/BarChart} Para más información sobre `BarChart` de `recharts`.
 * @see {@link https://react-query.tanstack.com/} Para más información sobre `react-query`.
 *
 * @requires {@link https://mui.com/} Para componentes de Material-UI.
 * @requires {@link https://reactjs.org/} Para componentes de React.
 */
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
import { Box, Link, useTheme, useMediaQuery } from "@mui/material";
import { useFiltro } from "../Context/FiltroContext";
import DownloadIcon from "@mui/icons-material/Download";
import GraficYTG from "./GraficYTG"; 

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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

  // Calculate dynamic dimensions based on screen size
  const getChartDimensions = () => {
    if (isMobile) {
      return { width: '100%', height: 300, barSize: 20 };
    } else if (isTablet) {
      return { width: '100%', height: 380, barSize: 40 };
    } else {
      return { width: 948, height: 420, barSize: 80 };
    }
  };

  const { width, height, barSize } = getChartDimensions();

  return (
    <Box sx={{ 
      textAlign: "center", 
      width: { xs: "100%", sm: "100%", md: "1042px" }, 
      height: { xs: "auto", sm: "auto", md: "456px" },
      padding: { xs: 2, sm: 2, md: 0 }
    }}>
      {isYtdYtgActive ? (
        <GraficYTG />
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart 
            data={chartData} 
            barSize={barSize}
            margin={{ 
              top: 5, 
              right: isMobile ? 10 : 30, 
              left: isMobile ? 0 : 20, 
              bottom: isMobile ? 60 : 20 
            }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#ccc"
              strokeDasharray="1 1"
            />
            <XAxis 
              dataKey={isToday ? "hora" : "dia"} 
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 30}
              interval={isMobile ? 1 : 0}
              fontSize={isMobile ? 10 : 12}
            />
            <YAxis
              domain={["dataMin", "dataMax"]}
              ticks={
                isToday
                  ? isMobile ? [0, 20, 60, 100] : [0, 5, 8, 10, 20, 40, 60, 80, 100]
                  : isMobile ? [200, 1000, 2000] : [100, 200, 400, 600, 800, 1000, 1500, 2000, 2500]
              }
              tickMargin={15}
              interval="preserveStartEnd"
              fontSize={isMobile ? 10 : 12}
              width={isMobile ? 35 : 50}
            />
            {isTransactionActive && !isMobile && (
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
                fontSize={12}
              />
            )}

            <Tooltip />
            <Legend 
              wrapperStyle={{
                fontSize: isMobile ? 10 : 12,
                marginTop: isMobile ? 10 : 0,
                paddingTop: isMobile ? 10 : 0
              }}
              layout={isMobile ? "horizontal" : "horizontal"}
              verticalAlign={isMobile ? "bottom" : "bottom"}
              align="center"
            />
            {!isTransactionActive && (
              <>
                <Bar
                  dataKey=""
                  fill='#f6bfbf'
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
                  fill='#caf8d7'
                  name="No Compraron"
                />
              </>
            )}
            <Line
              type="monotone"
              dataKey="monto"
              stroke="#D81B60"
              strokeWidth={isMobile ? 2 : 4}
              yAxisId={isMobile ? "left" : "right"}
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
      <Box sx={{ 
        display: "flex", 
        justifyContent: "flex-end", 
        mt: 2,
        px: { xs: 1, sm: 2, md: 2 }
      }}>
        <Link
          href="/"
          sx={{
            color: "#644BBA",
            textDecoration: "none",
            fontSize: { xs: "12px", sm: "14px" },
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DownloadIcon sx={{ mr: 1, fontSize: { xs: 16, sm: 20 } }} /> Exportar tabla
        </Link>
      </Box>
    </Box>
  );
};

export default DashboardChart;