import { useEffect, useState, useRef } from "react";
import { auth, db } from "../config/firebase";
import {
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const scroll = useRef();
  const messagesRef = collection(db, "messages");

  const handleMessage = (e) => {
    setMessage(e.target.value.trimStart());
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: auth?.currentUser?.displayName,
      photo: auth?.currentUser?.photoURL,
      room: location.state.room,
    });
    scroll.current.scrollIntoView({ behavior: "smooth" });
    setMessage("");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const q = query(
      messagesRef,
      where("room", "==", location.state.room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="max-w-xl mx-auto p-5 mt-5 bg-white rounded shadow">
      <h1 className="text-center bg-[#fafafa] p-4 mb-5">
        Room: <span className="font-bold">{location.state.room}</span>
      </h1>
      <div className="messages max-h-[320px] overflow-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`text-sm my-2 ${
              auth?.currentUser?.displayName === message.user
                ? "text-end"
                : "text-start"
            }`}
          >
            <span className="flex-inline align-center gap-2 font-bold">
              <img
                className={`max-h-[24px] max-w-[24px] rounded-full ${
                  auth?.currentUser?.displayName === message.user && "ms-auto"
                }`}
                src={message.photo}
              />
              {message.user === auth?.currentUser?.displayName
                ? "You"
                : message.user}
            </span>
            <br />
            <span>{message.text}</span>
          </div>
        ))}
        <span ref={scroll}></span>
      </div>
      <form className="grid grid-cols-12 gap-2 mt-4" onSubmit={sendMessage}>
        <input
          className="col-span-8 form-input w-full border px-5 py-3 rounded text-start"
          value={message}
          onChange={handleMessage}
          placeholder="Your message"
        />
        <button
          type="submit"
          className="col-span-4 btn bg-[#3eb798] px-5 py-3 rounded text-white font-bold"
        >
          Send
        </button>
        <button
          className="col-span-12 btn bg-[#000] text-white text-sm font-bold px-5 py-3 rounded"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </form>
    </div>
  );
};

export default Chat;
