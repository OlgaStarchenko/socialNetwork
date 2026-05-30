import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import "@radix-ui/themes/styles.css";
import { Box, Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")).render(
  <Theme
    accentColor="teal"
    grayColor="slate"
    panelBackground="solid"
    radius="large"
  >
    <Box p={"3"}>
      <App />
    </Box>
  </Theme>,
);
