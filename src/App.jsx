import "./App.css";
import { useState, useEffect, useRef } from "react";

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
  const nameInputRef = useRef(null);

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

  function handleDelete(indexToDelete) {

    const updatedUsers = users.filter((user, index) => {

      return index !== indexToDelete;

    });

    setUsers(updatedUsers);

  }

  function handleClearUsers() {

    setUsers([]);

       nameInputRef.current.focus();

  }

  useEffect(() => {

    localStorage.setItem("users", JSON.stringify(users));

  }, [users]);

  useEffect(() => {

    if (nameInputRef.current) {

      nameInputRef.current.focus();

    }

  }, []);

  return (

    <div className="container">
      <div className="layout">

        {/* Registration Card */}

        <div className="card">

          <h1>User Registration</h1>

          <form onSubmit={handleSubmit}>

            <input
              ref={nameInputRef}
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

        </div>

        {/* Users Card */}

        <div className="card users-card">

          <h2>Registered Users ({users.length})</h2>

          {users.length > 0 && (

            <button
              className="clear-btn"
              onClick={handleClearUsers}
            >
              Clear All Users
            </button>

          )}

          <ul className="user-list">

            {users.map((user, index) => (

              <li key={index}>

                <div>
                  <strong>{user.name}</strong><br />
                  {user.email}
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>

              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>

  );

}

export default App;