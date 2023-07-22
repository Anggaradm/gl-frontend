import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const GuestProfile = () => {
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

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [room, setRoom] = useState({});
  const [bookingPayments, setBookingPayments] = useState({});
  const roomId = user.temporaryRoomId;

  const getRoom = async () => {
    await axios
      .get(`${serverUrl}/rooms/${roomId}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBookingPayments = async () => {
    await axios
      .get(`${serverUrl}/booking-payments/client`)
      .then((response) => {
        const data = response.data;
        setBookingPayments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRoom();
  }, [room]);

  useEffect(() => {
    getBookingPayments();
  }, [bookingPayments]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div className="alert alert-warning">
        <Icon.AlertCircle size={20} />
        <span>
          Silakan melakukan pembayaran <br />
          untuk menyelesaikan proses booking, ke nomor rekening berikut: <br />
          BCA 1234567890 a.n. ALI MAHMUDI
        </span>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">{user.name}</h1>
      <div className="py-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
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
            <span>{user.company}</span>
          </div>
          <div className="flex gap-6">
            <Icon.MapPin size={20} />
            <span>{user.address}</span>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          {room && !room.isEmpty ? (
            <div className="card-body flex flex-col items-center">
              {user.temporaryRoomId != null ? (
                <>
                  <h2 className="card-title">Ganti kamar</h2>
                  <p className="text-center">
                    Kamar {room.roomNumber}
                    {room.roomTag} sudah diisi orang lain, silakan ganti kamar!
                  </p>
                </>
              ) : (
                <p className="text-center">
                  Silakan pilih kamar untuk melakukan booking!
                </p>
              )}
              <div className="card-actions justify-end mt-6">
                <Link to="/dashboard/choosenewroom" className="btn btn-primary">
                  Pilih Kamar
                </Link>
              </div>
            </div>
          ) : (
            <div className="card-body flex-col items-center">
              <h2 className="card-title">Pembayaran</h2>
              <div className="divider"></div>
              {bookingPayments.data?.status === "reject" ? (
                <p className="text-center">{bookingPayments.data?.note}</p>
              ) : (
                <p className="text-center">
                  Silakan melakukan pembayaran sebesar Rp 100.000 <br />
                  untuk menyelesaikan proses booking kamar {room.roomNumber}
                  {room.roomTag}!
                </p>
              )}
              <div className="card-actions justify-end mt-6">
                {bookingPayments.data ? (
                  bookingPayments.data.status === "reject" ? (
                    <button
                      onClick={() =>
                        navigate(
                          `/dashboard/downpayment/${bookingPayments.data?._id}`
                        )
                      }
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  ) : (
                    <p className="text-xs italic">Menunggu disetujui...</p>
                  )
                ) : (
                  <button
                    onClick={() => navigate("/dashboard/addpayment")}
                    className="btn btn-primary"
                  >
                    Bayar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GuestProfile;
