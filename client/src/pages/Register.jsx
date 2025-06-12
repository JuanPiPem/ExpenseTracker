// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fakeAuth } from "../utils/auth";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fakeAuth.register({ email, password });
      navigate("/login");
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-16  text-green-700 ">ExpeTrack</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-gray-500 font-bold mb-6 text-center">
          Register
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
          Register
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
