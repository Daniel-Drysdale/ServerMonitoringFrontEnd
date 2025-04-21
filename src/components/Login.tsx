import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();

  //States to handle email and password input
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const BASE_URL = import.meta.env.VITE_BASE_DB_URL;

  //Handles login form submission
  const handleLoginSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/v2/api/account-login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        //Sends user_id
        navigate("/home", { state: { user_id: data.user_id } });
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in.");
    }
  };
  //Navigate to the account creation page
  const handleCreateAccount = () => {
    navigate("/create-account");
  };

  return (
    <>
      <div className="center-div login-form">
        <center>
          <div style={{ marginBottom: "20px", fontSize: "24pt" }}>
            Account Log in
          </div>
        </center>
        <div className="mb-5 form center-div">
          <center>
            <label htmlFor="emailID" className="form-label">
              Email Address:
            </label>
          </center>
          <input
            type="email"
            className="form-control"
            id="emailID"
            placeholder="name@example.com"
            style={{ width: "400px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <center>
            <label
              htmlFor="password"
              className="form-label"
              style={{ marginTop: "15px", marginBottom: "10px" }}
            >
              Password:
            </label>
          </center>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          style={{ float: "right", marginTop: "-15px" }}
          onClick={handleLoginSubmit}
        >
          Submit
        </button>
      </div>
      <div className="center-div create-account-element">
        Don't have an account?
        <button
          style={{ marginLeft: "10px" }}
          className="btn btn-primary"
          onClick={handleCreateAccount}
        >
          Click Here
        </button>
      </div>
    </>
  );
};

export default Login;
