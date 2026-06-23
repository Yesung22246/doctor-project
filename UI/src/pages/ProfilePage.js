import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Card from "../components/Card";
import { ShieldCheck, UserCircle, EnvelopeSimple, LockKey } from "@phosphor-icons/react";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useGlobal();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Lấy thông tin user hiện tại (từ Local Storage) điền vào form
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else if (user) {
            setFormData(prev => ({ 
                ...prev, 
                name: user.name || "", 
                email: user.email || ""
            }));
        }
    }, [user, isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra xác nhận mật khẩu
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            return alert("Mật khẩu xác nhận không khớp! Vui lòng nhập lại.");
        }

        try {
            // Cập nhật thông tin (Tên và Email)
            const updatedUser = { 
                ...user, 
                name: formData.name, 
                email: formData.email
            };
            
            // Lưu vào Local Storage để đồng bộ dữ liệu ngay lập tức
            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Cập nhật thông tin thành công!");
            window.location.reload(); 

        } catch (error) {
            alert("Đã xảy ra lỗi, vui lòng thử lại!");
        }
    };

    return (
        <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
            <div className="mb-8 text-center">
                <UserCircle size={80} className="mx-auto text-sky-600" weight="fill" />
                <h1 className="mt-4 text-3xl font-bold text-slate-800">Thông tin tài khoản</h1>
                <p className="text-slate-500">Quản lý thông tin cá nhân và bảo mật của bạn</p>
            </div>

            <Card className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Phần thông tin cá nhân */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                            <ShieldCheck size={24} className="text-sky-600" /> Thông tin cá nhân
                        </h2>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Họ và Tên */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                                <div className="flex items-center rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 focus-within:border-sky-400 focus-within:bg-white transition">
                                    <UserCircle size={20} className="text-slate-400 mr-2" />
                                    <input 
                                        type="text" name="name" 
                                        value={formData.name} onChange={handleChange}
                                        className="w-full bg-transparent outline-none text-slate-700" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <div className="flex items-center rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 focus-within:border-sky-400 focus-within:bg-white transition">
                                    <EnvelopeSimple size={20} className="text-slate-400 mr-2" />
                                    <input 
                                        type="email" name="email" 
                                        value={formData.email} onChange={handleChange}
                                        className="w-full bg-transparent outline-none text-slate-700" 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-sky-50" />

                    {/* Phần Đổi mật khẩu */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                            <LockKey size={24} className="text-sky-600" /> Đổi mật khẩu
                        </h2>
                        <p className="text-sm text-slate-500 mb-4">Bỏ trống nếu bạn không muốn đổi mật khẩu.</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu hiện tại</label>
                                <input 
                                    type="password" name="currentPassword" 
                                    value={formData.currentPassword} onChange={handleChange}
                                    className="w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400 focus:bg-sky-50 transition" 
                                    placeholder="Nhập mật khẩu hiện tại..."
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu mới</label>
                                    <input 
                                        type="password" name="newPassword" 
                                        value={formData.newPassword} onChange={handleChange}
                                        className="w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400 focus:bg-sky-50 transition" 
                                        placeholder="Mật khẩu mới..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Xác nhận mật khẩu mới</label>
                                    <input 
                                        type="password" name="confirmPassword" 
                                        value={formData.confirmPassword} onChange={handleChange}
                                        className="w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400 focus:bg-sky-50 transition" 
                                        placeholder="Nhập lại mật khẩu mới..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full rounded-2xl bg-sky-600 px-6 py-4 font-bold text-white transition hover:bg-sky-700 shadow-md hover:shadow-lg">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </Card>
        </main>
    );
}