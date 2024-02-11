import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider).then(() => {
          navigate("/create-chat-room");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-xl bg-white mx-auto my-10 p-10 rounded shadow">
      <h1 className="text-center font-bold text-xl">Login</h1>
      <p className="text-center my-5">To chat you need an account first.</p>
      <GoogleButton className="mx-auto" onClick={handleLogin} />
    </div>
  );
};

export default Login;
