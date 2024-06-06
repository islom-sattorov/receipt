import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "../app/store";
import appRouter from "../routes/index";

interface Props {
  children: ReactElement;
}

export function Providers({ children }: Props) {
  return (
    <ChakraProvider>
      <StoreProvider store={store}>
        <RouterProvider router={appRouter} />
        {children}
      </StoreProvider>
    </ChakraProvider>
  );
}
