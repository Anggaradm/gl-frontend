import React from "react";
import { Copyright, SignupFormGuest } from "../components";

const SignupPageGuest = () => {
  return (
    <>
      <div className="max-w-screen">
        <SignupFormGuest />
        <Copyright />
      </div>
    </>
  );
};

export default SignupPageGuest;
