import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const EditDownPayment = () => {
  const [image, setImage] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

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
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const { id } = useParams();

  const editPayment = async (image) => {
    await axios
      .patch(
        `${serverUrl}/booking-payments/${id}`,
        {
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
    editPayment(image);
  };

  useEffect(() => {
    if (status === 201) {
      window.location.replace("/dashboard");
    }
  }, [status, navigate]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Edit Pembayaran
      </h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
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
          <Link to="/dashboard/paymenthistory" className="btn btn-outline mt-2">
            Batal
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditDownPayment;
