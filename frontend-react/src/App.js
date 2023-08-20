import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./styles/App.css";
import "./styles/utilities.css";
import "./styles/colors.css";
import "./styles/fonts.css";

import Authorization from "./Pages/Authorization"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Authorization/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
