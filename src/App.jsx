import "./App.css";
import { useState, useEffect } from "react";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState(() => {

    const storedUsers = localStorage.getItem("users");

    return storedUsers ? JSON.parse(storedUsers) : [];

  });

  function handleSubmit(e) {

    e.preventDefault();

    if (name.trim() === "") {
      setError("Name is required");
      return;
    }

    if (email.trim() === "") {
      setError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const emailExists = users.some(
      (user) => user.email === email
    );

    if (emailExists) {
      setError("Email already registered");
      return;
    }

    const newUser = {
      name,
      email,
    };

    setUsers([...users, newUser]);

    setError("");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  }

  useEffect(() => {

    localStorage.setItem("users", JSON.stringify(users));

  }, [users]);

  useEffect(() => {

    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {

      setUsers(JSON.parse(storedUsers));

    }

  }, []);

  return (

    <div className="container">

      <div className="card">

        <h1>User Registration</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">
            Register
          </button>

        </form>

        <h2>Registered Users</h2>

        <ul className="user-list">

          {users.map((user, index) => (

            <li key={index}>

              <strong>{user.name}</strong> - {user.email}

            </li>

          ))}

        </ul>

      </div>

    </div>

  );

}

export default App;