import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AdminProfile = () => {
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
  const [bookingPayment, setBookingPayment] = useState({});
  const [payments, setPayments] = useState([]);

  const getBookingPayments = async () => {
    const response = await axios.get(`${serverUrl}/booking-payments`);
    const datas = response.data.data?.filter(
      (bookingPayment) => bookingPayment.status === "pending"
    );
    setBookingPayment(datas);
  };

  const getPayments = async () => {
    const response = await axios.get(`${serverUrl}/payments`);
    const datas = response.data?.datas?.filter(
      (payment) => payment.status === "pending"
    );
    setPayments(datas);
  };

  useEffect(() => {
    getBookingPayments();
    getPayments();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">{user.name}</h1>
      <div className="py-6 flex flex-col items-center">
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
          <li className="indicator">
            <Link to="/dashboard/booking">
              <Icon.Users size={15} />
              Daftar Booking
              <span className="indicator-item badge badge-secondary badge-sm">
                {bookingPayment?.length}
              </span>
            </Link>
          </li>
          <li className="indicator">
            <Link to="/dashboard/accpayment">
              <Icon.CheckCircle size={15} />
              Terima Pembayaran
              <span className="indicator-item badge badge-secondary badge-sm">
                {payments?.length}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminProfile;
