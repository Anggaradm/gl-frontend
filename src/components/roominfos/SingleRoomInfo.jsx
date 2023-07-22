import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const SingleRoomInfo = () => {
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
  const [room, setRoom] = useState({});

  useEffect(() => {
    getRoom();
  }, [user._id]);

  // useEffect(() => {
  //   console.log(room);
  // }, [room]);

  const getRoom = async () => {
    await axios
      .get(`${serverUrl}/rooms/member/${user._id}`)
      .then((res) => {
        setRoom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const expiredDate = new Date(room.expiredDate);
  const today = new Date();

  const expDate = Math.floor(
    (expiredDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );

  const daysLeft = isNaN(expDate) ? String(expDate) : expDate;

  //currency
  const currency = (price) => {
    // Menambahkan format rupiah dengan opsi lain
    if (price) {
      const formatted = price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formatted;
    }
    return "Rp 0";
  };

  useEffect(() => {
    console.log(room);
  }, [room]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Kamar {room.roomNumber}
        {room.roomTag}
      </h1>
      {room.isBooked === true ? (
        <div className="alert alert-warning">
          <Icon.AlertCircle size={20} />
          <span>
            Silakan melunasi pembayaran sebelum tenggat waktu, <br />
            Jika tidak maka kamar akan dihapus dari daftar kamar yang dipesan{" "}
            <br />
            dan uang muka sebesar Rp 100.000 akan hangus.
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="py-6 flex flex-col items-center">
        <div className="stats stats-vertical lg:stats-horizontal bg-base-100 text-primary-content">
          <div className="stat flex flex-col gap-2">
            <div>
              <div className="stat-title">Tanggal Masuk</div>
              <div className="stat-value text-lg font-medium">
                {room.checkInDate?.toString().slice(0, 10)}
              </div>
            </div>
            <div>
              <div className="stat-title">Jumlah Penghuni</div>
              <div className="stat-value text-lg font-medium">
                {room.userId?.length}
              </div>
            </div>
            <div>
              <div className="stat-title">Tagihan</div>
              <div className="stat-value text-lg font-medium">
                {currency(room.price)}
              </div>
            </div>
          </div>

          <div className="stat">
            <div className="flex flex-col justify-center items-center">
              <div className="stat-title">Tenggat waktu</div>
              {daysLeft > 0 && (
                <div className="stat-value text-xl font-medium mt-2">
                  <div className="flex flex-col p-4 items-center bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      {daysLeft}
                    </span>
                    hari lagi
                  </div>
                </div>
              )}
              <div className="stat-actions">
                <Link
                  to="/dashboard/addpayment"
                  className={`btn btn-sm ${daysLeft <= 0 && "btn-error"}`}
                >
                  Bayar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {room.isBooked && (
        <p className="text-center">
          *Silakan melunasi pembayaran sebelum tanggal{" "}
          {room.expiredDate.toString().slice(0, 10)}
        </p>
      )}
    </>
  );
};

export default SingleRoomInfo;
