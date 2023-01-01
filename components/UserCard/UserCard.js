const UserCard = ({ user, accessChat }) => {
  return (
    <div
      onClick={() => accessChat(user)}
      className="card card-side bg-[rgba(255,255,255,0.12)] shadow-xl items-center  min-w-fit hover:cursor-pointer hover:glass text-gray-300"
    >
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-2">
        <figure className="w-10 rounded-full">
          <img src={user?.photoURL} alt="" referrerPolicy="no-referrer" />
        </figure>
      </label>
      <div className="card-body">
        <p className="text-md font-semibold">{user?.name}</p>
      </div>
    </div>
  );
};

export default UserCard;
