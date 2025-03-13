import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../src/component/Header";
import Header from "../src/component/NavBar";
import React from "react";
import Card from "../src/component/Card";
import Grafic from "../src/component/Grafic";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Buttons from "../src/component/Buttons";
import Table from "../src/component/Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FiltroProvider } from "../src/Context/FiltroContext";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FiltroProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Header />

        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent={"center"}
          alignItems={isMobile ? "center" : "flex-start"}
          sx={{
            padding: isMobile ? "16px" : "0",
            gap: isMobile ? "16px" : "32px",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            marginTop={isMobile ? "20px" : "100px"}
            sx={{ width: isMobile ? "100%" : "auto" }}
          >
            <Buttons />
            <Grafic />
            <Table />
          </Box>

          {!isMobile && <Card />}
        </Box>

        {isMobile && (
          <Box sx={{ width: "100%", padding: "16px" }}>
            <Card />
          </Box>
        )}

        <Component {...pageProps} />
      </QueryClientProvider>
    </FiltroProvider>
  );
}