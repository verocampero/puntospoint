import React from "react";
import { Button, Box, useTheme, useMediaQuery } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useFiltro } from "../Context/FiltroContext";

const Buttons: React.FC = () => {
  const { tipoFiltro, setTipoFiltro } = useFiltro() as {
    tipoFiltro: string[];
    setTipoFiltro: React.Dispatch<React.SetStateAction<string[]>>;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const listTipo = [
    { text: "Clientes", icon: null },
    { text: "Transacciones", icon: null },
    { text: "Dinero", icon: null },
    { text: "Cashback", icon: null },
  ];

  const getButtonStyles = (label: string) => ({
    borderColor: "#79757F",
    backgroundColor: tipoFiltro.includes(label) ? "#E7DFF8" : "white",
    color: "#1D192B",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "white",
    },
    ...(tipoFiltro.includes(label) && { border: "none" }),
  });

  const toggleFiltro = (label: string) => {
    setTipoFiltro((prev: string[]) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      sx={{ justifyContent: "space-between", marginBottom: "30px", gap: isMobile ? "8px" : "0" }}
    >
      <Box sx={{ display: "flex", gap: "8px", flexDirection: isMobile ? "column" : "row" }}>
        {listTipo
          .filter((item) => item.text === "Clientes" || item.text === "Transacciones")
          .map((item) => (
            <Button
              key={item.text}
              variant="outlined"
              sx={{
                ...getButtonStyles(item.text),
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                width: isMobile ? "100%" : "auto",
              }}
              onClick={() => {
                toggleFiltro(item.text);
              }}
            >
              {tipoFiltro.includes(item.text) && <DoneIcon />} {item.text}
            </Button>
          ))}
      </Box>

      <Box sx={{ display: "flex", gap: "8px", flexDirection: isMobile ? "column" : "row" }}>
        {listTipo
          .filter((item) => item.text === "Dinero" || item.text === "Cashback")
          .map((item) => (
            <Button
              key={item.text}
              variant="outlined"
              sx={{
                ...getButtonStyles(item.text),
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                width: isMobile ? "100%" : "auto",
              }}
              onClick={() => {
                toggleFiltro(item.text);
              }}
            >
              {tipoFiltro.includes(item.text) && <DoneIcon />} {item.text}
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default Buttons;