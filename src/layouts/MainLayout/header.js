import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { setting } from '../../redux/actions/setting';
import Notification from '../../components/Notification';
import { isAuthenTicate } from '../../pages/Auth/index';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();
  const getSetting = useSelector((state) => state.setting.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setting());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    isAuthenTicate() && setIsLogin(true);
  }, [pathname, isLogin]);

  return (
    <>
      <header className="header-area">
        <div className="header-top-bar padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="header-top-content">
                  <div className="header-left">
                    {getSetting.slice(0, 1).map((item) => (
                      <ul className="list-items" key={item.id}>
                        <li>
                          <Link to={AppRoutes.home}>
                            <i className="la la-phone mr-1" />
                            {item.phone}
                          </Link>
                        </li>
                        <li>
                          <Link to={AppRoutes.home}>
                            <i className="la la-envelope mr-1" />
                            {item.email}
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="header-top-content">
                  <div className="header-right d-flex align-items-center justify-content-end">
                    {!isLogin && (
                      <>
                        <NavLink to="/login" className="title login font-size-15 pr-2" activeClassName="active ">
                          Đăng Nhập
                        </NavLink>
                        <NavLink to="/register" className="title font-size-15 pl-2" activeClassName="active">
                          {' '}
                          Đăng Ký
                        </NavLink>
                      </>
                    )}
                    {isLogin && <Notification setIsLogin={setIsLogin} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-menu-wrapper padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="menu-wrapper">
                  <Link to={AppRoutes.home} className="down-button">
                    <i className="la la-angle-down" />
                  </Link>
                  {getSetting.slice(0, 1).map((logo) => (
                    <div className="logo" key={logo.id}>
                      <Link to={AppRoutes.home}>
                        <img src="/assets/images/logo.png" alt="Logo" />
                      </Link>
                      <div className="menu-toggler">
                        <i className="la la-bars" />
                        <i className="la la-times" />
                      </div>
                    </div>
                  ))}
                  {/* end logo */}
                  <div className="main-menu-content">
                    <nav>
                      <ul>
                        <li>
                          <NavLink exact to={AppRoutes.home} activeClassName="active">
                            Trang chủ
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={AppRoutes.service.list} activeClassName="active">
                            Dịch vụ
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={AppRoutes.comboService.list} activeClassName="active">
                            Combo Hot
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={AppRoutes.gallery.list} activeClassName="active">
                            Gallery
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={AppRoutes.news.list} activeClassName="active">
                            Bài Viết
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={AppRoutes.contact} activeClassName="active">
                            Liên Hệ
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={AppRoutes.booking} className="booking-link" activeClassName="active">
                            Đặt Lịch
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="nav-btn">
                    <NavLink to={AppRoutes.booking} className="theme-btn theme-btn-small" activeClassName="active-btn">
                      ĐẶT LỊCH
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
