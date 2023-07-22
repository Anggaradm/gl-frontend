import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-base-100 text-primary">
        <h1 className="text-4xl font-bold mb-4">
          404 - Halaman Tidak Ditemukan
        </h1>
        <p className="mb-4">Maaf, halaman yang Anda cari tidak ditemukan.</p>
        <Link to="/" className="underline underline-offset-2 text-white">
          Kembali ke Halaman Utama
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
