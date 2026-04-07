import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./core/store/hooks";
import { initializeAuth } from "./core/store/slices/authSlice";

function App() {
  const dispatch = useAppDispatch();

  // Inicializa autenticação ao carregar a app
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#fff",
            color: "#1e3a8a",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: { primary: "#059669", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#dc2626", secondary: "#fff" },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
export default App;
