import React from "react";
import { Copyright, SignupForm } from "../components";

const SignupPage = () => {
  return (
    <>
      <div className="max-w-screen">
        <SignupForm />
        <Copyright />
      </div>
    </>
  );
};

export default SignupPage;
