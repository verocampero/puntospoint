import "../styles/globals.css"; 
import type { AppProps } from "next/app";
import Navbar from "../pages/component/Header"; 
import Header from "../pages/component/NavBar"; 
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
