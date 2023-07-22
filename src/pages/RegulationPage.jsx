import React from "react";
import { Link } from "react-router-dom";
import { LogoText } from "../components";

const RegulationPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">
              Tata Tertib Kost <br />
              <LogoText />
            </h1>
            <ul className="flex flex-col gap-2 mt-12">
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  1
                </div>
                <span className="text-lg text-start">
                  Dilarang melakukan aktivitas yang dapat mengganggu penghuni
                  kamar lain
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  2
                </div>
                <span className="text-lg text-start">
                  Menutup kembali gerbang utama setelah keluar masuk kos
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  3
                </div>
                <span className="text-lg text-start">
                  Membuka pintu kamar jika ada tamu yang datang
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  4
                </div>
                <span className="text-lg text-start">
                  Menjaga kebersihan lingkungan kos
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-gray-400 rounded-full px-1 text-base-200">
                  5
                </div>
                <span className="text-lg text-start">
                  Menjaga norma dan etika yang berlaku
                </span>
              </li>
            </ul>
            <Link
              to="/"
              className="btn btn-ghost underline underline-offset-2 mt-24"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegulationPage;
