import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout, getMe, reset } from "../../../features/authSlice";
import LogoText from "../../atoms/LogoText";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    dispatch(Logout());
    dispatch(reset());
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.reload();
    }, 1000);
  };

  // consumeAPI
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <div className="navbar bg-base-100 px-[7%] fixed z-40">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="#hero">Beranda</a>
              </li>
              <li>
                <a href="#about">Tentang Kami</a>
              </li>
              <li>
                <a href="#contact">Kontak</a>
              </li>
              <li>
                <Link to="/regulation">Tata Tertib</Link>
              </li>
              {user ? (
                <li className="max-w-md mt-4 flex flex-col gap-1">
                  <Link
                    to="/dashboard"
                    className="btn btn-outline btn-ghost btn-sm"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="btn btn-outline text-error btn-sm"
                    onClick={handleLogout}
                  >
                    Keluar{" "}
                    {isLoading && (
                      <Icon.RefreshCw size={15} className="animate-spin" />
                    )}
                  </button>
                </li>
              ) : (
                <li className="max-w-md mt-4 flex flex-col gap-1">
                  <Link
                    to="/signin"
                    className="btn btn-outline btn-ghost btn-sm"
                  >
                    Masuk
                  </Link>
                  <a href="#rooms" className="btn btn-primary btn-sm">
                    Pesan Kamar
                  </a>
                </li>
              )}
            </ul>
          </div>
          <LogoText />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <a href="#hero">Beranda</a>
            </li>
            <li>
              <a href="#about">Tentang Kami</a>
            </li>
            <li>
              <a href="#contact">Kontak</a>
            </li>
            <li>
              <Link to="/regulation">Tata Tertib</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost">
                Dashboard
              </Link>
              <button
                className="btn btn-ghost text-error"
                onClick={handleLogout}
              >
                Keluar{" "}
                {isLoading && (
                  <Icon.RefreshCw size={15} className="animate-spin ml-2" />
                )}
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline btn-ghost">
                Masuk
              </Link>
              <a href="#rooms" className="btn btn-primary">
                Pesan Kamar
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
