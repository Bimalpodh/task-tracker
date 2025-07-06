import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../utils/localStoarage";
import { UserContext } from "../context/userContext";


const LoginPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmed = name.trim().toLowerCase();
    if (!trimmed) return;
    setCurrentUser(trimmed);
    setUsername(trimmed);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-image">
          <img src="/men.jpg"  alt="Welcome" />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="fade-in-text">Welcome to Task Tracker 🚀</h2>
          <p className="login-sub">Organize. Track. Achieve.</p>

          <input
            type="text"
            placeholder="👤 Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Let’s Go →
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
