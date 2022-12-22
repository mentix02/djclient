import { createBrowserRouter } from "react-router-dom";

import FourOhFour from "@/views/404";
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import SignUpView from "@/views/SignUpView";
import BaseLayout from "@/components/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <FourOhFour />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/login",
        element: <LoginView />,
      },
      {
        path: "/signup",
        element: <SignUpView />,
      },
    ],
  },
]);

export default router;
