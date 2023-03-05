import {
  Routes,
  Route,
} from "react-router-dom";
import Name from "./Name";

function App() {
  return (
    <Routes>
      <Route path="/name" element={<Name/>}/>
    </Routes>
  );
}

export default App;
