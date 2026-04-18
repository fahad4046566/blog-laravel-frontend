import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminPosts from "./pages/admin/AdminPosts.jsx";
import AdminPostCreate from "./pages/admin/AdminPostCreate.jsx";
import AdminPostEdit from "./pages/admin/AdminPostEdit.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/PostDetailPage/:slug", element: <PostDetailPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/about", element: <About /> },
      
      // admin nested routes
      {
        path: "/admin",
        element: (
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "posts", element: <AdminPosts /> },
          { path: "posts/create", element: <AdminPostCreate /> },
          { path: "posts/edit/:slug", element: <AdminPostEdit /> },
        ],
      },
       { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
