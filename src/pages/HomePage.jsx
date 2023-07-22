import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SmoothScroll from "smooth-scroll";
import {
  About,
  Copyright,
  Footer,
  Hero,
  Navbar,
  Photos,
  Rooms,
} from "../components";

const HomePage = () => {
  useEffect(() => {
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 800, // Kecepatan scroll (opsional, default: 800)
      offset: 70, // Jarak offset dari elemen target (opsional, default: 0)
      easing: "easeInOutCubic", // Efek easing (opsional, default: 'easeInOutCubic')
    });
  }, []);

  // back to top if navigated to this page from another page
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Menggulirkan ke atas halaman saat terjadi navigasi
  }, [location]);
  // end of back to top

  return (
    <>
      <div id="navbar">
        <Navbar />
      </div>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
        <div id="rooms">
          <Rooms />
        </div>
      </div>
      <div id="contact">
        <Footer />
        <Copyright />
      </div>
    </>
  );
};

export default HomePage;
