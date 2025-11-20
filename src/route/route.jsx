import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { AuthPage } from "../pages/AuthPage";
import { Dashboard } from "../pages/Dashboard";
import { AuthRoute, GuestRoute } from "./ProtectedRoute";
import { ChannelProvider } from "../contexts/channelContext";

const routes = [
  { path: "/", element: <HomePage />, access: "guest" },
  { path: "/auth", element: <AuthPage />, access: "guest" },
  {
    path: "/dashboard",
    element: (
      <ChannelProvider>
        <Dashboard />
      </ChannelProvider>
    ),
    access: "auth",
  },
  {
    path: "/*",
    element: (
      <ChannelProvider>
        <Dashboard />
      </ChannelProvider>
    ),
    access: "auth",
  },
];

const wrappedRoutes = routes.map((route) => {
  let element = route.element;
  if (route.access === "auth") element = <AuthRoute>{element}</AuthRoute>;
  if (route.access === "guest") element = <GuestRoute>{element}</GuestRoute>;
  return { path: route.path, element };
});

export const routers = createBrowserRouter(wrappedRoutes);
