import React, { useState } from "react";
import Card from "../components/Card";
import { CheckIcon, LogIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/callAPI";
import { useGlobal } from "../context/GlobalContext";

export default function PageLogin() {
    const [loginMode, setLoginMode] = useState("login");
    // Đã thêm confirmPassword vào state để lưu trữ tạm thời
    const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();
    const { login } = useGlobal();

    const handleLSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        // --- KIỂM TRA XÁC NHẬN MẬT KHẨU (CHỈ KHI ĐĂNG KÝ) ---
        if (loginMode === "signup" && authForm.password !== authForm.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.");
            return; // Dừng lại ngay lập tức, không gọi API
        }

        try {
            console.log("Đang gửi dữ liệu...");
            let res;

            if (loginMode === "login") {
                // Khi đăng nhập chỉ gửi email và password
                res = await postData({
                    url: "/users/auth/login",
                    data: { email: authForm.email, password: authForm.password }
                });
            } else {
                // Khi đăng ký chỉ gửi name, email và password (Lọc bỏ confirmPassword)
                res = await postData({
                    url: "/users/auth/register",
                    data: { name: authForm.name, email: authForm.email, password: authForm.password }
                });
            }

            console.log("API response:", res.data);
            
            // Lưu thông tin đăng nhập
            login(res.data?.id, res.data?.token);
            
            // Chuyển về trang chủ
            navigate("/");

        } catch (err) {
            console.log("Lỗi từ server:", err.response ? err.response.data : err.message);
            
            if (err.response) {
                alert("Lỗi: " + JSON.stringify(err.response.data));
            } else {
                alert("Lỗi kết nối: " + err.message);
            }
        }
    };

    return (
        <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-2 md:px-6">
            <Card className="p-6">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-2xl bg-sky-100 p-3 text-sky-700"><LogIcon size={20} /></div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">{loginMode === "login" ? "Đăng nhập" : "Tạo tài khoản"}</h2>
                        <p className="text-sm text-slate-500">Truy cập để quản lý lịch hẹn của bạn</p>
                    </div>
                </div>

                <div className="mb-5 flex rounded-2xl bg-sky-50 p-1">
                    <button onClick={() => setLoginMode("login")} className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${loginMode === "login" ? "bg-white text-sky-700 shadow-sm" : "text-slate-500"}`}>Đăng nhập</button>
                    <button onClick={() => setLoginMode("signup")} className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${loginMode === "signup" ? "bg-white text-sky-700 shadow-sm" : "text-slate-500"}`}>Đăng ký</button>
                </div>

                <div className="space-y-4">
                    {loginMode === "signup" && (
                        <input value={authForm.name} onChange={(e) => setAuthForm((p) => ({ ...p, name: e.target.value }))} placeholder="Họ và tên" className="w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400" />
                    )}
                    
                    <input value={authForm.email} onChange={(e) => setAuthForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" className="w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400" />
                    
                    <input type="password" value={authForm.password} onChange={(e) => setAuthForm((p) => ({ ...p, password: e.target.value }))} placeholder="Mật khẩu" className="w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400" />
                    
                    {/* Ô XÁC NHẬN MẬT KHẨU (CHỈ HIỆN KHI ĐĂNG KÝ) */}
                    {loginMode === "signup" && (
                        <input type="password" value={authForm.confirmPassword} onChange={(e) => setAuthForm((p) => ({ ...p, confirmPassword: e.target.value }))} placeholder="Xác nhận mật khẩu" className="w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400" />
                    )}

                    <button
                        onClick={handleLSubmit}
                        className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-700"
                    >
                        {loginMode === "login" ? "Đăng nhập" : "Đăng ký"}
                    </button>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-800">Lợi ích khi có tài khoản</h3>
                <div className="mt-5 space-y-4 text-sm text-slate-600">
                    <div className="flex gap-3"><CheckIcon className="mt-0.5 text-sky-600" size={18} /> Xem nhanh các lịch đã đặt và trạng thái xác nhận.</div>
                    <div className="flex gap-3"><CheckIcon className="mt-0.5 text-sky-600" size={18} /> Cập nhật thông tin cá nhân dễ dàng.</div>
                    <div className="flex gap-3"><CheckIcon className="mt-0.5 text-sky-600" size={18} /> Theo dõi lịch sử khám và các ghi chú quan trọng.</div>
                </div>
            </Card>
        </main>
    );
}