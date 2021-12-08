export const AppRoutes = {
  page404: '/404',
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
  booking: '/booking',
  contact: '/contact',
  feedback: '/feedback',
  resetPassWordClient: '/reset-password/:token',
  service: {
    list: '/services',
    detail: '/services/:id',
  },
  comboService: {
    list: '/combos',
    detail: '/combo/:id',
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
    changePasswordClient: '/client/changePasswordClient',
    review: '/client/review',
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
  forgotPassword: 'Forgot password',
  changePassword: 'Change password',
  changePasswordClient: 'Change Password Client',
  resetPasswordClient: 'Reset Password Client',
  service: 'Dịch vụ',
  comboService: 'Combo Hot',
  contact: 'Liện hệ',
  gallery: 'Bộ sưu tập Nails',
  news: 'Tin tức',
  feedback: 'Đánh giá dịch vụ',
  accountClient: 'Tài khoản',
  staffDashboard: 'Staff',
};
