export const AppRoutes = {

  page404: '/404',
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
  booking: '/booking',
  bookingResult: '/booking-result',
  contact: '/contact',
  feedback: '/feedback/:id',
  resetPassWordClient: '/reset-password/:token',
  service: {
    list: '/services',
    detail: '/services/:id',
  },
  comboService: {
    list: '/combos',
    detail: '/combos/:id',
  },
  gallery: {
    list: '/gallery',
    detail: '/gallery/:id',
  },
  news: {
    list: '/news',
    detail: '/news/:id',
  },
  accountClient: {
    bookingHistory: '/client/booking-history/:id',
    changePassword: '/client/change-password',
    changePasswordClient: '/client/change-password',
    review: '/client/review/:id',
    profile: '/client/profile',
    // resetPassWordClient: '/reset-password/:token'
  },

  staffDashboard: {
    changePassword: '/staff/change-password',
    listBooking: '/staff/list-booking/:id',
    profile: '/staff/profile',
  },
};

export const AppTitle = {
  page404: 'Error',
  home: 'Trang chủ',
  login: 'Đăng nhập',
  register: 'Đăng ký',
  booking: 'Đặt lịch',
  bookingResult: 'Kết quả đặt lịch',
  forgotPassword: 'Forgot password',
  changePassword: 'Change password',
  changePasswordClient: 'Change password',
  resetPasswordClient: 'Reset password',
  service: 'Dịch vụ',
  comboService: 'Combo Hot',
  contact: 'Liện hệ',
  gallery: 'Bộ sưu tập Nails',
  news: 'Bài viết',
  feedback: 'Đánh giá dịch vụ',
  accountClient: 'Tài khoản',
  staffDashboard: 'Nhân viên',
};
