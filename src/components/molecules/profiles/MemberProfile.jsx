import React, { useEffect } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const MemberProfile = () => {
  // consumeAPI
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/signin");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (user && user.userStatus !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">{user.name}</h1>
      <div className="py-6 flex flex-col items-center">
        <div className="menu bg-base-200 w-full rounded-box flex flex-col gap-4">
          <div className="flex gap-6">
            <Icon.User size={20} />
            <span>{user.name}</span>
          </div>
          <div className="flex gap-6">
            <Icon.Mail size={20} />
            <span>{user.email}</span>
          </div>
          <div className="flex gap-6">
            <Icon.Phone size={20} />
            <span>{user.phone}</span>
          </div>
          <div className="flex gap-6">
            <Icon.Briefcase size={20} />
            <span className={!user.company ? "text-xs text-error italic" : ""}>
              {user.company ? user.company : "silakan lengkapi data anda"}
            </span>
          </div>
          <div className="flex gap-6">
            <Icon.MapPin size={20} />
            <span
              className={
                !user.address ? "text-xs text-error italic text-justify" : ""
              }
            >
              {user.address ? user.address : "silakan lengkapi data anda"}
            </span>
          </div>
          <div className="w-full"></div>
        </div>
        <div className="w-full">
          <Link to="/dashboard/roominfo" className="btn btn-primary w-full">
            Lihat Kamar
          </Link>
        </div>
      </div>
    </>
  );
};

export default MemberProfile;
