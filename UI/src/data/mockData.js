import { Video, Building2 } from "lucide-react";
import React from "react";

export const specialties = [
  { name: "Tim mạch", icon: "✨", count: 24 },
  { name: "Da liễu", icon: "✨", count: 18 },
  { name: "Nhi khoa", icon: "✨", count: 30 },
  { name: "Tai Mũi Họng", icon: "✨", count: 16 },
  { name: "Nội tổng quát", icon: "✨", count: 42 },
  { name: "Sản phụ khoa", icon: "✨", count: 21 },
];

export const doctors = [
  {
    id: 1,
    name: "BS. Nguyễn Minh Anh",
    specialty: "Tim mạch",
    experience: "12 năm kinh nghiệm",
    degree: "ThS. Y khoa, Chuyên khoa I Tim mạch",
    rating: 4.9,
    reviews: 128,
    fee: 450000,
    hospital: "Bệnh viện An Tâm",
    location: "Quận 1, TP.HCM",
    bio: "Chuyên khám và theo dõi bệnh tim mạch, tăng huyết áp, rối loạn mỡ máu.",
    schedule: ["Thứ 2: 08:00 - 12:00", "Thứ 4: 13:00 - 17:00", "Thứ 6: 08:00 - 12:00"],
    tags: ["Khám online", "Khám offline"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "BS. Trần Thu Hà",
    specialty: "Da liễu",
    experience: "9 năm kinh nghiệm",
    degree: "Bác sĩ Chuyên khoa I Da liễu",
    rating: 4.8,
    reviews: 96,
    fee: 380000,
    hospital: "Phòng khám Sáng Da",
    location: "Bình Thạnh, TP.HCM",
    bio: "Điều trị mụn, viêm da cơ địa, dị ứng da và chăm sóc da chuyên sâu.",
    schedule: ["Thứ 3: 09:00 - 12:00", "Thứ 5: 13:00 - 17:00", "Thứ 7: 08:00 - 12:00"],
    tags: ["Khám online", "Khám offline"],
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    name: "BS. Lê Quốc Huy",
    specialty: "Nhi khoa",
    experience: "15 năm kinh nghiệm",
    degree: "ThS. Nhi khoa",
    rating: 5.0,
    reviews: 201,
    fee: 500000,
    hospital: "Nhi Đồng An Bình",
    location: "TP. Thủ Đức",
    bio: "Khám, tư vấn dinh dưỡng và theo dõi phát triển cho trẻ em.",
    schedule: ["Thứ 2: 13:00 - 17:00", "Thứ 4: 08:00 - 12:00", "Chủ nhật: 08:00 - 12:00"],
    tags: ["Khám online", "Khám offline"],
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
  }, {
    id: 2,
    name: "BS. Trần Quốc Bảo",
    specialty: "Da liễu",
    experience: "8 năm kinh nghiệm",
    degree: "BS. Chuyên khoa Da liễu",
    rating: 4.8,
    reviews: 94,
    price: 350000,
    hospital: "Phòng khám Hồng Đức",
    location: "Quận 3, TP.HCM",
    bio: "Chuyên điều trị mụn, viêm da cơ địa và các bệnh lý về da.",
    schedule: [
      {
        day: "Monday",
        timeSlots: [
          { start: "08:00", end: "09:00" },
          { start: "09:00", end: "10:00" },
          { start: "10:00", end: "11:00" }
        ]
      },
      {
        day: "Thursday",
        timeSlots: [
          { start: "14:00", end: "15:00" },
          { start: "15:00", end: "16:00" }
        ]
      }
    ],
    tags: ["Khám online", "Khám offline"],
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 3,
    name: "BS. Lê Thị Thanh",
    specialty: "Nhi khoa",
    experience: "15 năm kinh nghiệm",
    degree: "ThS. Nhi khoa",
    rating: 4.9,
    reviews: 210,
    price: 400000,
    hospital: "Bệnh viện Nhi Đồng",
    location: "Quận 5, TP.HCM",
    bio: "Theo dõi và điều trị các bệnh lý trẻ em từ sơ sinh đến thiếu niên.",
    schedule: [
      {
        day: "Tuesday",
        timeSlots: [
          { start: "08:00", end: "09:00" },
          { start: "09:00", end: "10:00" },
          { start: "10:00", end: "11:00" }
        ]
      },
      {
        day: "Friday",
        timeSlots: [
          { start: "13:00", end: "14:00" },
          { start: "14:00", end: "15:00" }
        ]
      }
    ],
    tags: ["Khám offline"],
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 4,
    name: "BS. Phạm Hữu Đạt",
    specialty: "Tai Mũi Họng",
    experience: "10 năm kinh nghiệm",
    degree: "BS. CKI Tai Mũi Họng",
    rating: 4.7,
    reviews: 88,
    price: 320000,
    hospital: "Phòng khám Thành Công",
    location: "Bình Thạnh, TP.HCM",
    bio: "Điều trị viêm xoang, viêm họng và các bệnh lý tai mũi họng.",
    schedule: [
      {
        day: "Wednesday",
        timeSlots: [
          { start: "08:00", end: "09:00" },
          { start: "09:00", end: "10:00" }
        ]
      },
      {
        day: "Saturday",
        timeSlots: [
          { start: "15:00", end: "16:00" },
          { start: "16:00", end: "17:00" }
        ]
      }
    ],
    tags: ["Khám online"],
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 5,
    name: "BS. Võ Minh Tâm",
    specialty: "Nội tổng quát",
    experience: "9 năm kinh nghiệm",
    degree: "BS. Nội khoa",
    rating: 4.6,
    reviews: 73,
    price: 300000,
    hospital: "Bệnh viện Gia Phúc",
    location: "Quận 7, TP.HCM",
    bio: "Khám tổng quát và điều trị các bệnh lý nội khoa phổ biến.",
    schedule: [
      {
        day: "Monday",
        timeSlots: [
          { start: "13:00", end: "14:00" },
          { start: "14:00", end: "15:00" }
        ]
      },
      {
        day: "Friday",
        timeSlots: [
          { start: "08:00", end: "09:00" },
          { start: "09:00", end: "10:00" }
        ]
      }
    ],
    tags: ["Khám online", "Khám offline"],
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 6,
    name: "BS. Đặng Thị Hương",
    specialty: "Sản phụ khoa",
    experience: "14 năm kinh nghiệm",
    degree: "ThS. Sản phụ khoa",
    rating: 4.9,
    reviews: 176,
    price: 500000,
    hospital: "Bệnh viện Phụ sản Ánh Dương",
    location: "Quận 10, TP.HCM",
    bio: "Tư vấn thai kỳ, khám phụ khoa và theo dõi sức khỏe sinh sản.",
    schedule: [
      {
        day: "Tuesday",
        timeSlots: [
          { start: "08:00", end: "09:00" },
          { start: "09:00", end: "10:00" }
        ]
      },
      {
        day: "Thursday",
        timeSlots: [
          { start: "13:00", end: "14:00" },
          { start: "14:00", end: "15:00" }
        ]
      }
    ],
    tags: ["Khám offline"],
    avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 7,
    name: "BS. Nguyễn Hoàng Nam",
    specialty: "Tim mạch",
    experience: "11 năm kinh nghiệm",
    degree: "BS. CKII Tim mạch",
    rating: 4.8,
    reviews: 132,
    price: 470000,
    hospital: "Bệnh viện Quốc Tế Việt",
    location: "Quận 2, TP.HCM",
    bio: "Chuyên điều trị tăng huyết áp và bệnh lý tim mạch mãn tính.",
    schedule: [
      {
        day: "Monday",
        timeSlots: [
          { start: "08:00", end: "09:00" },
          { start: "10:00", end: "11:00" }
        ]
      },
      {
        day: "Wednesday",
        timeSlots: [
          { start: "14:00", end: "15:00" },
          { start: "15:00", end: "16:00" }
        ]
      }
    ],
    tags: ["Khám online", "Khám offline"],
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 8,
    name: "BS. Hồ Gia Linh",
    specialty: "Da liễu",
    experience: "6 năm kinh nghiệm",
    degree: "BS. Da liễu",
    rating: 4.5,
    reviews: 58,
    price: 280000,
    hospital: "Phòng khám An Khang",
    location: "Gò Vấp, TP.HCM",
    bio: "Điều trị mụn, nám, sẹo và chăm sóc da chuyên sâu.",
    schedule: [
      {
        day: "Wednesday",
        timeSlots: [
          { start: "08:00", end: "09:00" },
          { start: "09:00", end: "10:00" }
        ]
      },
      {
        day: "Saturday",
        timeSlots: [
          { start: "13:00", end: "14:00" }
        ]
      }
    ],
    tags: ["Khám online"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 9,
    name: "BS. Trịnh Đức Long",
    specialty: "Nội tổng quát",
    experience: "13 năm kinh nghiệm",
    degree: "ThS. Nội tổng quát",
    rating: 4.8,
    reviews: 145,
    price: 360000,
    hospital: "Bệnh viện Đại Việt",
    location: "Tân Bình, TP.HCM",
    bio: "Khám và quản lý bệnh lý nội khoa lâu dài.",
    schedule: [
      {
        day: "Tuesday",
        timeSlots: [
          { start: "13:00", end: "14:00" },
          { start: "14:00", end: "15:00" }
        ]
      },
      {
        day: "Friday",
        timeSlots: [
          { start: "09:00", end: "10:00" }
        ]
      }
    ],
    tags: ["Khám offline"],
    avatar: "https://images.unsplash.com/photo-1612531385446-f7b6b8f0b9b0?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 10,
    name: "BS. Mai Thu Hà",
    specialty: "Sản phụ khoa",
    experience: "16 năm kinh nghiệm",
    degree: "BS. CKII Sản phụ khoa",
    rating: 5.0,
    reviews: 240,
    price: 550000,
    hospital: "Bệnh viện Phụ sản Quốc tế",
    location: "Quận 1, TP.HCM",
    bio: "Theo dõi thai kỳ và điều trị các bệnh lý phụ khoa chuyên sâu.",
    schedule: [
      {
        day: "Monday",
        timeSlots: [
          { start: "08:00", end: "09:00" },
          { start: "09:00", end: "10:00" }
        ]
      },
      {
        day: "Thursday",
        timeSlots: [
          { start: "15:00", end: "16:00" },
          { start: "16:00", end: "17:00" }
        ]
      }
    ],
    tags: ["Khám online", "Khám offline"],
    avatar: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 11,
    name: "BS. Bùi Thành Công",
    specialty: "Tai Mũi Họng",
    experience: "7 năm kinh nghiệm",
    degree: "BS. Tai Mũi Họng",
    rating: 4.6,
    reviews: 66,
    price: 310000,
    hospital: "Phòng khám Sài Gòn Care",
    location: "Phú Nhuận, TP.HCM",
    bio: "Khám và điều trị các bệnh lý hô hấp, viêm xoang.",
    schedule: [
      {
        day: "Wednesday",
        timeSlots: [
          { start: "13:00", end: "14:00" },
          { start: "14:00", end: "15:00" }
        ]
      },
      {
        day: "Saturday",
        timeSlots: [
          { start: "08:00", end: "09:00" }
        ]
      }
    ],
    tags: ["Khám offline"],
    avatar: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=80",
  }
];

export const timeSlots = ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00", "16:00"];

export const paymentMethods = ["Ví điện tử", "Thẻ ngân hàng", "Chuyển khoản", "Thanh toán tại quầy"];

export const bookingModes = [
  { key: "online", label: "Online", icon: <Video size={16} /> },
  { key: "offline", label: "Offline", icon: <Building2 size={16} /> },
];

export const initialAppointments = [
  {
    id: "BK-20260420-01",
    doctorId: 1,
    doctorName: "BS. Nguyễn Minh Anh",
    date: "2026-04-24",
    time: "09:00",
    mode: "online",
    status: "Đã xác nhận",
  },
];

export const initialHistory = [
  {
    date: "2026-03-12",
    doctorName: "BS. Trần Thu Hà",
    reason: "Khám da liễu",
    note: "Được kê đơn và hẹn tái khám sau 2 tuần.",
  },
];
