import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateChatRoom = () => {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleRoomName = (e) => {
    setRoom(e.target.value.trimStart());
  };

  const handleCreateRoom = () => {
    if (room !== "")
      navigate("/chat", { state: { room: room.trim().toLocaleLowerCase() } });
    else return;
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
        className="btn bg-[#3eb798] px-5 py-3 text-white mx-auto mt-4 rounded"
      >
        Join Room
      </button>
    </div>
  );
};

export default CreateChatRoom;
