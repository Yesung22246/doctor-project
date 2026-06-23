import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";
import Card from "../../components/Card";
import { useGlobal } from "../../context/GlobalContext";
import { formatMoney } from "../../utils/formatMoney";
import { useModal } from "../../utils/useModal";
import { bookingModes } from "../../data/mockData";
import { getData } from "../../utils/callAPI";

export default function BookingPage() {
    const navigate = useNavigate();
    const {
        selectedDoctor,
        selectedDate, setSelectedDate,
        selectedTime, setSelectedTime,
        bookingMode, setBookingMode,
        patientInfo, setPatientInfo,
        loading,
    } = useGlobal();

    const { showModal } = useModal();
    const [allSlots, setAllSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);

    useEffect(() => {
        async function fetchAvailableSlots() {
            if (!selectedDoctor?._id || !selectedDate) {
                setAllSlots([]);
                setBookedSlots([]);
                return;
            }

            try {
                setSelectedTime("");

                const response = await getData({
                    url: `/bookings/available-slots?doctorId=${selectedDoctor._id}&date=${selectedDate}`
                });

                setAllSlots(response.data?.allSlots || []);
                setBookedSlots(response.data?.bookedSlots || []);
            } catch (error) {
                console.error(error);
                setAllSlots([]);
                setBookedSlots([]);
            }
        }

        fetchAvailableSlots();
    }, [selectedDoctor, selectedDate, setSelectedTime]);

    const dates = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d.toISOString().slice(0, 10);
    });

    async function handleContinue() {
        showModal(
            'scale',
            'info',
            'Thông báo',
            `Xác nhận đặt lịch khám với ${selectedDoctor?.name} vào lúc ${selectedTime} ngày ${selectedDate}`,
            () => { },
            () => navigate(`/payment/${selectedDoctor._id}`)
        );
    }

    // THÊM ĐOẠN NÀY: Nếu tải lại trang mà mất thông tin bác sĩ thì báo quay lại trang chủ
    if (!selectedDoctor) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center px-4">
                <h2 className="text-2xl font-bold text-slate-800">Bạn chưa chọn bác sĩ nào!</h2>
                <p className="mt-2 text-slate-500">Hệ thống không tìm thấy thông tin bác sĩ. Vui lòng quay lại trang chủ để chọn bác sĩ nhé.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 rounded-2xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-sky-700"
                >
                    Quay lại Trang chủ
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-slate-800">Đặt lịch khám</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Chọn ngày, giờ, hình thức khám và thông tin bệnh nhân.
                    </p>

                    <div className="mt-6 space-y-6">
                        {/* Chọn ngày */}
                        <div>
                            <div className="mb-3 font-semibold text-slate-800">Chọn ngày</div>
                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                {dates.map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => setSelectedDate(d)}
                                        className={`rounded-2xl border px-4 py-3 text-sm font-medium ${selectedDate === d
                                            ? "border-sky-500 bg-sky-50 text-sky-700"
                                            : "border-sky-100 bg-white text-slate-600"
                                            }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chọn giờ */}
                        <div>
                            <div className="mb-3 font-semibold text-slate-800">Chọn khung giờ</div>
                            {allSlots.length === 0 ? (
                                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
                                    Vui lòng chọn ngày để xem lịch trống của bác sĩ.
                                </div>
                            ) : (
                                <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                    {allSlots.map((t) => {
                                        const isBooked = bookedSlots.includes(t);
                                        return (
                                            <button
                                                key={t}
                                                disabled={isBooked}
                                                onClick={() => !isBooked && setSelectedTime(t)}
                                                className={`
                                                    rounded-2xl border px-4 py-3 text-sm font-medium transition
                                                    ${isBooked
                                                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                                                        : selectedTime === t
                                                            ? "border-sky-500 bg-sky-50 text-sky-700"
                                                            : "border-sky-100 bg-white text-slate-600 hover:border-sky-300"
                                                    }
                                                `}
                                            >
                                                <div>{t}</div>
                                                {isBooked && (
                                                    <div className="mt-1 text-[11px]">Đã đặt</div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Hình thức khám */}
                        <div>
                            <div className="mb-3 font-semibold text-slate-800">Hình thức khám</div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {bookingModes?.map((m) => (
                                    <button
                                        key={m.key}
                                        onClick={() => setBookingMode(m.key)}
                                        className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left ${bookingMode === m.key
                                            ? "border-sky-500 bg-sky-50 text-sky-700"
                                            : "border-sky-100 bg-white text-slate-600"
                                            }`}
                                    >
                                        <span className="rounded-2xl bg-white p-2 shadow-sm">{m.icon}</span>
                                        <div>
                                            <div className="font-semibold">{m.label}</div>
                                            <div className="text-xs text-slate-500">
                                                {m.key === "online" ? "Khám từ xa" : "Khám tại phòng khám"}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Thông tin bệnh nhân - ĐÃ SỬA LỖI TRẮNG TRANG Ở ĐÂY */}
                        <div className="grid gap-3 md:grid-cols-2">
                            <input
                                value={patientInfo?.name || ""}
                                onChange={(e) => setPatientInfo((p) => ({ ...p, name: e.target.value }))}
                                className="rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400"
                                placeholder="Tên bệnh nhân"
                            />
                            <input
                                value={patientInfo?.phone || ""}
                                onChange={(e) => setPatientInfo((p) => ({ ...p, phone: e.target.value }))}
                                className="rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400"
                                placeholder="Số điện thoại"
                            />
                        </div>
                        <textarea
                            value={patientInfo?.note || ""}
                            onChange={(e) => setPatientInfo((p) => ({ ...p, note: e.target.value }))}
                            className="min-h-28 w-full rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-sky-400"
                            placeholder="Ghi chú triệu chứng / yêu cầu"
                        />

                        <button
                            disabled={!selectedDate || !selectedTime || loading}
                            onClick={handleContinue}
                            className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-sky-300 transition hover:bg-sky-700"
                        >
                            Tiếp tục
                        </button>
                    </div>
                </Card>

                {/* Tóm tắt */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-slate-800">Tóm tắt lịch hẹn</h3>
                        <div className="mt-4 space-y-3 text-sm text-slate-600">
                            <div className="flex items-center justify-between">
                                <span>Bác sĩ</span>
                                <span className="font-semibold text-slate-800">{selectedDoctor?.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Chuyên khoa</span>
                                <span className="font-semibold text-slate-800">{selectedDoctor?.specialty}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Ngày</span>
                                <span className="font-semibold text-slate-800">{selectedDate || "Chưa chọn"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Giờ</span>
                                <span className="font-semibold text-slate-800">{selectedTime || "Chưa chọn"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Hình thức</span>
                                <span className="font-semibold text-slate-800">
                                    {bookingMode === "online" ? "Online" : "Offline"}
                                </span>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-3 text-sky-700">
                            <CreditCard size={18} />
                            <span className="font-semibold">
                                Chi phí khám: {selectedDoctor ? formatMoney(selectedDoctor.price) : "—"}
                            </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Phần thanh toán sẽ được xác nhận ở bước tiếp theo.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}