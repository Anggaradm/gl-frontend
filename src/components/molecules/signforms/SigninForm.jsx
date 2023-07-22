import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as image from "../../../assets";
import { LoginUser, reset } from "../../../features/authSlice";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadError, setIsLoadError] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ email, password });
    dispatch(LoginUser({ email, password }));
  };

  // consumeAPI
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    if (isError) {
      setIsLoadError(true);
      setTimeout(() => {
        dispatch(reset());
        setIsLoadError(false);
      }, 2000);
    }
    dispatch(reset);
  }, [user, dispatch, isSuccess, navigate, isError]);

  return (
    <>
      <div className="w-full">
        <div className="py-[4%] px-[6%] flex flex-col items-center gap-12">
          <div className="text-2xl lg:text-4xl font-bold">Signin</div>

          <form action="" onSubmit={handleSubmit}>
            {isError && (
              <p className="text-error text-center text-xs italic">{message}</p>
            )}
            <div className="form-control w-full max-w-xs">
              <label htmlFor="emailInput" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="masukkan email anda..."
                id="emailInput"
                onChange={handleChangeEmail}
                value={email}
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="passwordInput" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="masukkan password anda..."
                id="passwordInput"
                onChange={handleChangePassword}
                value={password}
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="mt-12">
              <button
                type="submit"
                disabled={isLoadError ? "disabled" : ""}
                className="btn btn-primary w-full max-w-xs"
              >
                {isLoading ? "Loading..." : "Masuk"}
              </button>
              <span className="text-xs text-center flex gap-1 justify-center mt-2">
                Belum punya akun?
                <Link to="/signup" className="text-accent">
                  Daftar
                </Link>
              </span>
            </div>
          </form>

          <Link
            to="/"
            className="flex flex-col items-center gap-2 lg:gap-4 mt-24"
          >
            <img src={image.BlackLogo} alt="company logo" className="w-10" />
            <div className="font-bold">
              Griya
              <span className="text-primary">Lestari</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
