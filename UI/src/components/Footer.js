import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <div className="mb-3 text-lg font-bold text-slate-800">DoctorCare</div>
          <p className="text-sm leading-6 text-slate-600">
            Nền tảng đặt lịch hẹn bác sĩ với giao diện nhẹ nhàng, tin cậy, hỗ trợ đặt
            lịch, thanh toán và theo dõi hồ sơ khám bệnh.
          </p>
        </div>
        <div>
          <div className="mb-3 font-semibold text-slate-800">Liên kết</div>
          <div className="space-y-2 text-sm text-slate-600">
            <div>Trang chủ</div>
            <div>Đặt lịch</div>
            <div>Tài khoản người dùng</div>
            <div>Lịch sử khám</div>
          </div>
        </div>
        <div>
          <div className="mb-3 font-semibold text-slate-800">Cam kết</div>
          <div className="space-y-2 text-sm text-slate-600">
            <div>Thông tin minh bạch</div>
            <div>Thanh toán an toàn</div>
            <div>Bảo mật dữ liệu cá nhân</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
