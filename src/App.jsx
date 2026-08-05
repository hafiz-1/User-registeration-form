import "./App.css";
import { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

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

    setError("");
    const newUser = {

      name,
      email,

    };

    setUsers([...users, newUser]);

    setError("");

  }

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

        <ul>

          {users.map((user, index) => (

            <li key={index}>

              {user.name} - {user.email}

            </li>

          ))}

        </ul>

      </div>

    </div>

  );

}

export default App;