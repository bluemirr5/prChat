import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IdSelect from "./views/IdSelect";
import RoomSelect from "./views/RoomSelect";
import Chat from "./views/Chat";
import { InfoContextProvider } from "./contexts/InfoContext";

function App() {
  return (
    <InfoContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IdSelect />} />
          <Route path="/room" element={<RoomSelect />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </InfoContextProvider>
  );
}

/*
const url = 'https://a.com/items/:id' // => pathParam
const params = useParams()
params.invoiceId
 */
/*
const urls = 'https://s.com/items?tag=health&price=5000' // Query Param
const [searchParams, setSearchParams] = useSearchParams();
searchParams.get("filter")
 */

export default App;
