import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Chat = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <section className={`flex flex-col justify-center items-center min-h-[80vh]`}>
      <button className="btn btn-outline text-white shadow-2xl">Log Out</button>
    </section>
  );
};

export default Chat;
