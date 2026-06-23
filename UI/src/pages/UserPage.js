import { useEffect, useState } from "react";
import Card from "../components/Card";
import { UserIcon } from "@phosphor-icons/react";
import { useGlobal } from "../context/GlobalContext"
import { getData, putData } from "../utils/callAPI";

export default function User() {
    const { user, setUser, loading, setLoading } = useGlobal();

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            if (!user?._id) return; 
            try {
                const response = await getData({ url: `/bookings/user/${user?._id}` });
                setBookings(response.data.bookings || []);
            } catch (error) {
                console.error(error);
            }
        }
        getBookings();
    }, [user?._id]);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await getData({
                    url: "/users",
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProfile();
    }, [setUser]);

    async function handleUpdateProfile() {
        try {
            setLoading(true);
            const response = await putData({
                url: "/users",
                data: {
                    name: user?.name,
                    username: user?.username,
                    phone: user?.phone
                }
            });

            setUser(response.data.user);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            alert("Cập nhật thành công");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // CHẶN LỖI TRẮNG TRANG: Nếu chưa có dữ liệu user thì hiện màn hình chờ
    if (!user) {
        return (
            <div className="mt-20 flex flex-col items-center justify-center text-slate-500">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-600 border-t-transparent"></div>
                <p className="mt-4 font-medium">Đang tải thông tin...</p>
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-sky-100 p-3 text-sky-700"><UserIcon size={20} /></div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Tài khoản người dùng</h2>
                            <p className="text-sm text-slate-500">Quản lý hồ sơ và lịch hẹn</p>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        {/* Thêm fallback || "" để không bao giờ bị lỗi input */}
                        <input value={user?.name || ""} onChange={(e) => setUser((p) => ({ ...p, name: e.target.value }))} className="w-full rounded-2xl border border-sky-100 px-4 py-3" placeholder="Họ và tên" />
                        <input value={user?.email || ""} onChange={(e) => setUser((p) => ({ ...p, email: e.target.value }))} className="w-full rounded-2xl border border-sky-100 px-4 py-3" placeholder="Email" />
                        <input value={user?.phone || ""} onChange={(e) => setUser((p) => ({ ...p, phone: e.target.value }))} className="w-full rounded-2xl border border-sky-100 px-4 py-3" placeholder="Số điện thoại" />
                        <button onClick={handleUpdateProfile}
                            disabled={loading} className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white">Cập nhật thông tin cá nhân</button>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-xl font-bold text-slate-800">Lịch đã đặt</h3>
                    <div className="mt-5 space-y-4">
                        {bookings?.length > 0 ? (bookings?.map((a) => (
                            <div key={a.id || a._id} className="rounded-3xl border border-sky-100 p-5">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <div className="font-semibold text-slate-800">{a.doctorName}</div>
                                        <div className="text-sm text-slate-500">{a.date} • {a.time} • {a.mode === "online" ? "Online" : "Offline"}</div>
                                    </div>
                                    <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">{a.status || "Chờ khám"}</span>
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <button className="rounded-2xl border border-sky-200 px-4 py-2 text-sm font-semibold text-sky-700">Đổi lịch</button>
                                    <button className="rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">Hủy lịch</button>
                                </div>
                            </div>
                        ))) : <div className="text-sm text-slate-500">Chưa có lịch hẹn nào.</div>}
                    </div>
                </Card>
            </div>
        </main>
    );
}