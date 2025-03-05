import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from 'react';  // Asegúrate de importar React


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
