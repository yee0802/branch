import { ThemeProvider } from "@/components/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
