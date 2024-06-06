import { ColorModeScript } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Providers } from "./providers/index.tsx";
import theme from "./utils/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </Providers>
  </StrictMode>
);
