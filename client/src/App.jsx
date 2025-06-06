// client/src/App.jsx
import { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:3000/api/expenses")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setMessage("Error: " + err.message));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Expense Tracker</h1>
      <p>{message}</p>
    </div>
  );
};

export default App;
