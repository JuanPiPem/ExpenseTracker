// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import AddExpenseForm from "./components/AddExpenseForm.jsx";
import PrivateRoute from "./components/PrivateRoute";

const Home = () => {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Expenses Tracker</h1>
      <AddExpenseForm onAdd={() => {}} />
      <ExpenseList refresh={false} />
    </div>
  );
};

const App = () => {
  return (
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
};

export default App;
