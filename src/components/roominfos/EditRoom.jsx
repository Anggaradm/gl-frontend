import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const EditRoom = () => {
  const [image, setImage] = useState([]);

  const [isEditSuccess, setIsEditSuccess] = useState(false);

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
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const updateRoom = async (id) => {
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("imgUrl", image[i]);
    }

    await axios
      .patch(`${serverUrl}/rooms/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setStatus(res.status);
        setMessage(res.data.message);
        setIsEditSuccess(true);
      })
      .catch((err) => {
        setStatus(err.response.status);
        setMessage(err.response.data.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, number });
    if (image.length !== 3) {
      alert(`Anda hanya dapat mengunggah 3 file.`);
      // Lakukan tindakan lain sesuai kebutuhan, misalnya menghapus file yang tidak valid
    } else {
      updateRoom(id);
    }
  };

  useEffect(() => {
    if (status === 200) {
      setTimeout(() => {
        setMessage("");
        setStatus(null);
      }, 3000);
    }
  }, [status]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Edit Foto Kamar
      </h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        {message && (
          <div className="alert">
            <Icon.AlertCircle size={20} />
            <span
              className={`${status !== 200 ? "text-error" : "text-accent"}`}
            >
              {message}
            </span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
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
            <button
              type="button"
              onClick={() => {
                window.location.replace("/dashboard/roominfo");
              }}
              className="btn btn-outline mt-2 w-full max-w-xs"
            >
              {isEditSuccess ? "Kembali" : "Batal"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRoom;
