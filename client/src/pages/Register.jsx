// src/pages/Register.jsx
import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", { email, password });
    // axios.post('/api/register', { email, password })
  };

  return (
    <AuthForm title="Sign Up" buttonText="Register" onSubmit={handleSubmit}>
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
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthForm>
  );
};

export default Register;
