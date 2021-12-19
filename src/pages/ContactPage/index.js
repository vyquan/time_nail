import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Contact } from '../../redux/actions/contact';
import Swal from 'sweetalert2';
import Address from './address';
import Map from './map';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const newContact = {
      ...data,
    };
    if (newContact) {
      Swal.fire({
        title: 'Cảm ơn bạn đã gửi thông tin',
      });
      dispatch(Contact(newContact));
    }
    reset('');
  };
  return (
    <div>
      <section className="breadcrumb-area bread-bg">
        <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="breadcrumb-content">
                  <div className="section-heading">
                    <h2 className="sec__title text-white">Liên hệ</h2>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="breadcrumb-list text-right">
                  <ul className="list-items">
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Liên hệ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END HEADER */}

      {/* START BODY */}
      <section className="contact-area section--padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="form-box">
                <div className="form-title-wrap">
                  <h3 className="title">Bạn cần hỗ trợ?</h3>
                  <p className="font-size-15">Liên hệ với chúng tôi để được giải đáp</p>
                </div>
                {/* form-title-wrap */}
                <div className="form-content ">
                  <div className="contact-form-action">
                    <form
                      className="row messenger-box-form"
                      method="post"
                      onSubmit={handleSubmit(onSubmit)}
                      encType="multipart/form-data"
                    >
                      <div
                        className="alert alert-success messenger-box-contact__msg col-lg-12"
                        style={{ display: 'none' }}
                        role="alert"
                      >
                        Thank You! Your message has been sent.
                      </div>
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box messenger-box-input-wrap">
                          <label className="label-text" htmlFor="name">
                            Họ tên
                          </label>
                          <div className="form-group">
                            <span className="la la-user form-icon" />
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nhập họ tên"
                              {...register('full_name_ct', { required: true })}
                            />
                            {errors.full_name_ct && <span className="text-danger">Bạn chưa nhập Họ tên</span>}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 responsive-column">
                        <div className="input-box messenger-box-input-wrap">
                          <label className="label-text" htmlFor="email">
                            Email
                          </label>
                          <div className="form-group">
                            <span className="la la-envelope-o form-icon" />
                            <input
                              className="form-control"
                              type="email"
                              placeholder="Địa chỉ email"
                              {...register('email_ct', { required: true })}
                            />
                            {errors.email_ct && <span className="text-danger">Bạn chưa nhập Email</span>}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-box messenger-box-input-wrap">
                          <label className="label-text" htmlFor="message">
                            Lời nhắn
                          </label>
                          <div className="form-group">
                            <span className="la la-pencil form-icon" />
                            <textarea
                              className="message-control form-control"
                              name="message"
                              placeholder="Lời nhắn"
                              {...register('message', { required: true })}
                            />
                            {errors.message && <span className="text-danger">Nội dung bạn chưa nhập</span>}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="btn-box messenger-box-input-wrap">
                          <button
                            name="submit"
                            type="submit"
                            className="theme-btn send-message-btn"
                            id="send-message-btn"
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Address />
          </div>
        </div>
      </section>
      <Map />
    </div>
  );
};

export default ContactPage;
