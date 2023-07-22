import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const PrintFinancialReport = () => {
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
  const [financials, setFinancials] = useState([]);

  useEffect(() => {
    getFinancials();
  }, []);

  const getFinancials = async () => {
    const response = await axios.get(`${serverUrl}/financials`);
    setFinancials(response.data);
  };

  // currency
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

  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 1000);
  }, []);

  return (
    <>
      <div className="bg-white w-screen min-h-screen">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            Laporan Keuangan Griya Lestari
          </h1>
          <div>
            <table>
              <tr>
                <td>Pemasukan</td>
                <td className="px-2">:</td>
                <td>{currency(financials?.income)}</td>
              </tr>
              <tr>
                <td>Pengeluaran</td>
                <td className="px-2">:</td>
                <td>{currency(financials?.outcome)}</td>
              </tr>
              <tr>
                <td>Total Pendapatan</td>
                <td className="px-2">:</td>
                <td>{currency(financials?.balance)}</td>
              </tr>
            </table>
          </div>
          <div className="mt-12">
            <h2 className="text-xl font-medium mb-2">Detail Pemasukan</h2>
            <table className="min-w-[50%] bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">No.</th>
                  <th className="px-4 py-2 border">Keterangan</th>
                  <th className="px-4 py-2 border">Tanggal</th>
                  <th className="px-4 py-2 border">Nominal</th>
                </tr>
              </thead>
              <tbody>
                {financials.incomeData?.map((payment, index) => (
                  <tr>
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      Pembayaran kamar nomor {payment.roomName}
                    </td>
                    <td className="px-4 py-2 border">
                      {payment.createdAt?.toString().slice(0, 10)}
                    </td>
                    <td className="px-4 py-2 border">
                      {currency(payment.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">{currency(financials?.income)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-12">
            <h2 className="text-xl font-medium mb-2">Detail Pengeluaran</h2>
            <table className="min-w-[50%] bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">No.</th>
                  <th className="px-4 py-2 border">Keterangan</th>
                  <th className="px-4 py-2 border">Tanggal</th>
                  <th className="px-4 py-2 border">Nominal</th>
                </tr>
              </thead>
              <tbody>
                {financials.maintenanceData?.map((maintenance, index) => (
                  <tr>
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      {maintenance.mtType === "newBuy"
                        ? "Membeli "
                        : "Memperbaiki "}
                      {maintenance.mtName}
                    </td>
                    <td className="px-4 py-2 border">
                      {maintenance.mtDate?.toString().slice(0, 10)}
                    </td>
                    <td className="px-4 py-2 border">
                      {currency(maintenance.mtCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">{currency(financials?.outcome)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintFinancialReport;
