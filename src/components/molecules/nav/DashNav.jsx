import React, { useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DrawerDash } from "../..";
import { Logout, reset } from "../../../features/authSlice";

const NavbarDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  // consumeAPI
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(Logout());
    dispatch(reset());
    setTimeout(() => {
      setIsLoading(false);
      navigate("/signin");
    }, 500);
  };

  return (
    <>
      <div className="navbar fixed bg-base-100 px-[7%] z-40">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost btn-circle drawer-overlay"
            >
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
            Dashboard
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-bottom dropdown-end lg:hidden">
            <label tabIndex={0} className="btn m-1 flex">
              <Icon.Circle size={3} />
              <Icon.Circle size={3} />
              <Icon.Circle size={3} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-2"
            >
              <li>
                <Link to="/" className="btn btn-ghost btn-sm btn-outline">
                  Beranda
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-sm btn-outline"
                >
                  Keluar
                  {isLoading ? (
                    "..."
                  ) : (
                    <Icon.LogOut size={15} className="ml-2" />
                  )}
                </button>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex">
            <Link to="/" className="btn btn-ghost">
              Beranda
            </Link>
            <button onClick={handleLogout} className="btn text-error">
              Keluar
              {isLoading ? "..." : <Icon.LogOut size={18} className="ml-2" />}
            </button>
          </div>
        </div>
      </div>
      <DrawerDash />
    </>
  );
};

export default NavbarDashboard;
