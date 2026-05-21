import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import nuimage from "../assets/background/nuimage.png";
import logo from "../assets/icons/Full Logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="LoginGrid">
      <div id="ImageSection">
        <img id="BackgroundImage" src={nuimage} alt="National University Building" />
      </div>
      <div id="LoginSection">
        <div id="InnerBox">
          <div id="LogoDiv">
            <img id="Logo" src={logo} alt="NUEATS Logo" />
          </div>
          <div id="TextDiv">
            <div id="TextWrapper">
              <h1>Welcome Back!</h1>
              <h3>Please log-in to continue.</h3>
            </div>
          </div>
          <form onSubmit={handleLogin} id="FormDiv">
            <div id="FormWrapper">
              <p className="FormLabel">Email</p>
              <input
                type="text"
                placeholder="Input your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="FormLabel">Password</p>
              <input
                type="password"
                placeholder="Input your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
            </div>
          </form>
          <div id="ButtonDiv">
            <button id="LoginButton" onClick={handleLogin}>
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;