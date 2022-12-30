import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { ChatContext } from "../../contexts/ChatProvider";
import { IoSendSharp } from "react-icons/io5";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  const { user, loading } = useContext(AuthContext);
  const { selectedChat, setSelectedChat, fetchAgain, setFetchAgain } = useContext(ChatContext);

  // fetch all messages
  useEffect(() => {
    if (selectedChat) {
      setMessageLoading(true);
      fetch(`http://localhost:5000/messages/${selectedChat?._id}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
          console.log(data);
        })
        .catch((err) => console.error(err))
        .finally(setMessageLoading(false));
    }
  }, [selectedChat, selectedChat?._id]);

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

    fetch("http://localhost:5000/messages", {
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
        setMessages([...messages, data]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {selectedChat ? (
        <>
          {/* -------Messages------ */}
          <div className="min-h-[82vh] w-full overflow-y-scroll">
            <ul>
              {!messageLoading &&
                messages.map((m) => (
                  //-----------
                  <div key={m?._id} className={`chat ${m?.senderEmail === user?.email ? "chat-end" : "chat-start"} m-4`}>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src={m?.sender?.photoURL} />
                      </div>
                    </div>
                    <div className="chat-bubble">{m?.content}</div>
                  </div>
                  // --------
                ))}
            </ul>
          </div>
          {/* -------Input------- */}
          <div className="min-h-[8vh] w-full ">
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
        <div className="flex items-center justify-center">
          <h2 className="text-3xl text-gray-300">Please select a contact to start chatting</h2>
        </div>
      )}
    </>
  );
};

export default ChatBox;
