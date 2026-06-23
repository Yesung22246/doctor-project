import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Menu,
  X,
  User,
  LogOut,
  UserCircle,
} from "lucide-react";

import { useGlobal } from "../context/GlobalContext";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useGlobal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const NAV_LINKS = [
    { to: "/", label: "Trang chủ" },
    { to: "/user", label: "Lịch sử" },
    { to: "/review", label: "Đánh giá" },
  ];

  const handleLogout = () => {
    logout();

    setUserMenuOpen(false);

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 text-left">
          <div className="rounded-2xl bg-sky-100 p-2 text-sky-700">
            <ShieldCheck size={22} />
          </div>

          <div>
            <div className="text-lg font-bold text-slate-800">
              DoctorCare
            </div>

            <div className="text-xs text-slate-500">
              Đặt lịch khám an toàn, nhanh chóng
            </div>
          </div>
        </Link>

        {/* DESKTOP */}
        <nav className="hidden items-center gap-2 md:flex">

          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                pathname === to
                  ? "bg-sky-100 text-sky-700"
                  : "text-slate-600 hover:bg-sky-50"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* CHƯA LOGIN */}
          {!isAuthenticated && (
            <Link
              to="/login"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                pathname === "/login"
                  ? "bg-sky-100 text-sky-700"
                  : "text-slate-600 hover:bg-sky-50"
              }`}
            >
              Đăng nhập
            </Link>
          )}

          {/* ĐÃ LOGIN */}
          {isAuthenticated && (
            <div
              className="relative"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >

              {/* ICON USER */}
              <button className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 transition hover:bg-sky-200">
                <User size={20} />
              </button>

              {/* DROPDOWN */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 top-12 w-52 rounded-2xl border border-sky-100 bg-white p-2 shadow-lg"
                  style={{ transform: `translateY(-10px)` }}
                >

                  {/* THÔNG TIN */}
                  <Link
                    to="/user"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-sky-50"
                  >
                    <UserCircle size={18} />
                    Thông tin tài khoản
                  </Link>

                  {/* ĐĂNG XUẤT */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="rounded-2xl border border-sky-100 p-2 text-sky-700 md:hidden"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t border-sky-100 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">

            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-sky-50 px-4 py-2 text-left text-sm font-medium text-slate-700"
              >
                {label}
              </Link>
            ))}

            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-sky-50 px-4 py-2 text-left text-sm font-medium text-slate-700"
              >
                Đăng nhập
              </Link>
            )}

            {isAuthenticated && (
              <>
                <Link
                  to="/user"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-sky-50 px-4 py-2 text-left text-sm font-medium text-slate-700"
                >
                  Tài khoản
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-50 px-4 py-2 text-left text-sm font-medium text-red-500"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}