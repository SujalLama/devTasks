import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "@progress/kendo-theme-material/dist/all.css";
import "./index.css";
import { Home } from "./screens/Home/Home.tsx";
import { Insights } from "./screens/Insights/index.tsx";
import { Sidebar } from "./components/Sidebar/index.tsx";
import { Header } from "./components/Header/index.tsx";
import { TaskAndProjectProvider } from "./Providers/TaskAndProjectProjectProvider.tsx";
import { ToastProvider } from "./Providers/ToastProvider.tsx";

const router = createBrowserRouter([
  {
    element: (
      <div className="">
        <Header />
        <div className="root-container">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/insights",
        element: <Insights />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <TaskAndProjectProvider>
        <RouterProvider router={router} />
      </TaskAndProjectProvider>
    </ToastProvider>
  </StrictMode>,
);
