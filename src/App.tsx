import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonPage from "./pages/PokemonPage";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Router>
        <Routes>
          <Route path="/" Component={() => <HomePage />} />
          <Route path="/pokemon/:id" Component={() => <PokemonPage />} />
          <Route path="*" Component={() => <HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
