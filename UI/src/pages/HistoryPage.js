import { useState, useEffect } from "react";
import { ClockUserIcon, CalendarCheck, Clock, MapPin, CheckCircle } from "@phosphor-icons/react"; 
import Card from "../components/Card";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Lấy lịch sử thật từ LocalStorage (nếu có đặt lịch thành công ở bước thanh toán)
        const savedBookings = JSON.stringify([
            {
                doctorName: "BS. Trần Thu Hà",
                specialty: "Da liễu",
                date: "26/06/2026",
                time: "14:30",
                location: "Bình Thạnh, TP.HCM",
                status: "Đã xác nhận",
                note: "Được kê đơn và hẹn tái khám sau 2 tuần."
            }
        ]);
        
        // Giả lập lấy dữ liệu thực tế kết hợp với mock data để luôn có giao diện đẹp
        const localData = localStorage.getItem("myBookings");
        if (localData) {
            setHistory(JSON.parse(localData));
        } else {
            // Nếu chưa đặt thật thì lấy cái mặc định xịn xò này
            setHistory(JSON.parse(savedBookings));
        }
    }, []);

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="rounded-2xl bg-sky-100 p-3 text-sky-700"><ClockUserIcon size={24} weight="fill" /></div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Lịch sử khám</h2>
                        <p className="text-sm text-slate-500">Theo dõi cuộc hẹn và ghi chú bệnh án</p>
                    </div>
                </div>

                {history.length === 0 ? (
                    <div className="py-10 text-center text-slate-500">Bạn chưa có lịch hẹn nào.</div>
                ) : (
                    <div className="mt-6 space-y-4">
                        {history.map((h, idx) => (
                            <div key={idx} className="rounded-[1.5rem] border border-sky-100 bg-white p-5 shadow-sm hover:shadow-md transition">
                                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                                    <div>
                                        <div className="text-lg font-bold text-slate-800">{h.doctorName}</div>
                                        <div className="text-sm font-medium text-sky-600">{h.specialty || "Khám bệnh"}</div>
                                    </div>
                                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                                        <CheckCircle size={16} weight="fill" /> {h.status || "Đã hoàn thành"}
                                    </div>
                                </div>
                                
                                <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                                    <div className="flex items-center gap-2"><CalendarCheck size={18} className="text-sky-500" /> Ngày khám: <strong>{h.date}</strong></div>
                                    <div className="flex items-center gap-2"><Clock size={18} className="text-sky-500" /> Giờ khám: <strong>{h.time}</strong></div>
                                    <div className="flex items-center gap-2 sm:col-span-2"><MapPin size={18} className="text-sky-500" /> Địa điểm: {h.location || "Phòng khám trung tâm"}</div>
                                </div>

                                {h.note && (
                                    <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                                        <strong className="text-slate-700">Ghi chú:</strong> {h.note}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </main>
    );
}
