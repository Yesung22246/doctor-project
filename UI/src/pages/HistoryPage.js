import { useState } from "react";
// Đã xóa HeadlightsIcon vì không dùng
import { ClockUserIcon } from "@phosphor-icons/react"; 
import Card from "../components/Card";

export default function History() {

    // Chỉ lấy history, bỏ setHistory vì đang dùng mock data cứng
    const [history] = useState([
        {
            date: "2026-03-12",
            doctorName: "BS. Trần Thu Hà",
            reason: "Khám da liễu",
            note: "Được kê đơn và hẹn tái khám sau 2 tuần.",
        },
    ]);

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
            <Card className="p-6">
                <div className="flex items-center gap-3">
                    {/* Đã sửa tên icon cho đúng vì History không phải là tên icon hợp lệ trong Phosphor */}
                    <div className="rounded-2xl bg-sky-100 p-3 text-sky-700"><ClockUserIcon size={20} /></div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Lịch sử khám</h2>
                        <p className="text-sm text-slate-500">Theo dõi cuộc hẹn và ghi chú bệnh án</p>
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    {history.map((h, idx) => (
                        <div key={idx} className="rounded-3xl border border-sky-100 p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <div className="font-semibold text-slate-800">{h.doctorName}</div>
                                    <div className="text-sm text-slate-500">{h.date} • {h.reason}</div>
                                </div>
                                <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">Đã lưu</span>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{h.note}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </main>
    );
}