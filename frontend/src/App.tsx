import { ThemeProvider } from "@/components/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import { AuthProvider } from "./context/auth";
import { Toaster } from "@/components/ui/sonner";
import Login from "./components/Login";
import Register from "./components/Register";
import PostPage from "./components/PostPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster richColors theme="light" toastOptions={{}} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
