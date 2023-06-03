import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginForm.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifiez les identifiants ici
    if (email === "samihaelhajjam@gmail.com" && password === "Samiha28") {
      navigate("/"); // Redirige vers la page d'accueil ("/")
    }
  };

  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center w-100">
      <div className="login">
        <h2>Authentification</h2>
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group was-validated mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group form-check mb-2">
            <input type="checkbox" className="form-check-input" />
            <label htmlFor="check" className="form-check-label">
              Se souvenir de moi !!!
            </label>
          </div>
          <button type="submit" className="btn btn-success w-100 mb-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
