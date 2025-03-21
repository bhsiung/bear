import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameSelection from "./pages/GameSelection";
import TikTokToe from "./pages/games/TikTokToe";
import Splendor from "./pages/games/Splendor";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<GameSelection />} />
          <Route path="/games/tiktoktoe" element={<TikTokToe />} />
          <Route path="/games/splendor" element={<Splendor />} />
          {/* Add more routes for individual games here */}
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
