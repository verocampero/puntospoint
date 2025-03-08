import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../pages/component/Header";
import Header from "../pages/component/NavBar";
import React from "react";
import Card from "../pages/component/Card";
import Grafic from "../pages/component/Grafic";
import { Box } from "@mui/material";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Header />
      <Box display="flex"  flexDirection="row" justifyContent={"center"} alignItems={"center"}>
        <Grafic />
        <Card />
      </Box>

      <Component {...pageProps} />
    </>
  );
}
