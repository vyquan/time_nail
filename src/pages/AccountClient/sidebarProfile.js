import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { isAuthenTicate } from '../Auth';
const SidebarProfile = () => {
  const data = isAuthenTicate();

  return (
    <div className="col-lg-3">
      <div className="sidebar-nav-body">
        <div className="author-content">
          <div className="d-flex align-items-center">
            <div className="author-img avatar-sm">
              {data.user ? (
                <img src={data.user.avatar} alt="true" />
              ) : (
                <img src={data.avatar.includes(`https`) ? data.avatar : 'http://localhost:8000/storage/'+data.avatar } alt="true" />
              )}
            </div>
            <div className="author-bio">
              <h4 className="author__title">{data.user ? data.user.full_name : data.full_name}</h4>
              <span className="author__meta">Sửa hồ sơ</span>
            </div>
          </div>
        </div>
        <div className="sidebar-menu-wrap">
          <ul className="sidebar-menu toggle-menu list-items">
            <li className="page-active">
              {isAuthenTicate().roles === 'Admin' ? null : (
                <NavLink activeClassName="active-sidebar" to={AppRoutes.accountClient.profile}>
                  <i className="la la-user mr-2 text-color-2" />
                  Tài Khoản Của Tôi
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                activeClassName="active-sidebar"
                to={`/client/booking-history/${data.user ? data.user.id : data.id}`}
              >
                <i className="la la-history mr-2" />
                Lịch đặt của tôi
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-sidebar" to={`/client/review/${data.user ? data.user.id : data.id}`}>
                <i className="la la-star mr-2 text-color-5" />
                Đánh giá dịch vụ
              </NavLink>
            </li>
            <li>
              {data.google_id || data.googleId || isAuthenTicate().roles === 'Staff' ? null : (
                <NavLink activeClassName="active-sidebar" to={AppRoutes.accountClient.changePasswordClient}>
                  <i className="la la-lock mr-2 text-color-6" />
                  Đổi Mật Khẩu
                </NavLink>
              )}
            </li>
          </ul>
        </div>
        {/* end sidebar-menu-wrap */}
      </div>
    </div>
  );
};

export default SidebarProfile;
