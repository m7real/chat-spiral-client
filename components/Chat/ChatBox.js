import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { ChatContext } from "../../contexts/ChatProvider";
import { IoSendSharp } from "react-icons/io5";
import { io } from "socket.io-client";

const ENDPOINT = "https://chat-spiral-server.vercel.app/";
let socket, selectedChatCompare;

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const { user, loading } = useContext(AuthContext);
  const { selectedChat, setSelectedChat, fetchAgain, setFetchAgain } = useContext(ChatContext);

  // socket
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, [ENDPOINT, user]);

  // fetch all messages
  useEffect(() => {
    if (selectedChat) {
      setMessageLoading(true);
      fetch(`https://chat-spiral-server.vercel.app/messages/${selectedChat?._id}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
          setMessageLoading(false);

          socket.emit("join chat", selectedChat?._id);
        })
        .catch((err) => {
          console.error(err);
          setMessageLoading(false);
        });
    }

    // taking a backup for selectedChat so that we can give notification if there is update in other chats than the selectedChat (in future we will implement this feature)
    selectedChatCompare = selectedChat;
  }, [selectedChat, selectedChat?._id]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare?._id !== newMessageReceived?.chat._id) {
        // TODO: here we will give the notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  // send message
  const handleSend = (event) => {
    event.preventDefault();
    const content = event.target.message.value;
    console.log(content);

    const doc = {
      user: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
      content,
      chat: selectedChat,
    };

    fetch("https://chat-spiral-server.vercel.app/messages", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        event.target.reset();
        socket.emit("new message", data);
        setMessages([...messages, data]);
      })
      .catch((err) => console.error(err));
  };

  // !----------------------------------
  const chatMessagesRef = useRef(null); // create a ref for the chat messages element
  const lastMessageRef = useRef(null); // create a ref for the last message element

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ block: "end" });
  }, [messages]); // run the effect whenever the messages array changes

  // !----------------------------------

  return (
    <>
      {selectedChat ? (
        <>
          {/* -------Messages------ */}
          <div className="w-full flex-grow overflow-auto scrollbar-hide">
            <ul ref={chatMessagesRef}>
              {!messageLoading &&
                messages.map((m) => (
                  <div key={m?._id} ref={lastMessageRef} className={`chat ${m?.senderEmail === user?.email ? "chat-end" : "chat-start"} m-4 mb-0`}>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src={m?.sender?.photoURL} alt="" referrerpolicy="no-referrer" />
                      </div>
                    </div>
                    <div className="chat-bubble">{m?.content}</div>
                  </div>
                ))}
            </ul>
          </div>
          {/* -------Input------- */}
          <div className=" w-full flex-grow-0 mb-1 mt-4">
            <form onSubmit={handleSend}>
              <div className="form-control ">
                <div className="input-group ">
                  <input
                    type="text"
                    name="message"
                    placeholder="Input your message"
                    className="input input-ghost input-bordered w-full  min-h-[8vh] focus:bg-[rgba(255,255,255,0.12)] focus:text-gray-300"
                  />
                  <button type="submit" className="btn btn-square h-[8vh]">
                    <IoSendSharp />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h2 className="text-3xl text-gray-300">Please select a contact to start chatting</h2>
        </div>
      )}
    </>
  );
};

export default ChatBox;
