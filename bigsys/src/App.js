import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Game } from "./Home/Game";
import { Play } from "./Home/Play";
import { Result } from "./Home/Result";
import { Search } from "./Home/Search";
import { Graph } from "./Home/Graph";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/play/:id/:id2" element={<Play />} />
          <Route path="/result" element={<Result />} />
          <Route path="/search" element={<Search />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
