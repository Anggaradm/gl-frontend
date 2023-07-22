import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const EditMaintenance = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [type, setType] = useState("newBuy");

  const [isEditSuccess, setIsEditSuccess] = useState(false);

  const today = new Date();
  const [date, setDate] = useState(today);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCost = (e) => {
    setCost(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
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
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getMaintenance();
  }, []);

  const getMaintenance = async () => {
    await axios.get(`${serverUrl}/maintenances/${id}`).then((response) => {
      console.log(response);
      setName(response.data.mtName);
      setCost(response.data.mtCost);
      setDate(response.data.mtDate?.toString().slice(0, 10));
      setType(response.data.mtType);
    });
  };

  const updateMaintenance = async (id) => {
    await axios
      .patch(`${serverUrl}/maintenances/${id}`, {
        mtCost: cost,
        mtDate: date,
        mtName: name,
        mtType: type,
      })
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setStatus(response.status);
        setIsEditSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, cost, date, type });
    updateMaintenance(id);
  };

  useEffect(() => {
    if (isEditSuccess) {
      setTimeout(() => {
        window.location.replace("/dashboard/maintenance");
      }, 600);
    }
  }, [isEditSuccess]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Edit Pengeluaran
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
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="form-control w-full max-w-xs">
            <label htmlFor="nameInput" className="label">
              <span className="label-text">Nama Barang</span>
            </label>
            <input
              type="text"
              placeholder="nama barang..."
              id="nameInput"
              onChange={handleChangeName}
              value={name}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="costInput" className="label">
              <span className="label-text">Nominal</span>
            </label>
            <input
              type="number"
              placeholder="0"
              id="costInput"
              onChange={handleChangeCost}
              value={cost}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="dateInput" className="label">
              <span className="label-text">Tanggal</span>
            </label>
            <input
              type="date"
              id="dateInput"
              onChange={handleChangeDate}
              value={date}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Keterangan</span>
            </label>
            <select
              onChange={handleChangeType}
              value={type}
              className="select select-bordered"
            >
              <option value="newBuy">Beli baru</option>
              <option value="repair">Perbaikan</option>
            </select>
          </div>
          <div className="mt-12 w-full flex flex-col items-center">
            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Kirim
            </button>
            <Link
              to="/dashboard/maintenance"
              className="btn btn-outline mt-2 w-full max-w-xs"
            >
              {isEditSuccess ? "Kembali" : "Batal"}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMaintenance;
