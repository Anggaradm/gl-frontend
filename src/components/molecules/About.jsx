import React from "react";
import { HomeKos } from "../../assets";

const About = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="lg:max-w-[50%]">
            <h1 className="text-3xl font-bold text-center py-6 mb-12">
              Tentang Kami
            </h1>
            <img
              src={HomeKos}
              className="rounded-lg shadow-2xl"
              alt="tentang-kami"
            />
          </div>
          <div className="lg:max-w-[50%]">
            <p className="py-6 text-justify">
              Griya Lestari merupakan rumah kos pilihan terbaik dengan fasilitas
              kamar yang lengkap serta akses internet gratis. Fasilitas umum
              antara lain parkiran luas, dapur bersama, dan area jemur. Lokasi
              strategis dekat pabrik dan jalan raya. Kami juga menawarkan
              pelayanan yang ramah dan profesional untuk memastikan kenyamanan
              anda selama tinggal di sini. Daftarkan diri Anda segera dan
              nikmati kenyamanan di rumah kos kami.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
