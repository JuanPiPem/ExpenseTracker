// src/components/AuthLayout.jsx
import illustration from "../assets/login-illustration.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
        <img
          src={illustration}
          alt="Login Illustration"
          className="w-3/4 max-w-md object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
