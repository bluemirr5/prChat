import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IdSelect from "./views/IdSelect";
import RoomSelect from "./views/RoomSelect";
import Chat from "./views/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IdSelect />} />
        <Route path="/room" element={<RoomSelect />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
