import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { isAuthenTicate, Signout } from '../../pages/Auth/index';
const Staff = (props) => {
  const { setIsLogin } = props;
  const history = useHistory();

  return (
    <div className="notification-wrap d-flex align-items-center">
     
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
                <img src={isAuthenTicate().user.avatar} alt="team-img" />
              </div>
              <span className="font-size-14 text-black font-weight-bold">{isAuthenTicate().user.full_name}</span>
            </div>
          </Link>
          <div className="dropdown-menu dropdown-reveal dropdown-menu-md dropdown-menu-right" style={{}}>
            <div className="dropdown-item drop-reveal-header user-reveal-header">
              <h6 className="title text-uppercase">Welcome!</h6>
            </div>

            <div className="list-group drop-reveal-list user-drop-reveal-list">
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

export default Staff;
