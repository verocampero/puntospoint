import React from "react";
import { Card, CardContent, Box, Typography} from "@mui/material";
import { useQuery } from '@tanstack/react-query';

interface Cliente {
  mes: string;
  total: number;
  ventas: number;
  monto: number;
  cashback: {
    acumulado: number;
    facturado: number[];
    fechasFacturacion: string[]; // Definir fechasFacturacion como un array de strings

  };
}

interface Transaccion {
  hora: string;
  total: number;
  columnas: number[];
}

interface Grafico {
  horas: string[];
  clientes_nuevos: number[];
  compraron: number[];
}

interface Data {
  clientes: Cliente[];
  transacciones: Transaccion[];
  grafico: Grafico;
}

const fetchData = async (): Promise<Data> => {
  const response = await fetch("/api/datos");
  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }
  return response.json();
};

const CashbackDashboard: React.FC = () => {
  const { data, isLoading, error } = useQuery<Data>({
    queryKey: ["datos"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error instanceof Error) return <p>Error al cargar datos: {error.message}</p>;

  return (
    <CardContent sx={{ textAlign: "center", }}>
      {data?.clientes.map((cliente) => (
        <Card key={cliente.mes} sx={{ mb: 2, width: 323, borderRadius: '20px', paddingTop: '10px', paddingBottom: '20px', paddingRight: '20px', paddingLeft: '20px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}>
          <CardContent sx={{ textAlign: "justify", width:'100%', flexDirection: 'column', display: 'flex', gap: '10px' }}>
      <Typography variant="h1" sx={{ fontSize: '16px', textAlign: 'center', fontWeight: 'bold' }}>
        {cliente.mes}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h2" sx={{ fontSize: '14px' }}>Clientes:</Typography>
        <Typography variant="h2" sx={{ fontSize: '14px' }}>{cliente.total}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h2" sx={{ fontSize: '14px' }}>Ventas totales:</Typography>
        <Typography variant="h2" sx={{ fontSize: '14px'}}>{cliente.ventas}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h2" sx={{ fontSize: '14px' }}>Monto total:</Typography>
        <Typography variant="h2" sx={{ fontSize: '14px' }}>{cliente.monto}</Typography>
      </Box>


      <Typography variant="h1" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
        Cashback
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h2" sx={{ fontSize: '14px' }}>Acumulado:</Typography>
        <Typography variant="h2" sx={{ fontSize: '14px' }}>{cliente.cashback.acumulado}</Typography>
      </Box>


      
      {cliente.cashback.facturado.map((monto, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ fontSize: '14px' }}>Facturado {cliente.cashback.fechasFacturacion[index]} </Typography>
          <Typography variant="h3" sx={{ fontSize: '14px'}}>{monto}</Typography>

        </Box>
      ))}
            
          </CardContent>
        </Card>
      ))}
    </CardContent>

  );
};

export default CashbackDashboard;
