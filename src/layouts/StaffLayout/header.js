import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Staff from '../../components/Notification/staff';
import { isAuthenTicate } from '../../pages/Auth';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    isAuthenTicate() && setIsLogin(true);
  }, [pathname, isLogin]);

  return (
    <div className="dashboard-nav">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="menu-wrapper">
              <div className="logo mr-5">
                <a href="index.html">
                  <img src="/assets/images/logo2.png" alt="logo" />
                </a>
                <div className="menu-toggler">
                  <i className="la la-bars" />
                  <i className="la la-times" />
                </div>
                <div className="user-menu-open">
                  <i className="la la-user" />
                </div>
              </div>
              <div className="nav-btn ml-auto">
                {/* <Notification setIsLogin = {setIsLogin}/> */}
                <Staff setIsLogin={setIsLogin} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
