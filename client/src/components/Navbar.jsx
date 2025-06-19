import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/auth";

const Navbar = () => {
  const userName = localStorage.getItem("userName") || "User";
  const navigate = useNavigate();

  const handleLogout = () => {
    firebaseAuth.logout();
    navigate("/login");
  };

  const handleShowToken = async () => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true);
      console.log("TOKEN:", token);
      alert("Token copiado a consola.");
    } else {
      alert("No user signed in");
    }
  };

  return (
    <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded shadow">
      <h1 className="text-xl font-bold text-gray-700">Welcome, {userName}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleShowToken}
      >
        Ver Token
      </button>
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
