import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { resetPasswordChangePass } from '../../redux/actions/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassWord = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [passwordShow, setPasswordShow] = useState(false);
  const [passretype, setPasswordtype] = useState(false);
  const dispatch = useDispatch();
  const { token } = useParams();

   // set eye password
   const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };
  const togglePasswordrettype = () => {
    setPasswordtype(passretype ? false : true);
  };
  const onSubmit = (data) => {
    dispatch(resetPasswordChangePass(data));
    reset();
  };

  return (
    <div>
      <div className="modal-popup">
        <div className="modal-dialog modal-dialog-centereds">
          <div className="modal-contents">
            <div className="modal-header">
              <div>
                <h5 className="modal-title title" style={{ fontSize: '30px' }}>
                  Đổi Mật khẩu
                </h5>
              </div>
            </div>
            <div className="modal-body">
              <div className="contact-form-action">
                {/* <ShowchangePassword showMessage={showMessage}/> */}
                {/* {showError()} */}
                <ToastContainer />
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                  <input type="hidden" value={token} {...register('token', { required: true })} />
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
                      {errors.email && <span className="text-danger">Bạn chưa nhập email</span>}
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
                      {errors.password && <span className="text-danger">Bạn chưa nhập Password</span>}
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
                        placeholder="Mật khẩu"
                        {...register('password_confirmation', { required: true })}
                      />
                      <i
                        className={passretype ? 'fas fa-eye' : 'fas fa-eye-slash'}
                        onClick={togglePasswordrettype}
                      ></i>
                      {errors.password_confirmation && (
                        <span className="text-danger">Bạn chưa nhập Password_confirmation</span>
                      )}
                    </div>
                  </div>
                  <div className="btn-box pt-3 pb-3">
                    <button type="submit" className="theme-btn w-100">
                      Xác nhận
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

export default ResetPassWord;
