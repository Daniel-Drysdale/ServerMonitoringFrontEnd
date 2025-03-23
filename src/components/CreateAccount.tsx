import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn"; // Importing zxcvbn for password strength checking
import { ChangeEvent, useState } from "react"; // Import types for event handling

const CreateAccount = () => {
  const navigate = useNavigate();

  //UseStates for the password creation / verification
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setPassword(value);

    const result = zxcvbn(value); //zxcvbn is a password strength checker
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

    // Insert async function to post new account data to the backend here

    navigate("/");
  };

  //Switch case of password stength
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
          style={{ height: "500px" }}
        >
          <center>
            <div
              style={{
                marginBottom: "20px",
                fontSize: "24pt",
                width: "500px",
              }}
            >
              Create Account
            </div>
          </center>
          <div className="form center-div" style={{}}>
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
            {password.length > 0 && (
              <div
                className=""
                style={{
                  color:
                    passwordStrength < 2
                      ? "#ff6363"
                      : passwordStrength === 2
                      ? "#fffa63"
                      : "#5ddf71",

                  position: "absolute",
                  left: "420px",
                }}
              >
                Password Strength: {getStrengthMessage(passwordStrength)}
              </div>
            )}
            <center>
              <label
                htmlFor="password"
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
                position: "absolute",
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
