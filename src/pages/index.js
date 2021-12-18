import React, { Suspense } from 'react';
import { lazy } from 'react';
import ProgressLoading from '../components/ProgressLoading';
const LazyLayout = (importCompnent) => {
  const Component = lazy(importCompnent);

  return (
    <Suspense fallback={<ProgressLoading />}>
      <Component />
    </Suspense>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  404: lazy(() => import('./Error')),
  HomePage: () => LazyLayout(() => import('./HomePage')),
  LoginPage: () => LazyLayout(() => import('./Auth/login')),
  RegisterPage: () => LazyLayout(() => import('./Auth/register')),
  ForgotPassword: () => LazyLayout(() => import('./Auth/forgotPassword')),
  BookingPage: () => LazyLayout(() => import('./BookingPage')),
  BookingResult: () => LazyLayout(() => import('./BookingPage/booking-result')),
  Feedback: () => LazyLayout(() => import('./FeedbackPage')),
  ContactPage: () => LazyLayout(() => import('./ContactPage')),
  resetPassWordClient: () => LazyLayout(() => import('./Auth/ResetPassWord')),
  ServicePage: () => LazyLayout(() => import('./ServicePage')),
  ServiceDetail: () => LazyLayout(() => import('./ServicePage/detail')),
  ComboServicePage: () => LazyLayout(() => import('./ComboServicePage')),
  ComboServiceDetail: () => LazyLayout(() => import('./ComboServicePage/detail')),
  NewsPage: () => LazyLayout(() => import('./NewsPage')),
  NewsDetail: () => LazyLayout(() => import('./NewsPage/detail')),
  GalleryPage: () => LazyLayout(() => import('./GalleryPage')),
  GalleryDetail: () => LazyLayout(() => import('./GalleryPage/detail')),
  ProfileMember: () => LazyLayout(() => import('./AccountClient/profileSetting')),
  BookingHistoryMember: () => LazyLayout(() => import('./AccountClient/bookingHistory')),
  Review: () => LazyLayout(() => import('./AccountClient/review')),
  ChangePassword: () => LazyLayout(() => import('../components/changePassword')),
  ChangePasswordClient: () => LazyLayout(() => import('./AccountClient/changePaswordClient')),
  ProfileStaff: () => LazyLayout(() => import('./StaffDashboard/profile')),
  ChangePasswordStaff: () => LazyLayout(() => import('../components/changePassword')),
  ListBookingStaff: () => LazyLayout(() => import('./StaffDashboard/listBooking')),
};
