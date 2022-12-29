import { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // TODO: state that need to be shared, will be here-----------
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  const chatInfo = {
    search,
    searchResult,
    searchLoading,
    loadingChat,
    setSearch,
    setSearchResult,
    setSearchLoading,
    setLoadingChat,
  };

  return <ChatContext.Provider value={chatInfo}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
