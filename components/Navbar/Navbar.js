import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { BsChatLeftTextFill } from "react-icons/bs";
import { ChatContext } from "../../contexts/ChatProvider";
import toast from "react-hot-toast";
import UserCard from "../UserCard/UserCard";

const Navbar = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const {
    search,
    searchResult,
    searchLoading,
    loadingChat,
    chats,
    setChats,
    setSearch,
    setSearchResult,
    setSearchLoading,
    setLoadingChat,
    selectedChat,
    setSelectedChat,
  } = useContext(ChatContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    if (!search) {
      return toast.error("Please provide an email address");
    }
    setSearchLoading(true);
    fetch(`https://chatspiral.onrender.com/users?search=${search}&user=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setSearchLoading(false));
  };

  const accessChat = (chatUser) => {
    const from = {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    };

    const to = {
      name: chatUser?.name,
      email: chatUser?.email,
      photoURL: chatUser?.photoURL,
    };

    setLoadingChat(true);

    fetch("https://chatspiral.onrender.com/chats", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ from, to }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedChat(data);
        if (!chats.find((chat) => chat._id === data._id)) {
          setChats([data, ...chats]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingChat(false));
  };

  return (
    <div className="navbar bg-[rgba(255,255,255,0.12)] shadow-sm">
      <div className="flex-1">
        <label htmlFor="chat-drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
          <BsChatLeftTextFill className="h-full" />
        </label>
        <a className="normal-case text-xl font-semibold hidden lg:block ml-4">{selectedChat?.users?.find((u) => u?.email !== user?.email)?.name}</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button onClick={() => setSearchResult([])} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div
            tabIndex={0}
            className="mt-3 card
           card-compact dropdown-content w-52
            lg:w-80 bg-[rgba(255,255,255,0.12)] shadow"
          >
            <div className="card-body">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search By Email"
                className="input input-ghost w-full 
              focus:bg-[rgba(255,255,255,0.1)] focus:text-gray-300"
              />
              <div className="w-full flex justify-end">
                <button onClick={handleSearch} className="btn glass btn-outline btn-sm text-end">
                  Go
                </button>
              </div>
              {searchResult?.map((user) => (
                <UserCard key={user?._id} user={user} accessChat={accessChat}></UserCard>
              ))}
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={loading ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" : user?.photoURL}
                alt=""
                referrerPolicy="no-referrer"
              />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[rgba(255,255,255,0.12)] text-white rounded-box w-52">
            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
