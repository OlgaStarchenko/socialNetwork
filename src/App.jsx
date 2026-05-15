import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
