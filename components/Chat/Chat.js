import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Chat = () => {
  const { logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <section className={`flex flex-col justify-center items-center min-h-screen`}>
      <h2 className="text-3xl mb-10 text-stone-800 py-3 px-5 rounded-lg shadow-xl border-gray-500 border-b-2 font-serif">Chat Spiral</h2>
      <button onClick={handleLogOut} className="btn btn-outline text-white shadow-2xl">
        Log Out
      </button>
    </section>
  );
};

export default Chat;
