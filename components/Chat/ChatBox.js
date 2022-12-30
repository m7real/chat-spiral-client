import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { ChatContext } from "../../contexts/ChatProvider";
import { IoSendSharp } from "react-icons/io5";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  const { user, loading } = useContext(AuthContext);
  const { selectedChat, setSelectedChat, fetchAgain, setFetchAgain } = useContext(ChatContext);

  const handleSend = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div className="min-h-[82vh] w-full">Hello</div>
          <div className="min-h-[8vh] w-full ">
            <form onSubmit={handleSend}>
              <div className="form-control ">
                <div className="input-group ">
                  <input
                    type="text"
                    placeholder="Input your message"
                    className="input input-ghost input-bordered w-full  h-[8vh] focus:bg-[rgba(255,255,255,0.12)] focus:text-gray-300"
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
