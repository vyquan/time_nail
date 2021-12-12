import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import RouteLayout from './components/PrivateRoute';
import { AppRoutes, AppTitle } from './helpers/app.routes';
import MainLayout from './layouts/MainLayout';
import ProfileLayout from './layouts/ProfileLayout';
import StaffLayout from './layouts/StaffLayout';

const NotFoundPage = React.lazy(() => import('./pages/Error'));
const Login = React.lazy(() => import('./pages/Auth/login'));
const Register = React.lazy(() => import('./pages/Auth/register'));
const ForgotPassword = React.lazy(() => import('./pages/Auth/forgotPassword'));
const Home = React.lazy(() => import('./pages/HomePage'));
const Booking = React.lazy(() => import('./pages/BookingPage'));
const BookingResult = React.lazy(() => import('./pages/BookingPage/booking-result'));
const Feedback = React.lazy(() => import('./pages/FeedbackPage'));
const Contact = React.lazy(() => import('./pages/ContactPage'));
const resetPassWordClient = React.lazy(() => import('./pages/Auth/ResetPassWord'));
const Service = {
  list: React.lazy(() => import('./pages/ServicePage')),
  detail: React.lazy(() => import('./pages/ServicePage/detail')),
};

const ComboService = {
  list: React.lazy(() => import('./pages/ComboServicePage')),
  detail: React.lazy(() => import('./pages/ComboServicePage/detail')),
};

const News = {
  list: React.lazy(() => import('./pages/NewsPage')),
  detail: React.lazy(() => import('./pages/NewsPage/detail')),
};

const Gallery = {
  list: React.lazy(() => import('./pages/GalleryPage')),
  detail: React.lazy(() => import('./pages/GalleryPage/detail')),
};

const AccountClient = {
  profile: React.lazy(() => import('./pages/AccountClient/profileSetting')),
  bookingHistory: React.lazy(() => import('./pages/AccountClient/bookingHistory')),
  review: React.lazy(() => import('./pages/AccountClient/review')),
  changePassword: React.lazy(() => import('./components/changePassword')),
  changePasswordClient: React.lazy(() => import('./pages/AccountClient/changePaswordClient')),
};

const StaffDashboard = {
  profile: React.lazy(() => import('./pages/StaffDashboard/profile')),
  changePassword: React.lazy(() => import('./components/changePassword')),
  listBooking: React.lazy(() => import('./pages/StaffDashboard/listBooking')),
};

export const RootRouter = React.memo(() => {
  return (
    <BrowserRouter>
      <Switch>
        <RouteLayout exact path="/" component={Home} title={AppTitle.home} layout={MainLayout} />
        <RouteLayout exact path={AppRoutes.home} component={Home} title={AppTitle.home} layout={MainLayout} />
        <RouteLayout exact path={AppRoutes.login} component={Login} title={AppTitle.login} layout={MainLayout} isAuthRoute={true}/>
        <RouteLayout
          exact
          path={AppRoutes.register}
          component={Register}
          title={AppTitle.register}
          layout={MainLayout}
          />
        <RouteLayout
          exact
          path={AppRoutes.forgotPassword}
          component={ForgotPassword}
          title={AppTitle.forgotPassword}
          layout={MainLayout}
          />
        <RouteLayout exact path={AppRoutes.booking} component={Booking} title={AppTitle.booking} layout={MainLayout} />
        <RouteLayout exact path={AppRoutes.bookingResult} component={BookingResult} title={AppTitle.bookingResult} layout={MainLayout} />
        <RouteLayout
          exact
          path={AppRoutes.service.list}
          component={Service.list}
          title={AppTitle.service}
          layout={MainLayout}
          />
        <RouteLayout
          exact
          path={AppRoutes.service.detail}
          component={Service.detail}
          title={AppTitle.service}
          layout={MainLayout}
          />
        <RouteLayout
          exact
          path={AppRoutes.comboService.list}
          component={ComboService.list}
          title={AppTitle.comboService}
          layout={MainLayout}
          />
        <RouteLayout
          exact
          path={AppRoutes.comboService.detail}
          component={ComboService.detail}
          title={AppTitle.comboService}
          layout={MainLayout}
          />
        <RouteLayout exact path={AppRoutes.news.list} component={News.list} title={AppTitle.news} layout={MainLayout} />
        <RouteLayout
          exact
          path={AppRoutes.news.detail}
          component={News.detail}
          title={AppTitle.news}
          layout={MainLayout}
          />
        <RouteLayout
          exact
          path={AppRoutes.gallery.list}
          component={Gallery.list}
          title={AppTitle.gallery}
          layout={MainLayout}
          />
        <RouteLayout
          exact
          path={AppRoutes.gallery.detail}
          component={Gallery.detail}
          title={AppTitle.gallery}
          layout={MainLayout}
          />
        <RouteLayout
          exact
          path={AppRoutes.feedback}
          component={Feedback}
          title={AppTitle.feedback}
          layout={MainLayout}
          />
        <RouteLayout exact path={AppRoutes.contact} component={Contact} title={AppTitle.contact} layout={MainLayout} />
        <RouteLayout
          exact
          path={AppRoutes.resetPassWordClient}
          component={resetPassWordClient}
          title={AppTitle.resetPasswordClient}
          layout={MainLayout}
          />
        {/* <RouteLayout path={AppRoutes.page404} component={NotFoundPage} title={AppTitle.page404} />
        <Redirect path="*" to={AppRoutes.page404} /> */}
        {/* Profile Member */}
        <RouteLayout exact path="/client" >
          <Redirect to={AppRoutes.accountClient.profile} layout={ProfileLayout} isPrivate={true}/>
        </RouteLayout>
        <RouteLayout
          path={AppRoutes.accountClient.profile}
          component={AccountClient.profile}
          title={AppTitle.accountClient}
          layout={ProfileLayout}
          isPrivate={true}
        />
        <RouteLayout
          path={AppRoutes.accountClient.bookingHistory}
          component={AccountClient.bookingHistory}
          title={AppTitle.accountClient}
          layout={ProfileLayout}
          isPrivate={true}
        />
        <RouteLayout
          path={AppRoutes.accountClient.review}
          component={AccountClient.review}
          title={AppTitle.accountClient}
          layout={ProfileLayout}
          isPrivate={true}
        />
        <RouteLayout
          path={AppRoutes.accountClient.changePassword}
          component={AccountClient.changePassword}
          title={AppTitle.accountClient}
          layout={ProfileLayout}
          isPrivate={true}
        />
        <RouteLayout
          path={AppRoutes.accountClient.changePasswordClient}
          component={AccountClient.changePasswordClient}
          title={AppTitle.accountClient}
          layout={ProfileLayout}
          isPrivate={true}
        />
        {/* <RouteLayout path={AppRoutes.page404} component={NotFoundPage} title={AppTitle.page404} />
        <Redirect path="/client/*" to={AppRoutes.page404} /> */}
        
        {/* Staff */}
        <RouteLayout exact path="/staff" layout={StaffLayout} isAuthRoute={true}>
          <Redirect to={AppRoutes.staffDashboard.listBooking} />
        </RouteLayout>
        <RouteLayout
          exact
          path={AppRoutes.staffDashboard.listBooking}
          component={StaffDashboard.listBooking}
          title={AppTitle.listBooking}
          layout={StaffLayout}
          isPrivate={true}
        />
        <RouteLayout
          exact
          path={AppRoutes.staffDashboard.profile}
          component={StaffDashboard.profile}
          title={AppTitle.staffDashboard}
          layout={StaffLayout}
          isPrivate={true}
        />
        <RouteLayout
          exact
          path={AppRoutes.staffDashboard.changePassword}
          component={StaffDashboard.changePassword}
          title={AppTitle.staffDashboard}
          layout={StaffLayout}
          isPrivate={true}
        />
        <RouteLayout
          exact
          path={AppRoutes.staffDashboard.setting}
          component={StaffDashboard.setting}
          title={AppTitle.staffDashboard}
          layout={StaffLayout}
          isPrivate={true}
        />
        <RouteLayout path={AppRoutes.page404} component={NotFoundPage} title={AppTitle.page404} />
        <Redirect path="/staff/*" to={AppRoutes.page404} />
      </Switch>
    </BrowserRouter>
  );
});
