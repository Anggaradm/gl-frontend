import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import EditPaymentMember from "./EditPaymentMember";

const MemberPaymentHistory = () => {
  const [tab, setTab] = useState("pending");

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
    if (user && user.userStatus !== "member") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    switch (tab) {
      case "pending":
        getPendingPayments();
        break;
      case "rejected":
        getRejectedPayments();
        break;
      case "accepted":
        getPayments();
        break;
      default:
        getPayments();
        break;
    }
  }, [tab]);

  // useEffect(() => {
  //   console.log(payments);
  // }, [payments]);

  const getPayments = async () => {
    const response = await axios.get(`${serverUrl}/payments/client`);
    const datas = response.data.datas;
    const acceptedDatas = datas.filter((data) => data.status === "accept");
    setPayments(acceptedDatas);
  };

  const getRejectedPayments = async () => {
    const response = await axios.get(`${serverUrl}/payments/client`);
    const datas = response.data.datas;
    const acceptedDatas = datas.filter((data) => data.status === "reject");
    setPayments(acceptedDatas);
  };

  const getPendingPayments = async () => {
    const response = await axios.get(`${serverUrl}/payments/client`);
    const datas = response.data.datas;
    const acceptedDatas = datas.filter((data) => data.status === "pending");
    setPayments(acceptedDatas);
  };

  //currency
  const currency = (price) => {
    // Menambahkan format rupiah dengan opsi lain
    if (price) {
      const formatted = price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formatted;
    }
    return "Rp 0";
  };

  // #######pagination########
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const totalPages = Math.ceil(payments?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paymentItems = payments?.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((pageNumber) => pageNumber + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((pageNumber) => pageNumber - 1);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="text-4xl font-bold mb-4 text-center pt-12">
              Riwayat Pembayaran
            </h1>
            <div className="tabs w-full flex justify-center">
              <button
                onClick={() => {
                  setTab("pending");
                  setCurrentPage(1);
                }}
                className={`tab tab-bordered ${
                  tab === "pending" ? "tab-active" : ""
                }`}
              >
                <Icon.Loader size={15} className="mr-1" />
                Menunggu
              </button>
              <button
                onClick={() => {
                  setTab("rejected");
                  setCurrentPage(1);
                }}
                className={`tab tab-bordered ${
                  tab === "rejected" ? "tab-active" : ""
                }`}
              >
                <Icon.XCircle size={15} className="mr-1" />
                Ditolak
              </button>
              <button
                onClick={() => {
                  setTab("accepted");
                  setCurrentPage(1);
                }}
                className={`tab tab-bordered ${
                  tab === "accepted" ? "tab-active" : ""
                }`}
              >
                <Icon.CheckCircle size={15} className="mr-1" />
                Selesai
              </button>
            </div>
            <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
              <div className="overflow-x-auto w-full">
                <table className="table table-zebra table-pin-cols md:table-pin-rows">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kamar</th>
                      <th>Tanggal</th>
                      <th>{tab !== "rejected" ? "Nominal" : "Keterangan"}</th>
                      {tab !== "pending" && (
                        <th className="text-center">
                          {tab === "rejected" ? "" : "Invoice"}
                        </th>
                      )}
                      {tab === "pending" && <th>Status</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {/* row mapping */}
                    {paymentItems
                      ?.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((payment, index) => (
                        <tr key={payment._id}>
                          <th>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </th>
                          <td>
                            {payment.roomId?.roomNumber}
                            {payment.roomId?.roomTag}
                          </td>
                          <td>{payment.createdAt?.toString().slice(0, 10)}</td>
                          <td>
                            {tab === "rejected"
                              ? payment.note
                              : currency(payment.price)}
                          </td>
                          {tab === "pending" && <td>{payment.note}</td>}
                          <td>
                            <div className="flex gap-2">
                              {tab === "rejected" ? (
                                <Link
                                  to={`/dashboard/paymenthistory/${payment._id}`}
                                  className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                                >
                                  Edit
                                </Link>
                              ) : tab === "accepted" ? (
                                <Link
                                  target="_blank"
                                  to={`/dashboard/paymenthistory/invoice/${payment._id}`}
                                  className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                                >
                                  Lihat
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="join mt-1">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="join-item btn"
                  >
                    «
                  </button>
                  <button className="join-item btn">
                    halaman {currentPage}
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    className="join-item btn"
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      />
      <Route path="/:id" element={<EditPaymentMember />} />
    </Routes>
  );
};

export default MemberPaymentHistory;
