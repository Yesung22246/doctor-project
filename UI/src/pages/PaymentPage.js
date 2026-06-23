import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { formatMoney } from "../utils/formatMoney";
import { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { postData } from "../utils/callAPI";
import { useModal } from "../utils/useModal";

const paymentMethods = ["Thẻ tín dụng", "Ví điện tử", "Chuyển khoản ngân hàng"];

export default function PaymentPage() {

    const {
        user,
        patientInfo,
        selectedDoctor,
        selectedDate,
        selectedTime,
        bookingMode,
        paymentMethod,
        setPaymentMethod,
    } = useGlobal();
    const { showModal } = useModal();

    const [loading] = useState(false); // Đã xóa setLoading
    const navigate = useNavigate();

    async function handleConfirmBooking() {
        const form = {
            patientId: user,
            doctorId: selectedDoctor._id,
            doctorName: selectedDoctor.name,
            date: selectedDate,
            time: selectedTime,
            mode: bookingMode,
            phone: patientInfo?.phone || 0,
            price: selectedDoctor?.price,
            note: patientInfo?.note,
        }
        console.log(form)
        showModal(
            'scale', // Kiểu xuất hiện
            'info', // Trạng thái (ảnh hưởng đến màu sắc và icon)
            'Thông báo', // Tiêu đề
            `Xác nhận đặt lịch`,
            () => { }, // Callback khi đóng modal
            async () => {
                const response = await postData({
                    url: "/bookings", data: form
                })
                console.log(response.data.booking?._id)
                if (response.status === 201) { // Đã sửa == thành ===
                    showModal(
                        'scale',
                        'success',
                        'Thông báo',
                        'Đặt lịch thành công',
                        () => { },
                        () => navigate(`/submit/${response.data.booking._id}`)
                    )
                }
            } // Callback khi nhấn nút chính
        )
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
            <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800">Thanh toán</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl bg-sky-50 p-5">
                        <div className="text-sm text-slate-500">Chi phí khám</div>
                        <div className="mt-2 text-3xl font-bold text-slate-800">{formatMoney(selectedDoctor.price)}</div>
                        <div className="mt-3 text-sm text-slate-600">Bác sĩ: {selectedDoctor?.name}</div>
                        <div className="text-sm text-slate-600">Ngày: {selectedDate || "Chưa chọn"} • {selectedTime || "Chưa chọn"}</div>
                        <div className="text-sm text-slate-600">Hình thức: {bookingMode === "online" ? "Online" : "Offline"}</div>
                    </div>

                    <div>
                        <div className="mb-3 font-semibold text-slate-800">Chọn phương thức thanh toán</div>
                        <div className="space-y-3">
                            {paymentMethods.map((m) => (
                                <button key={m} onClick={() => setPaymentMethod(m)} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium ${paymentMethod === m ? "border-sky-500 bg-sky-50 text-sky-700" : "border-sky-100 bg-white text-slate-600"}`}>
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button onClick={() => navigate(`/booking/${selectedDoctor._id}`)} className="rounded-2xl border border-sky-200 px-6 py-3 font-semibold text-sky-700">Quay lại</button>
                    <button onClick={handleConfirmBooking} disabled={loading} className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white disabled:bg-sky-300">{loading ? "Đang xử lý..." : "Xác nhận đặt lịch"}</button>
                </div>
            </Card>
        </main>
    );
}