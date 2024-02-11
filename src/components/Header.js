import chatIcon from "../assets/img/chat.png";

const Header = () => {
  return (
    <div className="bg-[#000]">
      <div className="container p-5 mx-auto">
        <h1 className="flex justify-center align-center gap-2 text-center text-white font-bold">
          <img className="max-h-[24px]" src={chatIcon} /> Chat Room
        </h1>
      </div>
    </div>
  );
};

export default Header;
