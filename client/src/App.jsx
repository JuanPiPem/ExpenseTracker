// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Projects from "./pages/Projects.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { auth } from "./firebase"; // 👈 este es nuevo

if (typeof window !== "undefined") {
  window.auth = auth; // 👈 esto habilita usarlo en consola
}

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/projects" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
