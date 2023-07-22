import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState([]);

  const [isAddSuccess, setIsAddSuccess] = useState(false);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files);
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
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const addRoom = async () => {
    const formData = new FormData();
    formData.append("roomTag", name);
    formData.append("roomNumber", number);
    for (let i = 0; i < image.length; i++) {
      formData.append("imgUrl", image[i]);
    }

    await axios
      .post(`${serverUrl}/rooms`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setStatus(response.status);
        setIsAddSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        setStatus(error.response.status);
      });
  };

  const handleReset = () => {
    setName("");
    setNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, number });
    if (image.length !== 3) {
      alert(`Anda hanya dapat mengunggah 3 file.`);
      // Lakukan tindakan lain sesuai kebutuhan, misalnya menghapus file yang tidak valid
    } else {
      // Jumlah file sesuai batasan, lanjutkan dengan pemrosesan file
      addRoom();
    }
  };

  useEffect(() => {
    if (status === 201) {
      handleReset();
    }
    setTimeout(() => {
      setMessage("");
      setStatus(null);
    }, 3000);
  }, [status]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Tambah Kamar
      </h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        {message && (
          <div className="alert">
            <Icon.AlertCircle size={20} />
            <span
              className={`${status !== 201 ? "text-error" : "text-accent"}`}
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
              <span className="label-text">Nama Kamar</span>
            </label>
            <input
              type="text"
              placeholder="nama kamar..."
              id="nameInput"
              onChange={handleChangeName}
              value={name}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="numberInput" className="label">
              <span className="label-text">Nomor</span>
            </label>
            <input
              type="number"
              placeholder="0"
              id="numberInput"
              onChange={handleChangeNumber}
              value={number}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* imageUpload */}
          <div className="form-control w-full max-w-xs flex mt-12">
            <label htmlFor="uploadImage" className="label">
              <span className="label-text">Upload Gambar</span>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                required
                id="uploadImage"
                className="input input-bordered w-full max-w-xs py-2"
              />
            </label>
          </div>
          {/* end imageUpload */}
          <div className="mt-12 w-full flex flex-col items-center">
            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Kirim
            </button>
            <Link
              to="/dashboard/roominfo"
              className="btn btn-outline mt-2 w-full max-w-xs"
            >
              {isAddSuccess ? "Kembali" : "Batal"}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoom;
