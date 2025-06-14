// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { firebaseAuth } from "../utils/auth";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebaseAuth.register({ email, password });
      navigate("/login");
    } catch (error) {
      setErr(error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await firebaseAuth.loginWithGoogle(); // Google ya maneja registro/login
      navigate("/home");
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-16 text-green-700">ExpeTrack</h2>
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
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm font-medium">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded hover:bg-gray-200 transition mt-4"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700 font-medium">
            Continue with Google
          </span>
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
