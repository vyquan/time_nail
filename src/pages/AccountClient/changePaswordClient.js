import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from '../../helpers/app.routes';
import { changePassWord } from '../../redux/actions/auth';
import { isAuthenTicate } from '../Auth';

const ChangePasswordClient = () => {
  const data = isAuthenTicate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [passwordShow, setPasswordShow] = useState(false);
  const [passretype, setPasswordtype] = useState(false);
  const [passwords, setPasswords] = useState(false);
  // set eye password
  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };
  const togglePasswordrettype = () => {
    setPasswordtype(passretype ? false : true);
  };
  const togglePassword = () => {
    setPasswords(passwords ? false : true);
  };

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    reset('');
    const uploadChange = new FormData();
    uploadChange.append('id', data.id);
    uploadChange.append('password', data.password);
    uploadChange.append('new_password', data.new_password);
    uploadChange.append('re_password', data.re_password);
    dispatch(changePassWord(uploadChange));
  };

  return (
    <div className="col-lg-9">
      <div className="form-box">
        <div className="form-title-wrap">
          <h3 className="title">
            <font style={{ verticalAlign: 'inherit' }}>
              <font style={{ verticalAlign: 'inherit' }}>Đổi mật khẩu </font>
            </font>
          </h3>
        </div>
        <div className="form-content">
          <div className="contact-form-action">
            <ToastContainer />
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              className="MultiFile-intercepted"
              encType="multipart/form-data"
            >
              <input type="hidden" value={data.user ? data.user.id : data.id} {...register('id')} />
              <div className="row">
                <div className="col-lg-12 responsive-column  d-flex justify-content-center d-flex justify-content-center">
                  <div className="input-box w-password">
                    <label className="label-text">
                      <font style={{ verticalAlign: 'inherit' }}>
                        <font style={{ verticalAlign: 'inherit' }}>Mật khẩu hiện tại</font>
                      </font>
                    </label>
                    <div className="form-group">
                      <span className="la la-lock form-icon" />
                      <input
                        className="form-control"
                        type={passwordShow ? 'text' : 'password'}
                        placeholder="Mật khẩu hiện tại"
                        {...register('password', { required: true })}
                      />
                      <i
                        className={passwordShow ? 'fas fa-eye' : 'fas fa-eye-slash' }
                        onClick={togglePasswordVisiblity}
                      ></i>
                      {errors.password && <span className="text-danger">Bạn cần nhập mật khẩu hiện tại</span>}
                      <p className="forgot-password float-right">
                        <Link to={AppRoutes.forgotPassword}>Quên mật khẩu?</Link>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 responsive-column  d-flex justify-content-center">
                  <div className="input-box w-password">
                    <label className="label-text">
                      <font style={{ verticalAlign: 'inherit' }}>
                        <font style={{ verticalAlign: 'inherit' }}>Mật khẩu mới</font>
                      </font>
                    </label>
                    <div className="form-group">
                      <span className="la la-lock form-icon" />
                      <input
                        className="form-control"
                        type={passretype ? 'text' : 'password'}
                        placeholder="Mật khẩu mới"
                        {...register('new_password', { required: true })}
                      />
                      <i className={passretype ? 'fas fa-eye' : 'fas fa-eye-slash' } onClick={togglePasswordrettype}></i>
                      {errors.new_password && <span className="text-danger">Bạn cần nhập mật khẩu mới </span>}
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 responsive-column  d-flex justify-content-center">
                  <div className="input-box w-password">
                    <label className="label-text">
                      <font style={{ verticalAlign: 'inherit' }}>
                        <font style={{ verticalAlign: 'inherit' }}>Xác nhận mật khẩu</font>
                      </font>
                    </label>
                    <div className="form-group">
                      <span className="la la-lock form-icon" />
                      <input
                        className="form-control"
                        type={passwords ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu mới "
                        {...register('re_password', { required: true })}
                      />
                      <i className={passwords ? 'fas fa-eye' : 'fas fa-eye-slash' } onClick={togglePassword}></i>
                      {errors.re_password && (
                        <span className="text-danger">Bạn cần nhập mật khẩu mới một lần nữa </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="btn-box w-password">
                    <button className="theme-btn" type="submit">
                      <font style={{ verticalAlign: 'inherit' }}>
                        <font style={{ verticalAlign: 'inherit' }}>Đổi Mật Khẩu</font>
                      </font>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordClient;
