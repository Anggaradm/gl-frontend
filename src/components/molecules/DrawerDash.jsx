import React from "react";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DrawerDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content pt-[5%]">
            {/* Sidebar content here */}

            {user?.userStatus === "guest" || user?.userStatus === "ex" ? (
              <>
                <li>
                  <details>
                    <summary>
                      <Icon.User size={20} className="mr-2" />
                      User
                    </summary>
                    <ul>
                      <li>
                        <Link to="/dashboard">Profil</Link>
                      </li>
                      {user && user.userStatus === "admin" ? (
                        <li>
                          <Link to="/dashboard/booking">Daftar Booking</Link>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>
                      <Icon.Home size={20} className="mr-2" />
                      Kamar
                    </summary>
                    <ul>
                      <li>
                        <Link to="/dashboard/choosenewroom">Pilih Kamar</Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            ) : (
              <>
                <li>
                  <details>
                    <summary>
                      <Icon.User size={20} className="mr-2" />
                      User
                    </summary>
                    <ul>
                      <li>
                        <Link to="/dashboard">Profil</Link>
                      </li>
                      {user && user.userStatus === "admin" ? (
                        <li>
                          <Link to="/dashboard/booking">Daftar Booking</Link>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary>
                      <Icon.Home size={20} className="mr-2" />
                      Kamar
                    </summary>
                    <ul>
                      <li>
                        <Link to="/dashboard/roominfo">Informasi Kamar</Link>
                      </li>
                      {user && user.userStatus === "admin" ? (
                        <li>
                          <Link to="/dashboard/addroom">Tambah Kamar</Link>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary>
                      <Icon.DollarSign size={20} className="mr-2" />
                      Pembayaran
                    </summary>
                    <ul>
                      <li>
                        <Link to="/dashboard/paymenthistory">
                          Riwayat Pembayaran
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/addpayment">
                          Tambah Pembayaran
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>

                {user &&
                  (user.userStatus === "admin" ? (
                    <>
                      <li>
                        <details>
                          <summary>
                            <Icon.FolderMinus size={20} className="mr-2" />
                            Pengeluaran
                          </summary>
                          <ul>
                            <li>
                              <Link to="/dashboard/maintenance">
                                Data Pengeluaran
                              </Link>
                            </li>
                            <li>
                              <Link to="/dashboard/addmaintenance">
                                Tambah Pengeluaran
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>

                      <li>
                        <details>
                          <summary>
                            <Icon.BookOpen size={20} className="mr-2" />
                            Keuangan
                          </summary>
                          <ul>
                            <li>
                              <Link to="/dashboard/financial">
                                Catatan Keuangan
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </>
                  ) : (
                    ""
                  ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrawerDashboard;
