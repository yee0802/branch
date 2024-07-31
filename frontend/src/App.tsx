import { ThemeProvider } from "@/components/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import { AuthProvider } from "./context/auth";
import { Toaster } from "@/components/ui/sonner";
import Login from "./components/Login";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster richColors theme="light" toastOptions={{}} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
