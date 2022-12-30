import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";

const Chat = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="drawer drawer-mobile max-h-[89vh] lg:max-h-[90vh]">
      <input id="chat-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <ChatBox></ChatBox>
        {/* prettier-ignore */}
      </div>
      <div className="drawer-side">
        <label htmlFor="chat-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 glass">
          {/* <!-- Sidebar content here --> */}
          <ChatList></ChatList>
        </ul>
      </div>
    </div>
  );
};

export default Chat;
