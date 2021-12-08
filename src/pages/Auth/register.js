import React, { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { regiterAuth } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch('password');
  const [susscces, setSusscces] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [passretype, setPasswordtype] = useState(false);
  // set eye password
  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };
  const togglePasswordrettype = () => {
    setPasswordtype(passretype ? false : true);
  };
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(regiterAuth(data, setSusscces));
  };

  const showSucces = () => {
    return (
      <div className="alert alert-info" style={{ display: susscces ? 'block' : 'none' }}>
        Bạn đã tạo tài khoản thành công. Click để <Link to="/login">Đăng nhập</Link>
      </div>
    );
  };

  return (
    <div>
      <div className="modal-popup">
        <div className="modal-dialog modal-dialog-centereds">
          <div className="modal-contents">
            <div className="modal-header">
              <div>
                <h5 className="modal-title title" style={{ fontSize: '30px' }}>
                  Đăng ký
                </h5>
                <ToastContainer />
                {showSucces()}
                <p className="font-size-14">Xin chào! Hãy tạo một tài khoản mới</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="contact-form-action">
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-box">
                    <label className="label-text">Họ & Tên</label>
                    <div className="form-group">
                      <span className="la la-user form-icon" />
                      <input
                        className="form-control"
                        type="text"
                        name="text"
                        placeholder="Username"
                        {...register('full_name', { required: true })}
                      />
                      {errors.full_name && <span className="text-danger mt-1">Bạn chưa nhập Họ tên</span>}
                    </div>
                  </div>

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
                      <span className="la la-lock form-icon" />
                      <input
                        className="form-control"
                        type={passwordShow ? 'text' : 'password'}
                        name="text"
                        placeholder="Mật khẩu"
                        {...register('password', { required: true })}
                      />
                      <i
                        className={passwordShow ? 'fas fa-eye' : 'fas fa-eye-slash'}
                        onClick={togglePasswordVisiblity}
                      ></i>
                      {errors.password && errors.password.type === 'required' && (
                        <span className="text-danger mt-1"> Bạn chưa nhập mật khẩu</span>
                      )}
                    </div>
                  </div>

                  <div className="input-box">
                    <label className="label-text">Nhập lại mật khẩu</label>
                    <div className="form-group mb-2">
                      <span className="la la-lock form-icon" />
                      <input
                        className="form-control"
                        type={passretype ? 'text' : 'password'}
                        name="text"
                        placeholder="Nhập lại mật khẩu"
                        {...register('password_repeat', {
                          required: true,
                          validate: (value) => value === password.current,
                        })}
                      />
                      <i className={passretype ? 'fas fa-eye' : 'fas fa-eye-slash'} onClick={togglePasswordrettype}></i>
                      {errors.password_repeat && errors.password_repeat.type === 'required' && (
                        <span className="text-danger">Trường xác nhập mật khẩu này là bắt buộc</span>
                      )}
                      {errors.password_repeat && errors.password_repeat.type === 'validate' && (
                        <span className="text-danger">Mật khẩu không trùng khớp</span>
                      )}
                    </div>
                  </div>

                  <div className="btn-box pt-3 pb-4">
                    <button type="submit" className="theme-btn w-100">
                      Đăng Ký
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
