import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { io } from "socket.io-client";

import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Home from "./pages/Home";
import SocketContext from "./context/SocketContext";
import { UserOnlineProvider } from "./context/UserOnlineContext";
const socket = io(import.meta.env.VITE_URL_ENDPOINT_API.split("/api/v1")[0]);
function App() {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <UserOnlineProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={!user.token ? <Register /> : <Navigate to={'/'} />} />
              <Route path="/login" element={!user.token ? <Login /> : <Navigate to={'/'} />} />
              <Route path="/" element={user.token ? <Home socket={socket} /> : <Navigate to={"/login"} />} />
            </Routes>
          </BrowserRouter>
        </UserOnlineProvider>
      </SocketContext.Provider>
    </div>
  )
}

export default App
