import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Copyright, LogoText } from "../components";
import { getMe } from "../features/authSlice";

const InvoiceMember = () => {
  function printComponent(componentId) {
    const printContent = document.getElementById(componentId);
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
  }

  // consumeAPI
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [payment, setPayment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const getPayment = async () => {
    await axios.get(`${serverUrl}/payments/${id}`).then((res) => {
      setPayment(res.data);
    });
  };

  useEffect(() => {
    getPayment();
  }, []);

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

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center">
        <div className="w-full flex flex-col items-center justify-center py-12 px-10">
          <h1 className="text-2xl font-bold">
            Invoice <LogoText />
          </h1>
          <h2>Terima kasih telah menjadi pelangan kami</h2>
          <div className="w-full lg:max-w-4xl flex flex-col-reverse">
            <div id="printable">
              <div className="w-full bg-gray-400 p-6 min-h-screen">
                <div className="w-full flex flex-col bg-slate-200 p-4 text-black">
                  <div className="w-full flex justify-between border-b-[1.5px] border-b-slate-500 py-4">
                    <div className="flex flex-col">
                      <LogoText />
                      <span className="mt-2">
                        Pembayaran kamar {payment.roomName}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      Tanggal: {payment.createdAt?.toString().slice(0, 10)}
                      <span className="mt-2">
                        Status:{" "}
                        <span className="font-bold uppercase">lunas</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between border-b-2 border-b-black py-4">
                    <div className="w-[50%] flex flex-col">
                      Dari:
                      <span className="my-2 font-bold">Griya Kost Lestari</span>
                      <p className="text-xs">
                        Jl. Gemulung, Gg. 3
                        <br />
                        ds.Pulodarat, rt 19 / rw 002, <br />
                        kec.Pecangaan, Jepara
                      </p>
                    </div>
                    <div className="w-[50%] flex flex-col text-end">
                      Kepada:
                      <span className="mt-2">
                        <span className="my-2 font-bold">
                          {user && user.name}
                        </span>
                        <p className="text-xs">{user && user.email}</p>
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      <tbody>
                        {/* row 1 */}
                        <tr className="w-full">
                          <th className="w-[50%]">Status</th>
                          <td className="w-[50%]">Transaksi berhasil</td>
                        </tr>
                        {/* row 2 */}
                        <tr className="w-full">
                          <th className="w-[50%]">Tanggal</th>
                          <td className="w-[50%]">
                            {payment.createdAt?.toString().slice(0, 10)}
                          </td>
                        </tr>
                        {/* row 3 */}
                        <tr className="w-full">
                          <th className="w-[50%]">Total Tagihan</th>
                          <td className="w-[50%]">{currency(payment.price)}</td>
                        </tr>
                        <tr className="w-full">
                          <th className="w-[50%]">Total Bayar</th>
                          <td className="w-[50%]">{currency(payment.price)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
                    <div className=" text-center text-xs font-light border-t-2 mt-24">
                      Terima kasih telah menjadi pelanggan kami
                    </div>
                    <Copyright />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:max-w-4xl flex items-start">
              <button
                onClick={() => printComponent("printable")}
                className="btn btn-primary mt-12 mb-6"
              >
                cetak
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceMember;
