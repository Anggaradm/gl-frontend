import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const EditMemberProfile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");
  const [match, setMatch] = useState(true);
  const [isPasswordUpdatable, setIsPasswordUpdatable] = useState(false);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleChangeCompany = (e) => {
    setCompany(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    e.target.value === validation ? setMatch(true) : setMatch(false);
  };

  const handleChangeValidation = (e) => {
    setValidation(e.target.value);
    e.target.value === password ? setMatch(true) : setMatch(false);
  };

  // consumeAPI
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/dashboard");
    }
  }, [isError, navigate]);

  useEffect(() => {
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setCompany(user?.company || "");
    setAddress(user?.address || "");
  }, [user]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const id = user?._id;

  const editUser = async (userId) => {
    await axios
      .patch(`${serverUrl}/users/client/${userId}`, {
        name,
        phone: Number(phone),
        company,
        address,
        password,
        confPassword: validation,
      })
      .then((res) => {
        setMessage(res.data.message);
        setStatus(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, phone, company, address, id: user?._id });
    editUser(id);
    dispatch(getMe());
  };

  useEffect(() => {
    if (status !== null && message !== "") {
      setTimeout(() => {
        setMessage("");
        setStatus(null);
        window.location.reload();
      }, 3000);
    }
  }, [status, message]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Edit Member Profile
      </h1>
      <div className="py-6 flex flex-col items-center">
        {message && (
          <div className="alert">
            <Icon.AlertCircle size={20} />
            <span
              className={`${status === 200 ? "text-accent" : "text-error"}`}
            >
              {message}
            </span>
          </div>
        )}
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="form-control w-full max-w-xs">
            <label htmlFor="nameInput" className="label">
              <span className="label-text">Nama</span>
            </label>
            <input
              type="text"
              id="nameInput"
              onChange={handleChangeName}
              value={name}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="phoneInput" className="label">
              <span className="label-text">Nomor Hp</span>
            </label>
            <input
              type="number"
              id="phoneInput"
              onChange={handleChangePhone}
              value={phone}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="companyInput" className="label">
              <span className="label-text">Tempat Kerja</span>
            </label>
            <input
              type="text"
              id="companyInput"
              onChange={handleChangeCompany}
              value={company}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="addressInput" className="label">
              <span className="label-text">Alamat</span>
            </label>
            <textarea
              id="addressInput"
              onChange={handleChangeAddress}
              value={address}
              required
              className="textarea textarea-bordered h-24"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsPasswordUpdatable(!isPasswordUpdatable)}
            className="btn btn-ghost lowercase underline underline-offset-2 mt-12"
          >
            {isPasswordUpdatable ? "batalkan ubah password?" : "ubah password?"}
          </button>
          <div className={`w-full ${!isPasswordUpdatable && "hidden"}`}>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="passwordInput" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="masukkan password baru"
                id="passwordInput"
                onChange={handleChangePassword}
                value={password}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            {!match ? (
              <p className="text-xs text-error italic mt-4">
                password tidak sama
              </p>
            ) : (
              ""
            )}
            <div className="form-control w-full max-w-xs">
              <label htmlFor="validationInput" className="label">
                <span className="label-text">Ulangi Password</span>
              </label>
              <input
                type="password"
                placeholder="ulangi password"
                id="validationInput"
                onChange={handleChangeValidation}
                value={validation}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="mt-12 w-full flex flex-col items-center gap-2">
            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Kirim
            </button>
            <Link
              to="/dashboard"
              className="btn btn-ghost btn-outline w-full max-w-xs"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMemberProfile;
