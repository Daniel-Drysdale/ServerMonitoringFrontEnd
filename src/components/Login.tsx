import { useNavigate } from "react-router-dom";

const Login = () => {
  //Insert Form Submission async function here to send POST request
  //to verify user login information

  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    navigate("/home");
  };

  const handleCreateAccount = async () => {
    navigate("/create-account");
  };
  return (
    <>
      <div className="center-div login-form">
        <center>
          <div style={{ marginBottom: "20px", fontSize: "24pt" }}>
            Account Login
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
            placeholder=" -name@example.com- "
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
