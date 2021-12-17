import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { resetPassWord } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinnerCircularFixed } from 'spinners-react';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    setLoading(true);
    dispatch(resetPassWord(data, setLoading));
    reset();
  };
  const showLoading = () => {
    return (
      loading && (
        <div style={{ width: '50px', margin: 'auto' }}>
          <SpinnerCircularFixed color="rgba(172, 57, 94, 1)" secondaryColor="rgba(172, 57, 133, 0.44)"  />
        </div>
      )
    );
  };

  return (
    <div>
      <section className="breadcrumb-area bread-bg-9">
        <div className="breadcrumb-wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="breadcrumb-content">
                  <div className="section-heading">
                    <h2 className="sec__title text-white">Khôi phục lại mật khẩu</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-area padding-top-100px padding-bottom-70px">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="form-box">
                <div className="form-title-wrap">
                  <h3 className="title">Khôi phục mật khẩu</h3>
                  <p className="font-size-15 pt-2">
                    Nhập email của tài khoản của bạn để đặt lại mật khẩu. Sau đó, bạn sẽ nhận được một liên kết đến
                    email để đặt lại mật khẩu. Nếu bạn có bất kỳ vấn đề nào về việc đặt lại mật khẩu,
                    <Link to="#"> Hãy liên hệ với chúng tôi</Link>
                  </p>
                </div>

                <div className="form-content ">
                  <div className="contact-form-action">
                    {showLoading()}
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-box">
                        <label className="label-text">Địa chỉ Email</label>
                        <div className="form-group">
                          <span className="la la-envelope-o form-icon" />
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Vui lòng nhập địa chỉ email của bạn"
                            {...register('email', { required: true })}
                          />
                          {errors.email && <span className="text-danger">Bạn chưa nhập Email</span>}
                        </div>
                      </div>
                      <div className="btn-box">
                        <button type="submit" className="theme-btn">
                          Gửi
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
