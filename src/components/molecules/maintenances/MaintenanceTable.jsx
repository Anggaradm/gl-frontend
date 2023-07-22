import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import EditMaintenance from "./EditMaintenance";

const MaintenanceTable = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("delete");
  };

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
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    getMaintenances();
  }, [message, status]);

  const getMaintenances = async () => {
    const response = await axios.get(`${serverUrl}/maintenances`);
    setMaintenances(response.data.datas);
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
  const [itemsPerPage] = useState(5);

  const totalPages = Math.ceil(maintenances?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const maintenanceItems = maintenances?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = (pageNumber) => {
    setCurrentPage((pageNumber) => pageNumber + 1);
  };

  const handlePrevPage = (pageNumber) => {
    setCurrentPage((pageNumber) => pageNumber - 1);
  };

  const [mtModalData, setMtModalData] = useState({});

  const deleteMaintenance = async (id) => {
    try {
      const response = await axios.delete(`${serverUrl}/maintenances/${id}`);
      setMessage(response.data.message);
      setStatus(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status !== null && message !== "") {
      setTimeout(() => {
        setMessage("");
        setStatus(null);
      }, 3000);
    }
  }, [status, message]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="text-4xl font-bold mb-4 text-center pt-12">
                Data Pengeluaran
              </h1>
              <Link
                to="/dashboard/addmaintenance"
                className="mx-6 mt-12 btn btn-primary"
              >
                Tambah Data
                <Icon.PlusCircle size={20} />
              </Link>
              <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
                <div className="overflow-x-auto w-full">
                  {message && (
                    <div className="alert">
                      <Icon.AlertCircle size={20} />
                      <span
                        className={`${
                          status === 200 ? "text-accent" : "text-error"
                        }`}
                      >
                        {message}
                      </span>
                    </div>
                  )}
                  <table className="table table-zebra table-pin-cols md:table-pin-rows">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Nama</th>
                        <th>Tanggal</th>
                        <th>Biaya</th>
                        <th>Pilihan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row mapping */}
                      {maintenanceItems
                        ?.sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((maintenance, index) => (
                          <tr key={maintenance._id}>
                            <th>
                              {index + 1 + (currentPage - 1) * itemsPerPage}
                            </th>
                            <th>
                              {maintenance.mtType === "newBuy"
                                ? "Membeli"
                                : maintenance.mtType === "repair"
                                ? "Perbaikan"
                                : ""}{" "}
                              {maintenance.mtName}
                            </th>
                            <td>
                              {maintenance.mtDate?.toString().slice(0, 10)}
                            </td>
                            <td>{currency(maintenance.mtCost)}</td>
                            <td>
                              <form action="" onSubmit={handleSubmit}>
                                <div className="flex gap-2">
                                  <Link
                                    to={`/dashboard/maintenance/${maintenance._id}`}
                                    className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                                  >
                                    Edit
                                  </Link>
                                  <label
                                    onClick={() => {
                                      setMtModalData({
                                        id: maintenance._id,
                                        name: maintenance.mtName,
                                        cost: maintenance.mtCost,
                                      });
                                    }}
                                    htmlFor="my_modal_6"
                                    className="btn btn-sm btn-error btn-outline text-xs font-normal"
                                  >
                                    Hapus
                                  </label>
                                </div>
                              </form>
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
            </>
          }
        />
        <Route path="/:id" element={<EditMaintenance />} />
      </Routes>

      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-warning flex items-center gap-1">
            <Icon.AlertCircle size={20} /> Peringatan
          </h3>
          <p className="py-4">
            Anda yakin ingin menghapus data {mtModalData?.name} dengan harga
            {" " + currency(mtModalData?.cost)}?
          </p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-outline">
              Tidak
            </label>
            <label
              htmlFor="my_modal_6"
              className="btn"
              onClick={() => {
                setMessage("");
                setStatus(null);
                deleteMaintenance(mtModalData?.id);
              }}
            >
              Ya
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenanceTable;
