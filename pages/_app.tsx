import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../pages/component/Header";
import Header from "../pages/component/NavBar";
import React from "react";
import Card from "../pages/component/Card";
import Grafic from "../pages/component/Grafic";
import { Box } from "@mui/material";
import Buttons from "../pages/component/Buttons";
import Table from "../pages/component/Table";
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Header />

      <Box display="flex" flexDirection="row" justifyContent={"center"} alignItems={"center"}>

        <Box display='flex' flexDirection='column'  marginTop={'100px'}>
          <Buttons />
          <Grafic />
          <Table/>
        </Box>

        <Card />

      </Box>


      <Component {...pageProps} />
    </QueryClientProvider>);
}
