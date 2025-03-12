export default function handler(req, res) {
  const data = {
    clientes: [
      {
        mes: "Noviembre",
        total: 81420,
        ventas: 1100,
        monto: 70000000,
        cashback: {
          acumulado: 200000,
          facturado: [120000, 200000, 0],
          fechasFacturacion: ["01/11", "10/11", "20/11"],
        },
      },
      {
        mes: "Octubre",
        total: 81295,
        ventas: 3800,
        monto: 170840000,
        cashback: {
          acumulado: 700000,
          facturado: [100000, 250000, 100000],
          fechasFacturacion: ["01/11", "10/11", "20/11"],
        },
      },
      {
        mes: "Septiembre",
        total: 80995,
        ventas: 4000,
        monto: 179850000,
        cashback: {
          acumulado: 450000,
          facturado: [85000, 80000],
          fechasFacturacion: ["01/11", "10/11", "20/11"],
        },
      },
    ],
    transacciones: [
      { hora: "00:00 - 04:00", total: 80.000, columnas: [20, 25, 79.975] },
      { hora: "04:00 - 08:00", total: 80.040, columnas: [40, 120, 79.920] },
      { hora: "08:00 - 12:00", total: 80.050, columnas: [10, 250, 79.800] },
      { hora: "12:00 - 16:00", total: 80.080, columnas: [30, 350, 79.730] },
      { hora: "16:00 - 20:00", total: 80.085, columnas: [5, 150, 79.935] },
      { hora: "20:00 - 00:00", total: 80.095, columnas: [10, 200, 79.895] },
    ],
    lineData: {
      sieteDias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      dinero_total: [1000000, 2500000, 2200000, 5000000, 4500000, 11000000, 9500000],
      ventas: [1200, 2500, 2000, 3500, 4000, 3800, 3200]
    },
    grafico: {
      horas: [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
      ],
      clientes_totales:[0],
      clientes_nuevos: [5, 5, 8, 0, 5, 5, 10, 20, 5, 0, 4, 0, 5, 10, 10, 5, 5, 0, 0, 0, 2, 2, 3, 2],
      compraron: [5, 5, 5, 10, 40, 20, 20, 40, 60, 60, 100, 30, 80, 70, 100, 100, 40, 40, 60, 50, 60, 40, 80, 20],
      no_compraron: [0],
    },
   grafico7D: {
      sieteDias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      clientes_totales:[0],
      clientes_nuevos: [205, 210, 210, 200, 200, 250, 250],
      compraron: [2005, 1010, 1500, 1700, 2300, 1000, 1010],
      no_compraron: [0]
    }, 
    Todo7D: {
      sieteDias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      clientes_totales:[0],
      clientes_nuevos: [205, 210, 210, 200, 200, 250, 250],
      compraron: [2005, 1010, 1500, 1700, 2300, 1000, 1010],
      no_compraron: [0]
    }, 
    Cashback: {
      sieteDias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      clientes_totales:[0],
      clientes_nuevos: [205, 210, 200, 210, 200, 250, 250],
      compraron: [2005, 1010, 1500, 1700, 2300, 1000, 1010],
      no_compraron: [0]
    }, 
    graficoTransacciones: {
      sieteDias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      transacciones:[1010, 2500, 2000, 3500, 4000, 3800, 3000]
    }
  };

  res.status(200).json(data);
}
