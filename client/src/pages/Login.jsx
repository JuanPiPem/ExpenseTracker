// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fakeAuth } from "../utils/auth";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fakeAuth.login({ email, password });
      navigate("/");
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-16  text-green-700 ">ExpeTrack</h2>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">
          Login
        </h2>
        {err && <p className="text-red-500 mb-4 text-sm">{err}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
