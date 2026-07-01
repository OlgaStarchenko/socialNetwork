import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Box, Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import PersonPage from "./pages/PersonPage";

export function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage theme={theme} changeTheme={changeTheme} />,
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
      path: "/person/:id",
      element: <PersonPage theme={theme} changeTheme={changeTheme} />,
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
        appearance={theme}
      >
        <Box p={"3"}>
          {" "}
          <RouterProvider router={router} />
        </Box>
      </Theme>
    </>
  );
}
