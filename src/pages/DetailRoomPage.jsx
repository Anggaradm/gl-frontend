import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { PhotoCard } from "../components";

const DetailRoomPage = () => {
  // back to top if navigated to this page from another page
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Menggulirkan ke atas halaman saat terjadi navigasi
  }, [location]);
  // end of back to top

  // consumeAPI
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [room, setRoom] = useState([]);
  const { id } = useParams();

  const getRoom = async () => {
    await axios
      .get(`${serverUrl}/rooms/${id}`)
      .then((response) => {
        const data = response.data;
        setRoom(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRoom();
  }, []);

  useEffect(() => {
    console.log(room);
  }, [room]);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center mt-24">
          <div className="max-w-screen">
            <h1 className="text-4xl font-bold">{`Kamar ${room.roomNumber}${room.roomTag}`}</h1>
            <div className="w-full max-w-screen my-12">
              <div className="w-full flex gap-12 flex-wrap justify-center">
                {room.imageId &&
                  room.imageId.map((img, index) => (
                    <PhotoCard
                      url={`${serverUrl}/public/images/${img.imgUrl}`}
                      title="random"
                    />
                  ))}
              </div>
              <div className="divider"></div>
              <div className="card min-w-96 max-w-screen bg-base-100 shadow-xl">
                <div className="card-body items-center">
                  <h2 className="card-title text-center mb-12">
                    Booking Sekarang
                  </h2>
                  <div className="text-xs font-light lg:text-base flex flex-col">
                    <span className="text-xl lg:text-4xl font-medium text-accent mr-1">
                      Rp 500.000
                    </span>
                    per bulan/kamar
                  </div>
                  <ul className="menu bg-base-200 max-w-screen rounded-box mt-6 flex flex-col items-center">
                    <li>
                      <a className="text-xs font-light lg:text-base">
                        *untuk penghuni lebih dari 1 orang,
                        <br />
                        dikenakan penambahan biaya <br />
                        Rp 100.000 per bulan/orang
                      </a>
                    </li>
                    <li>
                      <a className="text-xs font-light lg:text-base">
                        *maksimal penghuni kamar 3 orang
                      </a>
                    </li>
                  </ul>
                  <div className="card-actions justify-end mt-6">
                    <Link to={`/signup/${id}`} className="btn btn-primary">
                      Booking
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/"
              className="btn btn-ghost mb-52 underline underline-offset-2"
            >
              Batal
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailRoomPage;
