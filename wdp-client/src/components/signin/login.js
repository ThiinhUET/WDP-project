import React from "react";

const Login = props => (
  <div className="login">
    <p>Please click button below to sign in!</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      Log In With Github
    </button>
  </div>
);

export default Login;