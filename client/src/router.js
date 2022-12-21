import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";

import App from "./App";
const Home = lazy(() => import("pages/Home"));
const Auth = lazy(() => import("pages/Auth"));
const Signin = lazy(() => import("pages/Auth/pages/Signin"));
const Signup = lazy(() => import("pages/Auth/pages/Signup"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            index: true,
            loader: async () => redirect("connexion"),
          },
          {
            path: "connexion",
            element: <Signin />,
          },
          {
            path: "inscription",
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);
