import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { isAuthenTicate } from '../../pages/Auth';
const SidebarStaff = () => {
  const data = isAuthenTicate();

  return (
    <div className="sidebar-nav">
      <div className="sidebar-nav-body">
        <div className="side-menu-close">
          <i className="la la-times" />
        </div>
        {/* end menu-toggler */}
        <div className="author-content">
          <div className="d-flex align-items-center">
            <div className="author-img avatar-sm">
              <img src={data.user.avatar} alt="true" />
            </div>
            <div className="author-bio">
              <h4 className="author__title">{ data.user.full_name}</h4>
              <span className="author__meta">Nhân viên</span>
            </div>
          </div>
        </div>
        <div className="sidebar-menu-wrap">
          <ul className="sidebar-menu list-items">
            <li>
              <NavLink activeClassName="active-staff" to={`/staff/list-booking/${data.user ? data.user.id : data.id}`}>
                <i className="la la-list mr-2 text-color-2" />
                Lịch đặt
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-staff" to={AppRoutes.staffDashboard.profile}>
                <i className="la la-user mr-2 text-color-2" />
                Tài khoản
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-staff" to={AppRoutes.staffDashboard.changePassword}>
                <i className="la la-lock mr-2 text-color-5" />
                Đổi mật khẩu
              </NavLink>
            </li>
          </ul>
        </div>
        {/* end sidebar-menu-wrap */}
      </div>
    </div>
  );
};

export default SidebarStaff;
