import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import ShowBooking from "../payments/ShowBooking";

const UserBooking = () => {
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
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const response = await axios.get(`${serverUrl}/booking-payments`);
    const data = response.data;
    const bookingData = data.data?.filter(
      (booking) => booking.status === "pending"
    );
    setBookings(bookingData);
  };

  //   useEffect(() => {
  //     console.log(users);
  //   }, [users]);

  // #######pagination########
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const totalPages = Math.ceil(bookings?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const userItems = bookings?.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((pageNumber) => pageNumber + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((pageNumber) => pageNumber - 1);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Daftar Booking
      </h1>
      <Routes>
        <Route
          path="/"
          element={
            <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
              <div className="overflow-x-auto w-full">
                <table className="table table-zebra table-pin-cols md:table-pin-rows">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Kamar</th>
                      <th>Nama</th>
                      <th>Tanggal</th>
                      <th>Pilihan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row mapping */}
                    {userItems
                      ?.sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                      )
                      .map((booking, index) => (
                        <tr key={booking._id}>
                          <th>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </th>
                          <td>
                            {booking.roomId?.roomNumber}
                            {booking.roomId?.roomTag}
                          </td>
                          <th>{booking.userId?.name}</th>
                          <td>{booking.createdAt.toString().slice(0, 10)}</td>
                          <td>
                            <div>
                              <Link
                                to={`/dashboard/booking/${booking._id}`}
                                className="btn btn-ghost btn-outline btn-sm lowercase"
                              >
                                lihat bukti bayar
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="join mt-12">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  className="join-item btn"
                >
                  «
                </button>
                <button className="join-item btn">halaman {currentPage}</button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="join-item btn"
                >
                  »
                </button>
              </div>
            </div>
          }
        />
        <Route path="/:id" element={<ShowBooking />} />
      </Routes>
    </>
  );
};

export default UserBooking;
