import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./Screens/Login";
import CreateChatRoom from "./Screens/CreateChatRoom";
import Chat from "./Screens/Chat";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f1f1f1]">
      <Header />
      <div className="mx-4">
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<CreateChatRoom />} path="/create-chat-room" />
          <Route element={<Chat />} path="/chat" />
        </Routes>
      </div>
    </div>
  );
};

export default App;
