import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { BsChatLeftTextFill } from "react-icons/bs";

const Navbar = () => {
  const { user, loading, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <div className="navbar bg-[rgba(255,255,255,0.12)] shadow-sm">
      <div className="flex-1">
        <label htmlFor="chat-drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
          <BsChatLeftTextFill className="h-full" />
        </label>
        <a className="normal-case text-xl font-semibold hidden lg:block ml-4">All Chats</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-[rgba(255,255,255,0.12)] text-white shadow">
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn glass btn-outline btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={loading ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" : user?.photoURL} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[rgba(255,255,255,0.12)] text-white rounded-box w-52">
            {/* <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
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
