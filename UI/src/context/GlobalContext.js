import React, { createContext, useContext, useState } from "react";
import { doctors as defaultDoctors, initialAppointments, initialHistory, paymentMethods } from "../data/mockData";

const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  // ---------- Auth ----------
  // Khi có API thực tế: đọc token từ localStorage để duy trì session sau khi refresh
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );

  // ---------- User ----------
  const [user, setUser] = useState(() => {
    try {

      const savedUser = localStorage.getItem("user");

      if (!savedUser || savedUser === "undefined") {
        return {
          name: "",
          email: "",
          phone: "",
        };
      }

      return JSON.parse(savedUser);

    } catch (error) {

      console.error("Parse user error:", error);

      localStorage.removeItem("user");

      return {
        name: "",
        email: "",
        phone: "",
      };
    }
  });
  // ---------- Doctor & Booking flow ----------
  const [selectedDoctor, setSelectedDoctor] = useState(defaultDoctors[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingMode, setBookingMode] = useState("online");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [patientInfo, setPatientInfo] = useState({ name: "", phone: "" });

  // ---------- Data lists ----------
  const [history, setHistory] = useState(initialHistory);
  const [reviews, setReviews] = useState({});

  // ---------- Global UI ----------
  const [loading, setLoading] = useState(false);

  // ---------- Auth actions ----------
  const login = (userData, token) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({ name: "", email: "", phone: "" });
    setIsAuthenticated(false);
  };

  // ---------- Data actions ----------
  const addHistory = (entry) =>
    setHistory((prev) => [entry, ...prev]);

  const addReview = (doctorId, review) =>
    setReviews((prev) => ({
      ...prev,
      [doctorId]: [review, ...(prev[doctorId] || [])],
    }));

  const value = {
    // Auth
    isAuthenticated,
    login,
    logout,

    // State
    user, setUser,
    selectedDoctor, setSelectedDoctor,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    bookingMode, setBookingMode,
    paymentMethod, setPaymentMethod,
    patientInfo, setPatientInfo,
    history, setHistory,
    reviews, setReviews,
    loading, setLoading,

    addHistory,
    addReview,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used inside GlobalProvider");
  return ctx;
}

export default GlobalContext;