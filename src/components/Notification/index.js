import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { isAuthenTicate, Signout } from '../../pages/Auth/index';
import { notifiCation } from '../../redux/actions/notification';
const Notification = (props) => {
  const { setIsLogin } = props;
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpent] = useState(false)
   const data = useSelector(state => state.notifiCation.notifiCation);
    console.log(data);
   const dispatch = useDispatch();
   useEffect(() => {
    dispatch(notifiCation(setNotifications));
       //eslint-disable-next-line
   },[])
   const handleRead = () => {
    setNotifications([]);
    setOpent(true);
  };

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
            <i className="la la-bell text-black" onClick={handleRead}/>
            {
              notifications.length > 0  && (<span className="noti-count text-black" >{notifications.length }</span> ) 
            }
          </Link>
          <div className="dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right">
            <div className="dropdown-header drop-reveal-header">
              {
                notifications.length > 0  ? (
                  <h6 className="title" >
                Bạn có <strong className="text-black">{notifications.length}</strong> thông báo 
              </h6>
                ):
                (
                  <h6 className="title">
                  Bạn không có thông báo nào
                </h6>
                )
              }
            </div>
            <div className="list-group drop-reveal-list">
              {open && 
                data.map((item,index) => {
                  return (
                    <Link to="#" className="list-group-item list-group-item-action" key={index}>
                    <div className="msg-body d-flex align-items-center" >
                      <div className="msg-content w-100">
                        <h3 className="title pb-1">{item.data ? item.data.name : item.name}</h3>
                        <p className="msg-text">{item.data.date}</p>
                      </div>
                    </div>
                    {/* end msg-body */}
                  </Link>
                    )
                })
              }

  

            </div>
            <Link to="#" className="dropdown-item drop-reveal-btn text-center">
              Xem tất cả
            </Link>
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
                  <img src={`http://localhost:8000/storage/${isAuthenTicate().avatar}`} alt="team-img" />
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
              {/* {
                isAuthenTicate().roles === 'Staff' ? (null) : (
                  <Link to={AppRoutes.feedback} className="list-group-item list-group-item-action">
                  <div className="msg-body">
                    <div className="msg-content">
                      <h3 className="title">
                        <i className="la la-shopping-cart mr-2" />
                        Feedback
                      </h3>
                    </div>
                  </div>
                </Link>
                )
              } */}
              {isAuthenTicate().roles === 'Staff' ? (
                <Link to={AppRoutes.staffDashboard.profile} className="list-group-item list-group-item-action">
                  <div className="msg-body">
                    <div className="msg-content">
                      <h3 className="title">
                        <i className="la la-shopping-cart mr-2" />
                        Staff
                      </h3>
                    </div>
                  </div>
                </Link>
              ) : null}

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
