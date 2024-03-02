import React from "react";
import FormSign from "../components/FormSign";
import { errorAlertWithMessage, successAlert } from "../helper/alert";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");

  async function handleSubmitLogin(e) {
    try {
      e.preventDefault();
      const res = await api
        .post("/auth/login", {
          email: e.target.email?.value,
          password: e.target.password?.value,
        })
        .then((response) => {
          if (response && response.status === 200) {
            setTimeout(() => {
              navigate("/biodata");
            }, 2000);
            localStorage.setItem("token", response.data.token);
            successAlert(response.data.message);
            console.log("res", response);
          }
        });
    } catch (error) {
      console.log("erro", error);
      errorAlertWithMessage(error.response.data.message);
    }
  }
  return (
    <div className="pt-5">
      <FormSign
        Header="Please Login"
        desc="Not registered ?"
        buttonSignText="Login"
        handleSubmit={handleSubmitLogin}
        path="/register"
      />
    </div>
  );
};

export default Login;
