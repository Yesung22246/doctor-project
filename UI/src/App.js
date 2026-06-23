import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from './pages/ProfilePage';
import RescheduleBooking from "./pages/booking/RescheduleBooking";
import BookingPage from "./pages/booking/BookingPage";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import PaymentPage from "./pages/PaymentPage";
import SubmitPage from "./pages/SubmitPage";
import UserPage from "./pages/UserPage";
import HistoryPage from "./pages/HistoryPage";
import ReviewPage from "./pages/ReviewPage";

import { ModalProvider } from "./utils/useModal";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            {/* Auth layout — không có Header & Footer */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Main layout — có Header & Footer */}
            <Route element={<MainLayout />}>
              {/* Public — ai cũng vào được */}
              <Route path="/" element={<HomePage />} />
              <Route path="/detail" element={<DetailPage />} />

              {/* Private — phải đăng nhập mới vào được */}
              <Route element={<PrivateRoute />}>
                
                {/* ĐÃ THÊM ROUTE PROFILE VÀO ĐÂY */}
                <Route path="/profile" element={<ProfilePage />} />
                
                <Route path="/booking">
                  <Route path=":_id/reschedule" element={<RescheduleBooking />} />
                  <Route path=":_id" element={<BookingPage />} />
                </Route>
                <Route path="/payment/:_id" element={<PaymentPage />} />
                <Route path="/submit/:_id" element={<SubmitPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/review" element={<ReviewPage />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ModalProvider>
      </BrowserRouter>
    </GlobalProvider>
  );
}