import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as image from "../../../assets";

const SignupFormGuest = () => {
  // back to top if navigated to this page from another page
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Menggulirkan ke atas halaman saat terjadi navigasi
  }, [location]);
  // end of back to top

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("laki-laki");
  const [match, setMatch] = useState(true);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const { roomId } = useParams();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    e.target.value === validation ? setMatch(true) : setMatch(false);
  };

  const handleChangeValidation = (e) => {
    setValidation(e.target.value);
    e.target.value === password ? setMatch(true) : setMatch(false);
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

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  // consumeAPI
  const navigate = useNavigate();

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const createUser = async () => {
    await axios
      .post(`${serverUrl}/users/register`, {
        name: name,
        email: email,
        password: password,
        confPassword: validation,
        phone: phone,
        company: company,
        address: address,
        gender: gender,
      })
      .then((response) => {
        setMessage(response.data.message);
        setStatus(response.status);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, email, password, validation, phone, gender });

    createUser();
  };

  useEffect(() => {
    if (status !== null && message !== "") {
      setTimeout(() => {
        setMessage("");
        setStatus(null);
        navigate("/signin");
      }, 3000);
    }
  }, [status]);

  return (
    <>
      <div className="w-full">
        <div className="py-[4%] mt-12 px-[4%] flex flex-col items-center gap-12">
          <div className="text-2xl lg:text-4xl font-bold">Daftar</div>
          <h2 className="italic flex gap-1 items-center">
            <Icon.AlertCircle size={20} />
            Silakan daftar untuk booking kamar
          </h2>
          {message && (
            <div className="alert">
              <Icon.AlertCircle size={20} />
              <span
                className={`${status === 201 ? "text-accent" : "text-error"}`}
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
                placeholder="masukkan nama anda..."
                id="nameInput"
                onChange={handleChangeName}
                value={name}
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
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
              <label className="label">
                <span className="label-text">Jenis Kelamin</span>
              </label>
              <select
                onChange={handleChangeGender}
                className="select select-bordered"
                value={gender}
              >
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="phoneInput" className="label">
                <span className="label-text">Nomor Hp</span>
              </label>
              <input
                type="number"
                placeholder="masukkan nomor hp anda..."
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
                placeholder="masukkan tempat kerja anda..."
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
            <div className="form-control w-full max-w-xs mt-12">
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
                placeholder="ulangi password anda..."
                id="validationInput"
                onChange={handleChangeValidation}
                value={validation}
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="mt-12 w-full flex flex-col items-center gap-1">
              <button
                type="submit"
                className="btn btn-primary w-full max-w-xs"
                disabled={!match ? "disabled" : ""}
              >
                Daftar
              </button>
              <Link
                to="/"
                className="btn btn-ghost btn-outline w-full max-w-xs"
              >
                Batal
              </Link>
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

export default SignupFormGuest;
