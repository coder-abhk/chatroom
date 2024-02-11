import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CreateChatRoom = () => {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleRoomName = (e) => {
    setRoom(e.target.value.trimStart());
  };

  const handleCreateRoom = async () => {
    if (room.length === 0) return;
    await addDoc(collection(db, "room"), {
      name: room,
      createdAt: serverTimestamp(),
    });
    setRoom("");
    navigate("/chat", { state: { room } });
  };

  return (
    <div className="max-w-xl mx-auto p-5 mt-5 bg-white rounded text-center">
      <input
        type="text"
        className="form-input w-full border px-5 py-3 rounded text-center"
        placeholder="Room name"
        value={room}
        onChange={handleRoomName}
      />
      <button
        type="button"
        onClick={handleCreateRoom}
        className="btn bg-sky-500 px-5 py-3 text-white mx-auto mt-4 rounded"
      >
        Join Room
      </button>
    </div>
  );
};

export default CreateChatRoom;
