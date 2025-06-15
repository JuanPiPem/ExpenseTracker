import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/auth";

const Navbar = () => {
  const userName = localStorage.getItem("userName") || "User";
  const navigate = useNavigate();

  const handleLogout = () => {
    firebaseAuth.logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded shadow">
      <h1 className="text-xl font-bold text-gray-700">Welcome, {userName}</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
