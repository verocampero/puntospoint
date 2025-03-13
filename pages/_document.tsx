import { Html, Head, Main, NextScript } from "next/document";
import React from 'react';




export default function Document() {
  return (
    <Html lang="en">
      <Head>
       <script
        crossOrigin="anonymous"
        src="//unpkg.com/react-scan/dist/auto.global.js"
      /> 
      </Head>
      <body style={{ margin: 0, padding: 0 , backgroundColor: 'white'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
