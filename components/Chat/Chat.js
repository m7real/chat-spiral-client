import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Navbar from "../Navbar/Navbar";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";

const Chat = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="drawer drawer-mobile max-h-full">
      <input id="chat-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <Navbar />
        <ChatBox></ChatBox>
        {/* prettier-ignore */}
      </div>
      <div className="drawer-side flex max-h-full">
        <label htmlFor="chat-drawer" className="drawer-overlay flex-grow"></label>
        <ul className="menu p-4 w-80 glass">
          <div className="text-3xl font-semibold font-serif mb-4 py-2 text-center ">All Chats</div>

          {/* <!-- Sidebar content here --> */}
          <ChatList></ChatList>
        </ul>
      </div>
    </div>
  );
};

export default Chat;
