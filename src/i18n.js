import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "dayjs/locale/en";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Trang chủ": "Home",
        "Tin tức": "News",
        "Liên hệ": "Contact",
        "Cộng đồng": "Community",
        "Đăng nhập": "Login",
        "Ngôn ngữ": "Language",
        "Mới nhất": "Lastest",
        "Phổ biến": "Popular",
        Thích: "Like",
        "Bình luận": "Comments",
        thích: "like",
        "bình luận": "comments",
        "Phản hồi": "Reply",
        "Điện thoại": "Phone",
        "Gửi phản hồi": "Send Reply",
        "Tiêu đề": "Heading",
        "Họ và tên": "Full Name",
        "Số điện thoại": "Phone Number",
        "Địa chỉ": "Address",
        "Mã bảo mật": "Security code",
        "Nhập lại": "Reset",
        "Gửi đi": "Send",
        giờ: "hours",
        "Thông tin cá nhân": "General Information",
        "phút trước": "minutes ago",
        "giây trước": "seconds ago",
        "giờ trước": "hours ago",
      },
    },
    vi: {
      translation: {
        "Trang chủ": "Trang chủ",
        "Tin tức": "Tin tức",
        "Liên hệ": "Liên hệ",
        "Cộng đồng": "Cộng đồng",
        "Đăng nhập": "Đăng nhập",
        "Ngôn ngữ": "Ngôn ngữ",
        "Mới nhất": "Mới nhất",
        "Phổ biến": "Phổ biến",
        Thích: "Thích",
        "Bình luận": "Bình luận",
        "Phản hồi": "Phản hồi",
        "Điện thoại": "Điện thoại",
        "Gửi phản hồi": "Gửi phản hồi",
        "Tiêu đề": "Tiêu đề",
        "Họ và tên": "Họ và tên",
        "Số điện thoại": "Số điện thoại",
        "Địa chỉ": "Địa chỉ",
        "Mã bảo mật": "Mẫ bảo mật",
        "Nhập lại": "Nhập lại",
        "Gửi đi": "Gửi đi",
        giờ: "giờ",
        "Thông tin cá nhân": "Thông tin cá nhân",
        "phút trước": "phút trước",
        "giây trước": "giây",
        "giờ trước": "giờ",
      },
    },
    // Add more languages here...
  },
  lng: "vi", // Ngôn ngữ mặc định
  fallbackLng: "vi", // Ngôn ngữ dự phòng
  interpolation: {
    escapeValue: false, // Bỏ qua việc thoát các ký tự đặc biệt
  },
});
dayjs.locale("vi");

export default i18n;
