// src/pages/Login.jsx
import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    // axios.post('/api/login', { email, password })
  };

  return (
    <AuthForm title="Log In" buttonText="Login" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <p className="text-sm mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthForm>
  );
};

export default Login;
