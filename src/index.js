import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StyledEngineProvider injectFirst>
    <ChakraProvider>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
    </ChakraProvider>
  </StyledEngineProvider>
);
