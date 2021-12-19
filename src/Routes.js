import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, BrowserRouter } from 'react-router-dom';
import RouteLayout from './components/PrivateRoute';
import { AppRoutes, AppTitle } from './helpers/app.routes';
import MainLayout from './layouts/MainLayout';
import ProfileLayout from './layouts/ProfileLayout';
import StaffLayout from './layouts/StaffLayout';
import Page from './pages';
const exact = true;
// const isPrivate = false;
// const isAuthRoute = true;

export const routes = [
  {
    path: AppRoutes.home,
    exact,
    title: AppTitle.home,
    component: Page.HomePage,
    layout: MainLayout,
  },
  {
    path: AppRoutes.login,
    exact,
    title: AppTitle.home,
    component: Page.LoginPage,
    layout: MainLayout,
    isAuthRoute: true,
  },
  {
    path: AppRoutes.register,
    exact,
    title: AppTitle.home,
    component: Page.RegisterPage,
    layout: MainLayout,
    isAuthRoute: true,
  },
  {
    path: AppRoutes.forgotPassword,
    exact,
    title: AppTitle.forgotPassword,
    component: Page.ForgotPassword,
    layout: MainLayout,
  },
  {
    path: AppRoutes.resetPassWordClient,
    exact,
    title: AppTitle.resetPasswordClient,
    component: Page.resetPassWordClient,
    layout: MainLayout,
  },
  {
    path: AppRoutes.booking,
    exact,
    title: AppTitle.home,
    component: Page.BookingPage,
    layout: MainLayout,
  },
  {
    path: AppRoutes.bookingResult,
    exact,
    title: AppTitle.bookingResult,
    component: Page.BookingResult,
    layout: MainLayout,
    isPrivate: true,
  },
  {
    path: AppRoutes.service.list,
    exact,
    title: AppTitle.service,
    component: Page.ServicePage,
    layout: MainLayout,
  },
  {
    path: AppRoutes.service.detail,
    exact,
    title: AppTitle.service,
    component: Page.ServiceDetail,
    layout: MainLayout,
  },
  {
    path: AppRoutes.comboService.list,
    exact,
    title: AppTitle.comboService,
    component: Page.ComboServicePage,
    layout: MainLayout,
  },
  {
    path: AppRoutes.comboService.detail,
    exact,
    title: AppTitle.comboService,
    component: Page.ComboServiceDetail,
    layout: MainLayout,
  },
  {
    path: AppRoutes.news.list,
    exact,
    title: AppTitle.news,
    component: Page.NewsPage,
    layout: MainLayout,
  },
  {
    path: AppRoutes.news.detail,
    exact,
    title: AppTitle.news,
    component: Page.NewsDetail,
    layout: MainLayout,
  },
  {
    path: AppRoutes.gallery.list,
    exact,
    title: AppTitle.gallery,
    component: Page.GalleryPage,
    layout: MainLayout,
  },
  {
    path: AppRoutes.gallery.detail,
    exact,
    title: AppTitle.gallery,
    component: Page.GalleryDetail,
    layout: MainLayout,
  },
  {
    path: AppRoutes.feedback,
    exact,
    title: AppTitle.feedback,
    component: Page.Feedback,
    layout: MainLayout,
    isPrivate: true,
  },
  {
    path: AppRoutes.contact,
    exact,
    title: AppTitle.contact,
    component: Page.ContactPage,
    layout: MainLayout,
  },
  {
    path: AppRoutes.accountClient.profile,
    exact,
    title: AppTitle.accountClient,
    component: Page.ProfileMember,
    layout: ProfileLayout,
    isPrivate: true,
  },
  {
    path: AppRoutes.accountClient.bookingHistory,
    exact,
    title: AppTitle.accountClient,
    component: Page.BookingHistoryMember,
    layout: ProfileLayout,
    isPrivate: true,
  },
  {
    path: AppRoutes.accountClient.review,
    exact,
    title: AppTitle.accountClient,
    component: Page.Review,
    layout: ProfileLayout,
    isPrivate: true,
  },
  {
    path: AppRoutes.accountClient.changePassword,
    exact,
    title: AppTitle.accountClient,
    component: Page.ChangePasswordClient,
    layout: ProfileLayout,
    isPrivate: true,
  },
  {
    path: AppRoutes.staffDashboard.profile,
    exact,
    title: AppTitle.staffDashboard,
    component: Page.ProfileStaff,
    layout: StaffLayout,
    isPrivate: true,
  },
  {
    path: AppRoutes.staffDashboard.changePassword,
    exact,
    title: AppTitle.staffDashboard,
    component: Page.ChangePasswordStaff,
    layout: StaffLayout,
    isPrivate: true,
  },
  {
    path: AppRoutes.staffDashboard.listBooking,
    exact,
    title: AppTitle.staffDashboard,
    component: Page.ListBookingStaff,
    layout: StaffLayout,
    isPrivate: true,
  },
  { path: '*', isPrivate: false, component: Page[404] },
];

export const RootRouter = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <RouteLayout key={route.path?.toString()} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};
