import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../../data/mockData";
import Card from "../../components/Card";
import { formatMoney } from "../../utils/formatMoney";
import { CreditCard } from "@phosphor-icons/react";

const timeSlots = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00"];
const bookingModes = [
    { key: "online", label: "Khám online", icon: "💻" },
    { key: "offline", label: "Khám offline", icon: "🏥" },
];

export default function RescheduleBooking() {
    const dates = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d.toISOString().slice(0, 10);
    });

    const { doctorId } = useParams();
    const navigate = useNavigate();
    const selectedDoctor = doctors.find((d) => d.id === doctorId);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [bookingMode, setBookingMode] = useState("online");
    const [patientInfo, setPatientInfo] = useState({ name: "", phone: "", note: "" });
    const [loading, setLoading] = useState(false);


    return (
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-slate-800">Đặt lịch khám</h2>
                    <p className="mt-1 text-sm text-slate-500">Chọn ngày, giờ, hình thức khám và thông tin bệnh nhân.</p>

                    <div className="mt-6 space-y-6">
                        <div>
                            <div className="mb-3 font-semibold text-slate-800">Chọn ngày</div>
                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                {dates.map((d) => (
                                    <button key={d} onClick={() => setSelectedDate(d)} className={`rounded-2xl border px-4 py-3 text-sm font-medium ${selectedDate === d ? "border-sky-500 bg-sky-50 text-sky-700" : "border-sky-100 bg-white text-slate-600"}`}>
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="mb-3 font-semibold text-slate-800">Chọn khung giờ</div>
                            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                {timeSlots.map((t) => (
                                    <button key={t} onClick={() => setSelectedTime(t)} className={`rounded-2xl border px-4 py-3 text-sm font-medium ${selectedTime === t ? "border-sky-500 bg-sky-50 text-sky-700" : "border-sky-100 bg-white text-slate-600"}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="mb-3 font-semibold text-slate-800">Hình thức khám</div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {bookingModes.map((m) => (
                                    <button key={m.key} onClick={() => setBookingMode(m.key)} className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left ${bookingMode === m.key ? "border-sky-500 bg-sky-50 text-sky-700" : "border-sky-100 bg-white text-slate-600"}`}>
                                        <span className="rounded-2xl bg-white p-2 shadow-sm">{m.icon}</span>
                                        <div>
                                            <div className="font-semibold">{m.label}</div>
                                            <div className="text-xs text-slate-500">{m.key === "online" ? "Khám từ xa" : "Khám tại phòng khám"}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <input value={patientInfo.name} onChange={(e) => setPatientInfo((p) => ({ ...p, name: e.target.value }))} className="rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400" placeholder="Tên bệnh nhân" />
                            <input value={patientInfo.phone} onChange={(e) => setPatientInfo((p) => ({ ...p, phone: e.target.value }))} className="rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400" placeholder="Số điện thoại" />
                        </div>
                        <textarea value={patientInfo.note} onChange={(e) => setPatientInfo((p) => ({ ...p, note: e.target.value }))} className="min-h-28 w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400" placeholder="Ghi chú triệu chứng / yêu cầu" />

                        <button
                            disabled={!selectedDate || !selectedTime || loading}
                            onClick={async () => {
                                // await fakeApi(250);
                                navigate("payment");
                            }}
                            className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-sky-300"
                        >
                            Tiếp tục thanh toán
                        </button>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-slate-800">Tóm tắt lịch hẹn</h3>
                        <div className="mt-4 space-y-3 text-sm text-slate-600">
                            <div className="flex items-center justify-between"><span>Bác sĩ</span><span className="font-semibold text-slate-800">{selectedDoctor.name}</span></div>
                            <div className="flex items-center justify-between"><span>Chuyên khoa</span><span className="font-semibold text-slate-800">{selectedDoctor.specialty}</span></div>
                            <div className="flex items-center justify-between"><span>Ngày</span><span className="font-semibold text-slate-800">{selectedDate || "Chưa chọn"}</span></div>
                            <div className="flex items-center justify-between"><span>Giờ</span><span className="font-semibold text-slate-800">{selectedTime || "Chưa chọn"}</span></div>
                            <div className="flex items-center justify-between"><span>Hình thức</span><span className="font-semibold text-slate-800">{bookingMode === "online" ? "Online" : "Offline"}</span></div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-3 text-sky-700"><CreditCard size={18} /><span className="font-semibold">Chi phí khám: {formatMoney(selectedDoctor.fee)}</span></div>
                        <p className="mt-3 text-sm leading-6 text-slate-500">Phần thanh toán sẽ được xác nhận ở bước tiếp theo với các phương thức giả lập.</p>
                    </Card>
                </div>
            </div>
        </main>
    );
}