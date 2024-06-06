import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Detail } from "../page/Detail/Detail";
import { Home } from "../page/Home/Home";
import { MutationPage } from "../page/MutationPage/MutationPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/add",
        element: <MutationPage />,
      },
      {
        path: "/edit/:id",
        element: <MutationPage />,
      },
    ],
  },
]);

export default router;
