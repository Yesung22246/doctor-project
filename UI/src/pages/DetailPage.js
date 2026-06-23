import { useNavigate } from "react-router-dom";
import { doctors } from "../data/mockData";
import Card from "../components/Card";
import { formatMoney } from "../utils/formatMoney";
import { Star } from "@phosphor-icons/react";
import { useGlobal } from "../context/GlobalContext";

export default function PageDetail() {
    const { selectedDoctor } = useGlobal();
    const navigate = useNavigate();
    
    // Đảm bảo không bị lỗi crash màn hình nếu chưa có data, tự động lấy bác sĩ mock nếu người dùng f5 trang
    const doctor = selectedDoctor || doctors[0];

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <Card className="overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[380px_1fr]">
                    <img src={doctor.avatar} alt={doctor.name} className="h-full min-h-[340px] w-full object-cover" />
                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800">{doctor.name}</h2>
                                <p className="mt-1 text-slate-500">{doctor.specialty} • {doctor.hospital || "Phòng khám Đa khoa"}</p>
                            </div>
                            <div className="rounded-2xl bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-600">
                                <Star className="inline" size={14} /> {doctor.rating || 5} ({doctor.reviews || 0} đánh giá)
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl bg-sky-50 p-4"><div className="text-sm text-slate-500">Kinh nghiệm</div><div className="mt-1 font-semibold text-slate-800">{doctor.experience || "Chưa cập nhật"}</div></div>
                            <div className="rounded-2xl bg-sky-50 p-4"><div className="text-sm text-slate-500">Bằng cấp</div><div className="mt-1 font-semibold text-slate-800">{doctor.degree || "Chưa cập nhật"}</div></div>
                            <div className="rounded-2xl bg-sky-50 p-4"><div className="text-sm text-slate-500">Chi phí khám</div><div className="mt-1 font-semibold text-slate-800">{doctor.fee ? formatMoney(doctor.fee) : (doctor.price ? formatMoney(doctor.price) : "Liên hệ")}</div></div>
                        </div>

                        <p className="mt-6 leading-7 text-slate-600">{doctor.bio || "Bác sĩ tận tâm, chuyên nghiệp và giàu kinh nghiệm."}</p>

                        <div className="mt-6">
                            <h3 className="mb-3 text-lg font-semibold text-slate-800">Lịch làm việc</h3>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {(doctor.schedule || ["Thứ 2", "Thứ 4", "Thứ 6"]).map((s) => (
                                    <div key={s} className="rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm text-slate-600">{s}</div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {(doctor.tags || ["Khám online", "Khám trực tiếp"]).map((tag) => (
                                <span key={tag} className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">{tag}</span>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button onClick={() => navigate(`/booking/${doctor._id || doctor.id}`)} className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700">Đặt lịch</button>
                            <button onClick={() => navigate("/review")} className="rounded-2xl border border-sky-200 px-6 py-3 font-semibold text-sky-700 hover:bg-sky-50">Xem / gửi đánh giá</button>
                        </div>
                    </div>
                </div>
            </Card>
        </main>
    );
}