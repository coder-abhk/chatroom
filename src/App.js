import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Header from "./components/Header";
import Login from "./Screens/Login";
import CreateChatRoom from "./Screens/CreateChatRoom";
import Chat from "./Screens/Chat";

export const AuthContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-sky-100">
        <Header />
        <div className="mx-4">
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<CreateChatRoom />} path="/create-chat-room" />
            <Route element={<Chat />} path="/chat" />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
