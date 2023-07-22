import React from "react";
import { Link } from "react-router-dom";

const InfoRoomPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">
              Silakan ikuti langkah berikut <br />
              untuk memesan kamar
            </h1>
            <ul className="flex flex-col gap-2 mt-12">
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  1
                </div>
                <span className="text-lg text-start">
                  Tekan tombol daftar dibawah ini
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  2
                </div>
                <span className="text-lg text-start">
                  Buat akun dengan mengisikan data anda pada halaman daftar
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  3
                </div>
                <span className="text-lg text-start">
                  Silakan masuk dan lengkapi data diri anda pada halaman profil
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  4
                </div>
                <span className="text-lg text-start">
                  Tunggu hingga dihubungi oleh admin kami
                </span>
              </li>
            </ul>
            <div className="flex flex-col">
              <Link to="/signup" className="btn btn-primary mt-24">
                Daftar sekarang
              </Link>
              <Link
                to="/"
                className="btn btn-ghost p-1 underline underline-offset-2 mt-6"
              >
                kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoRoomPage;
