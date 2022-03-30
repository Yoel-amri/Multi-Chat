import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import { Routes , Route, useNavigate} from "react-router-dom";
import Rooms from "./Components/Rooms";
import {Login} from './Components/Login';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState('');
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login username={username} setUsername={setUsername} />}/>
        <Route path='/chat' element={<Chat username={username} socket={socket} />}/>
        <Route path='/chat/:chatId' element={<Chat username={username} socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
