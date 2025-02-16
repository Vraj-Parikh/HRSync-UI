import AddSchedule from "@/pages/AddSchedule";
import MainLayout from "@/layout/MainLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import { Home } from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { RouteObject } from "react-router-dom";
import EditSchedule from "@/pages/EditSchedule";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/sign-in",
        element: (
          <ProtectedRoute>
            <SignIn />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute authentication>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute authentication>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute authentication>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "/schedule/add",
        element: (
          <ProtectedRoute authentication>
            <AddSchedule />
          </ProtectedRoute>
        ),
      },
      {
        path: "/schedule/edit/:scheduleId",
        element: (
          <ProtectedRoute authentication>
            <EditSchedule />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
