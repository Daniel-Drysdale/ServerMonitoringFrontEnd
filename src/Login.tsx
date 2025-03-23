const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <div
        className="center-div login-form"
        style={{ backgroundColor: "", padding: "100px" }}
      >
        <div className="mb-3 form">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
