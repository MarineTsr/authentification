import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import App from "./App";
import Home from "./pages/Home";
import Alert from "./components/Alert";
import Error from "./pages/Error";
import { accountLoader } from "./loaders/accountLoader";
import { homepageLoader } from "./loaders/homepageLoader";
import { authAction } from "./actions/authAction";

const Auth = lazy(() => import("./pages/Auth"));
const Account = lazy(() => import("./pages/Account"));
const AccountSummary = lazy(() =>
  import("./pages/Account/components/AccountSummary")
);
const AccountInfos = lazy(() =>
  import("./pages/Account/components/AccountInfos")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: homepageLoader,
        errorElement: <Alert />,
        element: <Home />,
      },
      {
        path: "/auth",
        action: authAction,
        element: <Auth />,
      },
      {
        path: "/account",
        loader: accountLoader,
        element: <Account />,
        children: [
          {
            index: true,
            element: <AccountSummary />,
          },
          {
            path: "infos",
            element: <AccountInfos />,
          },
        ],
      },
    ],
  },
]);
