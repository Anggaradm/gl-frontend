import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const ShowBooking = () => {
  const [note, setNote] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("reject");
  const [isChoose, setIsChoose] = useState(false);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
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
    if (user && user.userStatus !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [payment, setPayment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getPayment();
  }, []);

  // useEffect(() => {
  //   console.log(room);
  // }, [room]);

  const getPayment = async () => {
    await axios
      .get(`${serverUrl}/booking-payments/single/${id}`)
      .then((res) => {
        setPayment(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(payment);
  }, [payment]);

  const accPayment = async (status) => {
    await axios
      .patch(`${serverUrl}/booking-payments/validate/${id}`, {
        status: status,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectPayment = async (status, note) => {
    await axios
      .patch(`${serverUrl}/booking-payments/validate/${id}`, {
        status: status,
        note: note,
      })
      .then((res) => {
        console.log(res.data);
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    rejectPayment(paymentStatus, note);
  };

  return (
    <>
      <div className="max-w-2xl mb-24">
        <Link
          to="/dashboard/booking"
          type="button"
          className="btn btn-ghost my-4 underline underline-offset-2"
        >
          Kembali
        </Link>
        <img src={`${serverUrl}/public/${payment.imgUrl}`} alt="" />
        <div>
          {!isChoose ? (
            <div className="w-full flex flex-col lg:flex-row gap-2 mt-12">
              <button
                type="button"
                onClick={() => {
                  accPayment("accept");
                }}
                className="btn btn-primary"
              >
                Terima
              </button>
              <button
                type="button"
                onClick={() => setIsChoose(!isChoose)}
                className="btn btn-error btn-outline"
              >
                Tolak
              </button>
            </div>
          ) : (
            <div className="form-control w-full mt-24">
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="reasonInput" className="label">
                  <span className="label-text">Alasan</span>
                </label>
                <input
                  type="text"
                  placeholder="masukkan alasan penolakan"
                  id="reasonInput"
                  onChange={handleNoteChange}
                  value={note}
                  required
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="flex flex-col mt-12 lg:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => setIsChoose(!isChoose)}
                    className="btn btn-ghost btn-outline"
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowBooking;
