import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StockDetailPage, StockOverviewPage } from "./pages/index";

import { WatchListContextProvider } from "./context/watchListContext";
/*
The subset of components wrapped inside the WatchListContextProvider are the only
components that will have access to it
*/

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverviewPage />} />
          <Route path="/detail/:stock" element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
