import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loginAuth } from '../../redux/actions/auth';
import { isAuthenTicate } from './index';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { loginGoogle } from '../../redux/actions/auth';
import { AppRoutes } from '../../helpers/app.routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinnerCircularFixed } from 'spinners-react';
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [redirectToRef, setRedirectToRef] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // set eye password
  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    setLoading(true);
    dispatch(loginAuth(data, setRedirectToRef, setLoading));
  };
  const showLoading = () => {
    return (
      loading && (
        <div style={{ width: '50px', margin: 'auto' }}>
          <SpinnerCircularFixed color="rgba(172, 57, 94, 1)" secondaryColor="rgba(172, 57, 133, 0.44)" />
        </div>
      )
    );
  };


  const data = isAuthenTicate();
  const redirectUser = () => {
    
      if (redirectToRef) {
        if (data.roles === 'Staff') {
            return <Redirect to="/staff/profile" /> ;
        } 
        else {
            return <Redirect to="/" />;
        }
      }
  };
 

  const responseGoogle = (response) => {
    const uploads = new FormData();
    uploads.append('email', response.profileObj.email);
    uploads.append('full_name', response.profileObj.givenName);
    uploads.append('avatar', response.profileObj.imageUrl);
    uploads.append('google_id', response.googleId);
    dispatch(loginGoogle(uploads, setRedirectToRef));
  };

  return (
    <div>
      <div className="modal-popup">
        <div className="modal-dialog modal-dialog-centereds">
          <div className="modal-contents">
            <div className="modal-header">
              <div>
                <h5 className="modal-title title" style={{ fontSize: '30px' }}>
                  Đăng nhập
                </h5>
                <p className="font-size-14">Xin chào! Chào mừng đến với tài khoản của bạn</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="contact-form-action">
              {showLoading()}
                {redirectUser()}
                <ToastContainer />
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-box">
                    <label className="label-text">Email</label>
                    <div className="form-group">
                      <span className="la la-envelope-o form-icon" />
                      <input
                        className="form-control"
                        type="email"
                        name="text"
                        placeholder="Email"
                        {...register('email', { required: true })}
                      />
                      {errors.email && <span className="text-danger mt-1">Bạn chưa nhập Email</span>}
                    </div>
                  </div>
                  <div className="input-box">
                    <label className="label-text">Mật khẩu</label>
                    <div className="form-group mb-2">
                      <span className="la la-lock form-icon pass-wrapper" />
                      <input
                        className="form-control"
                        type={passwordShow ? 'text' : 'password'}
                        name="text"
                        placeholder="Mật khẩu"
                        {...register('password', { required: true })}
                      />
                      <div className="w-100 ">
                        <i
                          className={passwordShow ? 'fas fa-eye' : 'fas fa-eye-slash'}
                          onClick={togglePasswordVisiblity}
                        ></i>
                      </div>
                      {errors.password && <span className="text-danger mt-1">Bạn chưa nhập Password</span>}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="custom-checkbox mb-0"></div>
                      <p className="forgot-password">
                        <Link to={AppRoutes.forgotPassword}>Quên mật khẩu?</Link>
                      </p>
                    </div>
                  </div>
                  <div className="btn-box pt-3 pb-3">
                    <button type="submit" className="theme-btn w-100">
                      Đăng Nhập
                    </button>
                  </div>
                </form>
                <div className="action-box text-center">
                  <p className="font-size-14 pb-2">Hoặc đăng nhập bằng</p>
                  <div className="social">
                    <GoogleLogin
                      className="text-center"
                      clientId="327728887226-mcsij53cnbjgo848i67bqt9o3e7kg871.apps.googleusercontent.com"
                      buttonText="Login với google"
                      onSuccess={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                  <p className="font-size-14 pt-2 pb-2">
                    Bạn chưa có tài khoản?{' '}
                    <NavLink
                      to="/register"
                      activeClassName="active-btn"
                      className="theme-btns"
                      data-toggle="modal"
                      data-target="/loginPopupForm"
                    >
                      Đăng ký
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
