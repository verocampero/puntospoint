import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ToggleButtonGroup, ToggleButton, Box, Typography } from "@mui/material";

const data = [
  { hour: "00:00", nuevos: 5, compraron: 2 },
  { hour: "01:00", nuevos: 3, compraron: 1 },
  { hour: "02:00", nuevos: 8, compraron: 5 },
  { hour: "03:00", nuevos: 15, compraron: 10 },
  { hour: "04:00", nuevos: 20, compraron: 15 },
  { hour: "05:00", nuevos: 25, compraron: 12 },
  { hour: "06:00", nuevos: 40, compraron: 25 },
  { hour: "07:00", nuevos: 50, compraron: 30 },
  { hour: "08:00", nuevos: 70, compraron: 50 },
];

const DashboardChart: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("clientes");

  return (
    <Box sx={{ textAlign: "center", p: 2,  }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <ToggleButtonGroup
        value={selectedTab}
        exclusive
        onChange={(e, newTab) => newTab && setSelectedTab(newTab)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="clientes">Clientes</ToggleButton>
        <ToggleButton value="transacciones">Transacciones</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={selectedTab}
        exclusive
        onChange={(e, newTab) => newTab && setSelectedTab(newTab)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="clientes">Dinero</ToggleButton>
        <ToggleButton value="transacciones">Cashback</ToggleButton>
      </ToggleButtonGroup>

        </Box>
    

      <ResponsiveContainer width={1042} height={500}>
        <BarChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nuevos" fill="#FF6B6B" name="Clientes nuevos" />
          <Bar dataKey="compraron" fill="#4285F4" name="Compraron" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DashboardChart;
