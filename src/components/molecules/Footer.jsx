import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import * as image from "../../assets";
import LogoText from "../atoms/LogoText";

const Footer = () => {
  return (
    <>
      <footer
        id="footer"
        className="footer p-10 lg:px-[7%] bg-base-200 text-base-content transition-all duration-300 ease-in-out"
      >
        <div>
          <img src={image.BlackLogo} alt="Black Logo" className="w-16" />
          <LogoText />
          <p>Beroperasi sejak tahun 2018.</p>
        </div>
        <div>
          <span className="footer-title">Alamat</span>
          <Link
            to="https://goo.gl/maps/WvCY3NSSz4kJKoyt5"
            target="_blank"
            className="link link-hover flex gap-4 items-start"
          >
            <Icon.MapPin size={20} />
            <div>
              Jl.Gemulung, Gg. 3 <br />
              ds.Pulodarat, RT 11 RW 002 <br />
              kec.Pecangaan, kab.Jepara <br />
              Jawa Tengah <br />
              <span className="font-semibold">59462</span>
            </div>
          </Link>
        </div>
        <div>
          <span className="footer-title">Kontak</span>
          <Link
            to="https://wa.me/628122507192"
            target="_blank"
            className="link link-hover flex gap-4 items-center"
          >
            <Icon.Phone size={20} />
            (+62) 812-2507-192
          </Link>
          <Link
            to="mailto:griyalestariindekos@gmail.com"
            target="_blank"
            className="link link-hover flex gap-4 items-center"
          >
            <Icon.Mail size={20} />
            griyalestariindekos@gmail.com
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
