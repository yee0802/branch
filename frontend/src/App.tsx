import { ThemeProvider } from "@/components/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
