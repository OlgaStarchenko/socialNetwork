import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Box, Theme } from "@radix-ui/themes";
import { useEffect } from "react";
import PersonPage from "./pages/PersonPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

export function App() {
  const { currentTheme } = useSelector((state) => state.theme);

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/person/:id",
      element: (
        <ProtectedRoute>
          <PersonPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <>
      <Theme
        accentColor="teal"
        grayColor="slate"
        panelBackground="solid"
        radius="large"
        appearance={currentTheme}
      >
        <Box p={"3"}>
          <RouterProvider router={router} />
        </Box>
      </Theme>
    </>
  );
}
