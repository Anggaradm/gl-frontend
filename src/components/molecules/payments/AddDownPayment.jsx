import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AddDownPayment = () => {
  const [image, setImage] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImgPreview(URL.createObjectURL(file));
    setIsPopUp(true);
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

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [payment, setPayment] = useState({});
  const createPayment = async (image) => {
    await axios
      .post(
        `${serverUrl}/booking-payments`,
        {
          roomId: user.temporaryRoomId,
          imgUrl: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
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
    // console.log(image);
    createPayment(image);
  };

  useEffect(() => {
    if (status !== null && message !== "") {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [status, message]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Tambah Pembayaran Booking
      </h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
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
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <label htmlFor="uploadFile" className="label">
            <span className="label-text">Upload bukti bayar</span>
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            id="uploadFile"
            className="file-input file-input-bordered w-full max-w-xs"
          />

          {imgPreview && (
            <img src={imgPreview} alt="uploaded" className="max-w-md mt-12" />
          )}
          <button
            type="submit"
            disabled={!isPopUp ? "disabled" : ""}
            className="btn btn-primary mt-24"
          >
            Kirim
          </button>
          <Link to="/dashboard" className="btn btn-outline mt-2">
            Batal
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddDownPayment;
