import { ThemeProvider } from "@/components/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { AuthProvider } from "./context/auth";
import { Toaster } from "@/components/ui/sonner";
import Login from "./components/Login";
import Register from "./components/Register";
import PostPage from "./components/PostPage";
import FallbackPage from "./components/FallbackPage";
import ReactQueryProvider from "./components/ReactQueryProvider";

function App() {
  return (
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:slug" element={<PostPage />} />
            <Route
              path="*"
              element={
                <FallbackPage
                  message="This page could not be found."
                  status={404}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Toaster richColors theme="light" toastOptions={{}} />
        </AuthProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default App;
