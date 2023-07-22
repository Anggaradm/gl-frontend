import React from "react";
import "./styles/hero.css";

const Hero = () => {
  return (
    <>
      <div className="hero min-h-screen" tabIndex={0} id="hero-bg">
        <div className="hero-overlay bg-gradient-to-t from-base-60 to-base-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md text-white">
            <h1 className="mb-5 text-4xl font-bold mix-blend-difference">
              Temukan Hunian Nyaman <br />
              di Griya Lestari
            </h1>
            <p className="mb-5 mix-blend-difference">
              Jaminan Fasilitas Lengkap dan Keamanan 24 Jam untuk Kenyamanan
              Anda.
            </p>
            <a href="#rooms" className="btn btn-primary">
              Lihat Kamar
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
