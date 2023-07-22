import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AddPaymentAdmin = () => {
  const [roomId, setRoomId] = useState("");
  const [usersId, setUsersId] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleUserId = (e) => {
    setUserId(e.target.value);
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
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const response = await axios.get(`${serverUrl}/rooms`);
    const data = response.data;
    const roomDataIsEmpty = data?.filter((room) => room.isEmpty === false);
    const roomData = roomDataIsEmpty?.filter((room) => room.isPaid === false);
    setRooms(roomData);
  };

  const handleRoomId = (e) => {
    setRoomId(e.target.value);

    const choosedRoom = rooms?.filter((room) => room._id === e.target.value);
    const dataUsersId = choosedRoom[0]?.userId;
    console.log({ dataUsersId, choosedRoom });
    setUsersId(dataUsersId);
  };

  const createPayment = async () => {
    await axios
      .post(`${serverUrl}/payments`, {
        roomId: roomId,
        userId: userId,
      })
      .then((res) => {
        setMessage(res.data.message);
        setStatus(res.status);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setStatus(err.response.status);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ roomId, userId });
    createPayment();
    getRooms();
    setRoomId("");
    setUserId("");
  };

  useEffect(() => {
    if (status === 201) {
      getRooms();
    }
    setTimeout(() => {
      setMessage("");
      setStatus("");
    }, 3000);
  }, [status, message]);

  return (
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
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Pilih kamar</span>
            </label>
            <select
              value={roomId}
              onChange={handleRoomId}
              className="select select-bordered"
            >
              <option disabled value="">
                Pilih kamar
              </option>
              {rooms?.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.roomNumber}
                  {room.roomTag}
                </option>
              ))}
            </select>
          </div>
          {roomId && usersId && (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Pilih user</span>
              </label>
              <select
                value={userId && userId}
                onChange={handleUserId}
                className="select select-bordered"
              >
                <option disabled value="">
                  Pilih user
                </option>
                {usersId?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="w-full flex flex-col gap-2">
            <button
              disabled={userId === "" || roomId === "" ? "disabled" : ""}
              type="submit"
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
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPaymentAdmin;
