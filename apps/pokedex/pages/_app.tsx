import React from "react";
import { wrapper } from "../store";
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
