import { useEffect, useState, useRef } from "react";
import { auth, db } from "../config/firebase";
import {
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  limitToLast,
  serverTimestamp,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Oval } from "react-loader-spinner";

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const scroll = useRef();
  const messagesRef = collection(db, "messages");

  const scrollToBottom = () => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "center",
      alignToTop: false,
    });
  };

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
    scrollToBottom();
    setMessage("");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    const q = query(
      messagesRef,
      where("room", "==", location.state.room),
      orderBy("createdAt", "asc"),
      limitToLast(15)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      if (msgs.length > 0) {
        setLoading(false);
      } else {
        if (snapshot.empty) setLoading(false);
      }

      msgs.length > 0 && setTimeout(scrollToBottom, 1000);
      setMessages(msgs);
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          scrollToBottom();
        }
      });
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="max-w-xl mx-auto p-5 mt-5 bg-white rounded shadow">
      <h1 className="text-center bg-[#fafafa] p-4 mb-5">
        Room: <span className="font-bold">{location.state.room}</span>
      </h1>
      <div className="messages h-[320px] overflow-scroll p-4">
        {loading && (
          <div className="flex justify-center items-center h-[100%]">
            <Oval
              visible={true}
              height="25"
              width="25"
              color="#3eb798"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {!loading &&
          messages.map((message) => (
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
        <div ref={scroll}></div>
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
