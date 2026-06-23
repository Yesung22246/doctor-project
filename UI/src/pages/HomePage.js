import { useEffect, useState, useMemo } from "react";
import { useGlobal } from "../context/GlobalContext";
import { BandaidsIcon, MapPin, ShieldCheck, Star, MagnifyingGlassIcon, ClockUserIcon, ArrowArcRightIcon } from "@phosphor-icons/react";
import Card from "../components/Card";
import { formatMoney } from "../utils/formatMoney";
import { useNavigate } from "react-router-dom";
import { getData } from "../utils/callAPI";

export default function HomePage() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const { setSelectedDoctor, isAuthenticated, user } = useGlobal();

    useEffect(() => {
        getData({ url: "/doctors" }).then((res) => {
            setDoctors(res?.data?.doctors || res?.data || []);
        }).catch((error) => {
            console.error("Error fetching doctors:", error);
        });
    }, []);

    const specialties = [
        { name: "Nhi khoa", icon: "👶", count: 24 },
        { name: "Tim mạch", icon: "❤️", count: 18 },
        { name: "Da liễu", icon: "✨", count: 15 },
        { name: "Răng hàm mặt", icon: "🦷", count: 12 },
        { name: "Sản phụ khoa", icon: "🤰", count: 20 },
        { name: "Thần kinh", icon: "🧠", count: 10 },
    ];

    async function goToBooking(doctor) {
        setSelectedDoctor(doctor);
        navigate(`/booking/${doctor._id}`);
    }

    async function goToDetail(doctor) {
        setSelectedDoctor(doctor);
        navigate(`/detail`);
    }

    // BỘ LỌC THÔNG MINH: Lọc được cả tiếng Việt không dấu
    const filteredDoctors = useMemo(() => {
        const removeAccents = (str) => {
            return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';
        };
        
        const q = removeAccents(query.trim());
        if (!q) return doctors;
        
        return doctors.filter((d) => 
            removeAccents(d.name).includes(q) || 
            removeAccents(d.specialty).includes(q)
        );
    }, [query, doctors]);

    const scrollToDoctorList = () => {
        document.getElementById('doctor-list')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <section className="grid gap-6 rounded-[2rem] bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm md:grid-cols-[1.2fr_0.8fr] md:p-10">
                <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-sm">
                        <ShieldCheck size={16} /> Hệ thống đặt lịch bác sĩ đáng tin cậy
                    </div>
                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
                        Đặt lịch khám nhanh, rõ ràng và an tâm hơn mỗi ngày.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                        Tìm bác sĩ theo tên hoặc chuyên khoa, xem thông tin chi tiết, chọn khung giờ phù hợp, thanh toán và xác nhận lịch hẹn chỉ trong vài bước.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button 
                            onClick={scrollToDoctorList}
                            className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
                        > 
                            Đặt lịch ngay 
                        </button>
                        
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    if (window.confirm("Bạn có muốn đăng xuất khỏi hệ thống không?")) {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("user");
                                        window.location.reload(); 
                                    }
                                }}
                                className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-white px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                            >
                                {user?.name ? `Hi, ${user.name} (Đăng xuất)` : "Đăng xuất"}
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white px-6 py-3 font-semibold text-sky-700 transition hover:bg-sky-50"
                            >
                                Đăng nhập / Đăng ký
                            </button>
                        )}
                    </div>
                </div>
                <Card className="p-5">
                    <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-sky-100 p-3 text-sky-700"><MagnifyingGlassIcon size={20} /></div>
                        <div>
                            <div className="font-semibold text-slate-800">Tìm bác sĩ / chuyên khoa</div>
                            <div className="text-sm text-slate-500">Tìm kiếm nhanh chóng</div>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2 rounded-2xl border border-sky-100 bg-sky-50 p-2">
                        <MagnifyingGlassIcon className="mt-2 ml-2 text-sky-500" size={18} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Nhập tên bác sĩ hoặc chuyên khoa..."
                            className="w-full bg-transparent px-2 py-2 text-sm outline-none"
                        />
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-2xl bg-sky-50 p-4"><div className="font-semibold text-slate-800">+120</div><div className="text-slate-500">Bác sĩ chuyên khoa</div></div>
                        <div className="rounded-2xl bg-sky-50 p-4"><div className="font-semibold text-slate-800">24/7</div><div className="text-slate-500">Hỗ trợ đặt lịch</div></div>
                    </div>
                </Card>
            </section>

            <section className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-800">Chuyên khoa phổ biến</h2>
                    <span className="text-sm text-slate-500">Chọn nhanh để lọc bác sĩ</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {specialties.map((s) => (
                        // ĐÃ THAY <Card> BẰNG <div> ĐỂ CHẮC CHẮN NÚT BẤM HOẠT ĐỘNG
                        <div 
                            key={s.name} 
                            className={`rounded-[1.5rem] bg-white border p-5 transition hover:-translate-y-1 hover:shadow-md cursor-pointer ${query === s.name ? 'border-sky-500 shadow-sky-100 bg-sky-50' : 'border-slate-100 shadow-sm'}`}
                            onClick={() => {
                                if (query === s.name) {
                                    setQuery(""); // Bấm lại thì hủy lọc
                                } else {
                                    setQuery(s.name); // Bấm thì lọc
                                    scrollToDoctorList(); // Và cuộn xuống xem kết quả
                                }
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl">{s.icon}</div>
                                    <div className="mt-3 text-lg font-semibold text-slate-800">{s.name}</div>
                                </div>
                                <div className="rounded-2xl bg-sky-100 px-3 py-2 text-sm font-semibold text-sky-700">{s.count} bác sĩ</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="doctor-list" className="mt-8 pt-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-800">Bác sĩ nổi bật</h2>
                    <span className="text-sm text-slate-500">
                        {filteredDoctors.length > 0 ? `Tìm thấy ${filteredDoctors.length} bác sĩ` : "Không tìm thấy bác sĩ nào"}
                    </span>
                </div>
                
                {filteredDoctors.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-[2rem]">
                        Không có bác sĩ nào khớp với chuyên khoa này. Hãy thử chọn mục khác nhé!
                    </div>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-3">
                        {filteredDoctors.map((doctor) => (
                            <Card key={doctor._id || doctor.id} className="overflow-hidden">
                                {/* ẢNH ĐƯỢC BẢO VỆ TUYỆT ĐỐI */}
                                <img 
                                    src={doctor?.avatar || `https://ui-avatars.com/api/?name=${doctor?.name}&background=0D8ABC&color=fff&size=256`} 
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = `https://ui-avatars.com/api/?name=${doctor?.name}&background=0D8ABC&color=fff&size=256`;
                                    }}
                                    alt={doctor?.name} 
                                    className="h-52 w-full object-cover bg-slate-100" 
                                />
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-lg font-bold text-slate-800 cursor-pointer hover:text-sky-600" onClick={() => goToDetail(doctor)}>{doctor?.name}</div>
                                            <div className="text-sm text-slate-500">{doctor?.specialty}</div>
                                        </div>
                                        <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">
                                            <Star size={14} weight="fill" /> {doctor?.rating || 5}
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                                        <div className="flex items-center gap-2"><ClockUserIcon size={16} className="text-sky-500" /> {doctor?.experience || "Nhiều năm kinh nghiệm"}</div>
                                        <div className="flex items-center gap-2"><BandaidsIcon size={16} className="text-sky-500" /> {doctor?.degree || "Bác sĩ"}</div>
                                        <div className="flex items-center gap-2"><MapPin size={16} className="text-sky-500" /> {doctor?.location || "Phòng khám"}</div>
                                    </div>
                                    <div className="mt-5 flex items-center justify-between">
                                        <div className="text-lg font-bold text-sky-700">{doctor?.price ? formatMoney(doctor.price) : "Liên hệ"}</div>
                                        <div className="flex gap-2">
                                            <button onClick={() => goToDetail(doctor)} className="rounded-2xl border border-sky-600 px-3 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50">Chi tiết</button>
                                            <button onClick={() => goToBooking(doctor)} className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">Đặt lịch</button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}