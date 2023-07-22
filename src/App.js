import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  DashboardPage,
  DetailRoomPage,
  HomePage,
  InfoRoomPage,
  InvoiceMember,
  NotFoundPage,
  PrintFinancialReport,
  RegulationPage,
  SigninPage,
  SignupPage,
  SignupPageGuest,
} from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup/:roomId" element={<SignupPage />} />
          <Route path="/signup" element={<SignupPageGuest />} />
          <Route
            path="/print-financial-report"
            element={<PrintFinancialReport />}
          />
          <Route path="/inforoom" element={<InfoRoomPage />} />
          <Route path="/regulation" element={<RegulationPage />} />
          <Route path="/roominfo/:id" element={<DetailRoomPage />} />
          <Route
            path="/dashboard/paymenthistory/invoice/:id"
            element={<InvoiceMember />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
