import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AddPaymentMember = () => {
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

  useEffect(() => {
    if (user && user.userStatus !== "member") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [payment, setPayment] = useState({});

  const getPayment = async () => {
    await axios
      .get(`${serverUrl}/payments/client`)
      .then((res) => {
        const data = res.data.datas?.filter(
          (item) => item.status === "pending"
        );

        setPayment(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createPayment = async (image) => {
    await axios
      .post(
        `${serverUrl}/payments/client`,
        { imgUrl: image },
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
    getPayment();
  }, []);

  useEffect(() => {
    console.log(payment);
  }, [payment]);

  useEffect(() => {
    if (status !== null && message !== "") {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [status, message]);

  return (
    <>
      {payment?.length > 0 ? (
        <>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4 text-center pt-12">
              Pembayaran diterima, silakan menunggu persetujuan admin.
            </h1>
            <Link
              to="/dashboard/paymenthistory"
              className="btn btn-ghost underline underline-offset-2"
            >
              kembali
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4 text-center pt-12">
            Tambah Pembayaran
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
            <form
              onSubmit={handleSubmit}
              className="form-control w-full max-w-xs"
            >
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
                <img
                  src={imgPreview}
                  alt="uploaded"
                  className="max-w-md mt-12"
                />
              )}
              <button
                type="submit"
                disabled={!isPopUp ? "disabled" : ""}
                className="btn btn-primary mt-24"
              >
                Kirim
              </button>
              <Link
                to="/dashboard/paymenthistory"
                className="btn btn-outline mt-2"
              >
                Batal
              </Link>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddPaymentMember;
