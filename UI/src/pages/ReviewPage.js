import { useState } from "react";
import Card from "../components/Card";
import { Star } from "@phosphor-icons/react";


export default function Review() {

    // Đã xóa setSelectedDoctor và gán thông tin an toàn tránh lỗi crash giao diện
    const [selectedDoctor] = useState({ id: "1", name: "Bác sĩ", specialty: "Đa khoa" }); 
    const [reviewDraft, setReviewDraft] = useState({ rating: 5, content: "" });
    const [reviews, setReviews] = useState({});
    const user = { name: "Nguyễn Văn A" };

    const doctor = selectedDoctor;
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-800">Đánh giá bác sĩ</h2>
            <p className="mt-1 text-sm text-slate-500">Gửi nhận xét sau khi khám xong</p>
            <div className="mt-5 rounded-3xl bg-sky-50 p-5">
              <div className="font-semibold text-slate-800">{doctor?.name}</div>
              <div className="text-sm text-slate-500">{doctor?.specialty}</div>
            </div>
            <div className="mt-5 space-y-4">
              <select value={reviewDraft.rating} onChange={(e) => setReviewDraft((p) => ({ ...p, rating: Number(e.target.value) }))} className="w-full rounded-2xl border border-sky-100 px-4 py-3">
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} sao</option>)}
              </select>
              <textarea value={reviewDraft.content} onChange={(e) => setReviewDraft((p) => ({ ...p, content: e.target.value }))} className="min-h-36 w-full rounded-2xl border border-sky-100 px-4 py-3" placeholder="Viết đánh giá của bạn..." />
              <button
                onClick={() => {
                  setReviews((prev) => ({
                    ...prev,
                    [doctor.id]: [{ rating: reviewDraft.rating, content: reviewDraft.content, by: user.name }, ...(prev[doctor.id] || [])],
                  }));
                  setReviewDraft({ rating: 5, content: "" });
                }}
                className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white"
              >
                Gửi đánh giá
              </button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800">Phản hồi gần đây</h3>
            <div className="mt-5 space-y-4">
              {(reviews[doctor.id] || [
                { rating: 5, content: "Bác sĩ tư vấn rất kỹ và dễ hiểu.", by: "Mai Lan" },
                { rating: 4, content: "Quy trình đặt lịch nhanh, không phải chờ lâu.", by: "Văn Hùng" },
              ]).map((r, idx) => (
                <div key={idx} className="rounded-3xl border border-sky-100 p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-slate-800">{r.by}</div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600"><Star size={14} /> {r.rating}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{r.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    );
  }