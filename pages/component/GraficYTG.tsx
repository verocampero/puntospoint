import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const fetchData = async () => {
  const response = await fetch("/api/datos");
  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }
  return response.json();
};

const YtdYtgChart: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ytd-ytg-data"],
    queryFn: fetchData,
  });

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const ytdData = data?.graficoYTD_YTG?.YTD?.anios?.map(
    (anio: string, index: number) => ({
      anio,
      valor1: data.graficoYTD_YTG.YTG.valor1[index],
      valor2: data.graficoYTD_YTG.YTG.valor2[index],
    })
  );

  const ytgData = data?.graficoYTD_YTG?.YTG?.anios?.map(
    (anio: string, index: number) => ({
      anio,
      valor1: data.graficoYTD_YTG.YTG.valor1[index],
      valor2: data.graficoYTD_YTG.YTG.valor2[index],
    })
  );

  return (
    <Box sx={{ textAlign: "center", width: "1000px", height: "456px" }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        
          <ResponsiveContainer width={474} height={420}>
            <BarChart
              data={ytdData}
              barSize={80}
              barCategoryGap="30%" 
              barGap={8} 
              margin={{ top: 20, right: 20, left: 20, bottom: 5 }} 
            >
              <CartesianGrid
                horizontal={true}
                vertical={false}
                stroke="#ccc"
                strokeDasharray="1 1"
              />
              <XAxis dataKey="anio" /> 
              <YAxis
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value: number) =>
                  `$${(value / 1000000).toFixed(1)}M`
                }
              />
              <Legend />
              
              <Bar dataKey="valor1" fill="#EB3535" name="2022" />
              <Bar dataKey="valor2" fill="#7A35EB" name="2023" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Gráfico YTG */}
        <Grid item xs={6}>
          
          <ResponsiveContainer width={474} height={420}>
            <BarChart
              data={ytgData}
              barSize={80}
              barCategoryGap="10%" 
              barGap={8} 
              margin={{ top: 20, right: 50, left: 0, bottom: 5 }} 
            >
              <CartesianGrid
                horizontal={true}
                vertical={false}
                stroke="#ccc"
                strokeDasharray="1 1"
              />
              <XAxis dataKey="anio" /> 
              <YAxis
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value: number) =>
                  `$${(value / 1000000).toFixed(1)}M`
                }
              />
              <Legend />
             
              <Bar dataKey="valor1" fill="#EB3535" name="2022" />
              <Bar dataKey="valor2" fill="#7A35EB" name="2023" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default YtdYtgChart;