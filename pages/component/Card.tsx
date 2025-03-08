import React from "react";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@mui/material";

const data = [
  {
    month: "Noviembre",
    clients: 81420,
    totalSales: 1100,
    totalAmount: "$70M",
    cashback: {
      accumulated: "$200.000",
      invoices: [
        { date: "01/11", amount: "$120.000" },
        { date: "10/11", amount: "$200.000" },
        { date: "20/11", amount: "$0" },
      ],
    },
  },
  {
    month: "Octubre",
    clients: 81295,
    totalSales: 3800,
    totalAmount: "$170.84M",
    cashback: {
      accumulated: "$700.000",
      invoices: [
        { date: "01/10", amount: "$100.000" },
        { date: "10/10", amount: "$250.000" },
        { date: "20/10", amount: "$100.000" },
      ],
    },
  },
  {
    month: "Septiembre",
    clients: 80995,
    totalSales: 4000,
    totalAmount: "$179.85M",
    cashback: {
      accumulated: "$450.000",
      invoices: [
        { date: "01/09", amount: "$85.000" },
        { date: "10/09", amount: "$80.000" },
      ],
    },
  },
];

const CashbackDashboard: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 2, }}>
      
      <CardContent sx={{ textAlign: "center" }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, borderBottom: "1px solid #ddd", width: 323,  }}>
            <Typography fontWeight="bold" variant="h6">
              {item.month}
            </Typography>
            <Typography>Clientes: {item.clients}</Typography>
            <Typography>Ventas totales: {item.totalSales}</Typography>
            <Typography>Monto total: {item.totalAmount}</Typography>
            <Typography fontWeight="bold">Cashback</Typography>
            <Typography>Acumulado: {item.cashback.accumulated}</Typography>
            {item.cashback.invoices.map((invoice, i) => (
              <Typography key={i}>
                Facturado {invoice.date}: {invoice.amount}
              </Typography>
            ))}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default CashbackDashboard;