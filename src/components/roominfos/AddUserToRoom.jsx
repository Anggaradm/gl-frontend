import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddUserToRoom = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const [isAddSuccess, setIsAddSuccess] = useState(false);

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
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${serverUrl}/users`);
    const data = response.data;
    const userData = data?.filter(
      (user) => user.userStatus === "guest" || user.userStatus === "ex"
    );
    setUsers(userData);
  };

  const addUserToRoom = async (id) => {
    await axios
      .patch(`${serverUrl}/rooms/addmember/${id}`, {
        userId: userId,
      })
      .then((response) => {
        setMessage(response.data.message);
        setStatus(response.status);
        setIsAddSuccess(true);
        try {
          axios.post(`${serverUrl}/payments`, {
            roomId: id,
            userId: userId,
          });
        } catch (error) {}
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ userId, id });
    addUserToRoom(id);
    setUserId("");
  };

  useEffect(() => {
    if (status === 200) {
      getUsers();
    }
    setTimeout(() => {
      setMessage("");
      setStatus(null);
    }, 3000);
  }, [status, message]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Masukkan User ke Kamar
      </h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
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
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pilih user</span>
          </label>
          <select
            value={userId}
            onChange={handleUserId}
            className="select select-bordered"
          >
            <option disabled value="">
              Pilih user
            </option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            disabled={!userId ? "disabled" : ""}
            type="submit"
            className="btn btn-primary mt-24"
          >
            Kirim
          </button>
          <Link to={`/dashboard/roominfo`} className="btn btn-outline mt-2">
            {isAddSuccess ? "Kembali" : "Batal"}
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddUserToRoom;
