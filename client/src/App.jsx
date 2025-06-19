// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx"; // 🎯 usar solo esta importación
import PrivateRoute from "./components/PrivateRoute.jsx";
import { auth } from "./firebase"; // 👈 este es nuevo

if (typeof window !== "undefined") {
  window.auth = auth; // 👈 esto habilita usarlo en consola
}

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
