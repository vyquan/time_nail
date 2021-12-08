import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { isAuthenTicate, Signout } from '../../pages/Auth/index';
const NotificationStaff = (props) => {
  const { setIsLogin } = props;
  const data = isAuthenTicate();
  const history = useHistory();

  const itemToForm = () => {
    if (typeof isAuthenTicate() === undefined) {
      return;
    }

    // The rest of the code
  };
  itemToForm();

  return (
    <div className="notification-wrap d-flex align-items-center">
      <div className="notification-item mr-2">
        <div className="dropdown">
          <Link
            to="#"
            className="dropdown-toggle drop-reveal-toggle-icon"
            id="notificationDropdownMenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="la la-bell text-black" />
            <span className="noti-count text-black">4</span>
          </Link>
          <div className="dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right">
            <div className="dropdown-header drop-reveal-header">
              <h6 className="title">
                Bạn có <strong className="text-black">4</strong> thông báo mới
              </h6>
            </div>
            <div className="list-group drop-reveal-list">
              <Link to="#" className="list-group-item list-group-item-action">
                <div className="msg-body d-flex align-items-center">
                  <div className="icon-element flex-shrink-0 mr-3 ml-0">
                    <i className="la la-bell" />
                  </div>
                  <div className="msg-content w-100">
                    <h3 className="title pb-1">Yêu cầu đặt lịch của bạn đã được gửi</h3>
                    <p className="msg-text">2 min ago</p>
                  </div>
                </div>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action">
                <div className="msg-body d-flex align-items-center">
                  <div className="icon-element bg-2 flex-shrink-0 mr-3 ml-0">
                    <i className="la la-check" />
                  </div>
                  <div className="msg-content w-100">
                    <h3 className="title pb-1">Xác nhận đặt lịch thành công</h3>
                    <p className="msg-text">1 day ago</p>
                  </div>
                </div>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action">
                <div className="msg-body d-flex align-items-center">
                  <div className="icon-element bg-3 flex-shrink-0 mr-3 ml-0">
                    <i className="la la-user" />
                  </div>
                  <div className="msg-content w-100">
                    <h3 className="title pb-1">Tài khoản đã được cập nhật</h3>
                    <p className="msg-text">2 hrs ago</p>
                  </div>
                </div>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action">
                <div className="msg-body d-flex align-items-center">
                  <div className="icon-element bg-4 flex-shrink-0 mr-3 ml-0">
                    <i className="la la-lock" />
                  </div>
                  <div className="msg-content w-100">
                    <h3 className="title pb-1">Mật khẩu đã được thay đổi</h3>
                    <p className="msg-text">Yesterday</p>
                  </div>
                </div>
              </Link>
            </div>
            <Link to="#" className="dropdown-item drop-reveal-btn text-center">
              Xem tất cả
            </Link>
          </div>
        </div>
      </div>
      <div className="notification-item">
        <div className="dropdown">
          <Link
            to="#"
            className="dropdown-toggle"
            id="userDropdownMenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="d-flex align-items-center">
              <div className="avatar avatar-sm flex-shrink-0 mr-2">
                <img src="../assets/images/team9.jpg" alt="team-img" />
              </div>
              <span className="font-size-14 text-black font-weight-bold">{isAuthenTicate().user.full_name}</span>
            </div>
          </Link>

          <div className="dropdown-menu dropdown-reveal dropdown-menu-md dropdown-menu-right" style={{}}>
            <div className="dropdown-item drop-reveal-header user-reveal-header">
              <h6 className="title text-uppercase">Welcome!</h6>
            </div>
            <div className="list-group drop-reveal-list user-drop-reveal-list">
              <Link to={AppRoutes.accountClient.profile} className="list-group-item list-group-item-action">
                <div className="msg-body">
                  <div className="msg-content">
                    <h3 className="title">
                      <i className="la la-user mr-2" />
                      Tài Khoản Của Tôi
                    </h3>
                  </div>
                </div>
              </Link>
              <Link to={AppRoutes.accountClient.profile} className="list-group-item list-group-item-action">
                <div className="msg-body">
                  <div className="msg-content">
                    <h3 className="title">
                      <i className="la la-shopping-cart mr-2" />
                      Lịch Đặt Của Tôi
                    </h3>
                  </div>
                </div>
              </Link>
              <div className="section-block" />
              <Link
                to="/"
                onClick={() =>
                  Signout(() => {
                    setIsLogin(false);
                    history.push('/');
                  })
                }
                className="list-group-item list-group-item-action"
              >
                <div className="msg-body">
                  <div className="msg-content">
                    <h3 className="title">
                      <i className="la la-power-off mr-2" />
                      Đăng Xuất
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationStaff;
