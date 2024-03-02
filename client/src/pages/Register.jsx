import React from "react";
import FormSign from "../components/FormSign";
import api from "../api/api";
import {
  errorAlert,
  errorAlertWithMessage,
  successAlert,
} from "../helper/alert";

const Register = () => {
  async function handleSubmitRegister(e) {
    try {
      e.preventDefault();
      const res = await api.post("/auth/register", {
        email: e.target.email?.value,
        password: e.target.password?.value,
      });
      successAlert(res.data.message);
    } catch (error) {
      errorAlertWithMessage(error.response.data.message);
    }
  }
  return (
    <div className="pt-5">
      <FormSign
        Header="Registration Form"
        desc="Already registered ?"
        buttonSignText="Register"
        handleSubmit={handleSubmitRegister}
        path="/login"
      />
    </div>
  );
};

export default Register;
