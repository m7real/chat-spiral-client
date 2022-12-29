import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Chat = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="drawer drawer-mobile max-h-[89vh] lg:max-h-[90vh]">
      <input id="chat-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        {/* prettier-ignore */}
      </div>
      <div className="drawer-side">
        <label htmlFor="chat-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 glass">
          {/* <!-- Sidebar content here --> */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Chat;
