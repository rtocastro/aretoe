import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumPage from "./pages/AlbumPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums/:slug" element={<AlbumPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;