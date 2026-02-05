import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import "./index.css";
import AuthContextProvider from "./provider/AuthContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={PublicRoutes}></RouterProvider>
    </AuthContextProvider>
  </StrictMode>,
);
