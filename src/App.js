import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StockDetailPage, StockOverviewPage } from "./pages/index";

function App() {
  return (
    <main className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverviewPage />} />
          <Route path="/detail/:stock" element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
