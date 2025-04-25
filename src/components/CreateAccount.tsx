import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import { ChangeEvent, useState } from "react";

const CreateAccount = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_DB_URL;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setPassword(value);

    const result = zxcvbn(value);
    setPasswordStrength(result.score);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(event.target.value);
  };

  const handleLoginSubmit = async (): Promise<void> => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/v2/api/create-user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          `Failed to create account: ${
            errorData.message || response.statusText
          }`
        );
        return;
      }

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while creating the account.");
    }
  };

  const getStrengthMessage = (score: number): string => {
    switch (score) {
      case -1:
        return "";
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  return (
    <>
      <div>
        <div
          className="center-div create-account-form"
          style={{ height: "550px", minWidth: "500px" }}
        >
          <center>
            <div
              style={{ marginBottom: "20px", fontSize: "24pt", width: "500px" }}
            >
              Create Account
            </div>
          </center>
          <div className="form center-div">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "400px" }}
            />

            <center>
              <label
                htmlFor="password"
                className="form-label"
                style={{ marginTop: "40px", marginBottom: "10px" }}
              >
                New Password:
              </label>
            </center>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder=""
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="text-center center-div">
              {password.length > 0 && (
                <div
                  style={{
                    color:
                      passwordStrength < 2
                        ? "#ff6363"
                        : passwordStrength === 2
                        ? "#fffa63"
                        : "#5ddf71",

                    left: "420px",
                  }}
                >
                  Password Strength: {getStrengthMessage(passwordStrength)}
                </div>
              )}
            </div>

            <center>
              <label
                htmlFor="confirmPassword"
                className="form-label"
                style={{ marginTop: "40px", marginBottom: "10px" }}
              >
                Verify Password:
              </label>
            </center>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder=""
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          {confirmPassword !== password && confirmPassword.length > 0 && (
            <div
              className="center-div"
              style={{
                marginTop: "5px",
                left: "410px",
                color: "#ff6363",
              }}
            >
              Passwords are not the same!
            </div>
          )}

          <button
            className="btn btn-primary"
            style={{ float: "right", marginTop: "50px" }}
            onClick={handleLoginSubmit}
            disabled={password.length === 0 || password !== confirmPassword}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
