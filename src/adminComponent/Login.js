import React, { useState } from "react";
import axios from "axios";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    fetch("https://fast-atoll-73668.herokuapp.com/adminLogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.statusCode === 200) {
          props.history.push("panel");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1 className="text-center">login page</h1>
      <div className="col-md-6 mx-auto mt-5 ">
        <div className="signup-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Email"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="email"
              placeholder="password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group text-center">
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block "
              onClick={() => PostData()}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* <button onClick={() => props.history.goBack()}>Back</button> */}
    </>
  );
};
export default Login;
