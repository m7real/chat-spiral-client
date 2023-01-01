import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { ChatContext } from "../../contexts/ChatProvider";
import Chat from "./Chat";

const ChatList = () => {
  const [loggedUser, setLoggedUser] = useState(null);

  const { user, loading } = useContext(AuthContext);

  const {
    search,
    searchResult,
    searchLoading,
    loadingChat,
    chats,
    fetchAgain,
    setFetchAgain,
    setChats,
    setSearch,
    setSearchResult,
    setSearchLoading,
    setLoadingChat,
    selectedChat,
    setSelectedChat,
  } = useContext(ChatContext);

  useEffect(() => {
    fetch(`https://chat-spiral-server-production.up.railway.app/chats?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error(err));
  }, [user?.email, fetchAgain]);

  return (
    <div>
      {chats.map((chat) => (
        <li
          className={`${selectedChat?._id === chat?._id ? "bg-accent" : "bg-[rgba(255,255,255,0.12)]"} mt-3 rounded-lg`}
          onClick={() => setSelectedChat(chat)}
          key={chat._id}
        >
          {/* getting the other users name from the chat by excluding current logged in users */}
          <a>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={chat.users.find((u) => u?.email !== user?.email)?.photoURL} alt="" referrerPolicy="no-referrer" />
              </div>
            </div>
            {chat.users.find((u) => u?.email !== user?.email)?.name}
          </a>
        </li>
      ))}
    </div>
  );
};

export default ChatList;
