import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { isAuthenTicate, Signout } from '../../pages/Auth/index';
import { notifiCation, notifiCateOne, notifiCateAll } from '../../redux/actions/notification';
const Notification = (props) => {
  const { setIsLogin } = props;
  const history = useHistory();
  const data = useSelector((state) => state.notifiCation.notifiCation);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notifiCation());
    //eslint-disable-next-line
  }, []);

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
            {data.length > 0 && <span className="noti-count text-black">{data.length}</span>}
          </Link>
          <div className="dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right">
            <div className="dropdown-header drop-reveal-header">
              {data.length > 0 ? (
                <h6 className="title">
                  Bạn có <strong className="text-black">{data.length}</strong> thông báo
                </h6>
              ) : (
                <h6 className="title">Bạn không có thông báo nào</h6>
              )}
            </div>
            <div className="list-group drop-reveal-list">
              {data &&
                data.map((item, index) => {
                  return (
                    <Link
                      to={`/client/booking-history/${
                        isAuthenTicate().user ? isAuthenTicate().user.id : isAuthenTicate().id
                      }`}
                      className="list-group-item list-group-item-action"
                      key={index}
                    >
                      <div
                        className="msg-body d-flex align-items-center"
                        onClick={() => dispatch(notifiCateOne(item.id))}
                      >
                        <div className="msg-content w-100">
                          <h3 className="title pb-1">{item.data.title}</h3>
                          <p className="msg-text">{item.data.message}</p>
                        </div>
                      </div>
                      {/* end msg-body */}
                    </Link>
                  );
                })}
            </div>
            <div
              className="dropdown-item drop-reveal-btn text-center"
              onClick={() => dispatch(notifiCateAll())}
              style={{ cursor: 'pointer' }}
            >
              Đánh dấu là đã đọc
            </div>
          </div>
          {/* end dropdown-menu */}
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
                {isAuthenTicate().user ? (
                  <img src={isAuthenTicate().user.avatar} alt="team-img" />
                ) : (
                  <img src={isAuthenTicate().avatar.includes(`https`) ? isAuthenTicate().avatar : 'http://localhost:8000/storage/'+isAuthenTicate().avatar  } alt="true" />
                )}
              </div>
              <span className="font-size-14 text-black font-weight-bold">
                {isAuthenTicate().user ? isAuthenTicate().user.full_name : isAuthenTicate().full_name}
              </span>
            </div>
          </Link>
          <div className="dropdown-menu dropdown-reveal dropdown-menu-md dropdown-menu-right" style={{}}>
            <div className="dropdown-item drop-reveal-header user-reveal-header">
              <h6 className="title text-uppercase">Welcome!</h6>
            </div>

            <div className="list-group drop-reveal-list user-drop-reveal-list">
              {isAuthenTicate().roles === 'Staff' ? null : (
                <Link to={AppRoutes.accountClient.profile} className="list-group-item list-group-item-action">
                  <div className="msg-body">
                    <div className="msg-content">
                      <h3 className="title">
                        <i className="la la-user mr-2" />
                        Tài Khoản Của Tôi
                      </h3>
                    </div>
                  </div>
                  {/* end msg-body */}
                </Link>
              )}

              {isAuthenTicate().roles === 'Staff' ? null : null}
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
                {/* end msg-body */}
              </Link>
            </div>
          </div>
          {/* end dropdown-menu */}
        </div>
      </div>
    </div>
  );
};

export default Notification;
