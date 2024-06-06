import { Box, Center, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../widgets/Header/Header";
import { Navigation } from "../widgets/Navigation/Navigation";

export const Layout = () => {
  const location = useLocation();
  return (
    <div>
      <Header />
      <Box position={"relative"} as="main">
        <Suspense fallback={<Spinner />}>
          {location.pathname !== "/" && <Navigation />}
          <Center>
            <Outlet />
          </Center>
        </Suspense>
      </Box>
    </div>
  );
};
