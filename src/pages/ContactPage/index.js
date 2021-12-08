import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Contact } from '../../redux/actions/contact';
import Swal from 'sweetalert2';

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

            <div className="col-lg-4">
              <div className="form-box">
                <div className="form-title-wrap">
                  <h3 className="title">Liên Hệ Với Chúng Tôi</h3>
                </div>

                <div className="form-content">
                  <div className="address-book">
                    <ul className="list-items contact-address">
                      <li>
                        <i className="la la-map-marker icon-element" />
                        <h5 className="title font-size-16 pb-1">Địa Chỉ </h5>
                        <p className="map__desc">
                          Cao đẳng FPT Polytechnic, Đường Trịnh Văn Bô, Phường Phương Canh, Quận Nam Từ Liêm, TP Hà Nội
                        </p>
                      </li>
                      <li>
                        <i className="la la-phone icon-element" />
                        <h5 className="title font-size-16 pb-1">Điện Thoại</h5>
                        <p className="map__desc">Telephone: 2800 256 508</p>
                        <p className="map__desc">Mobile: 666 777 888</p>
                      </li>
                      <li>
                        <i className="la la-envelope-o icon-element" />
                        <h5 className="title font-size-16 pb-1">Email</h5>
                        <p className="map__desc">needhelp@trizen.com</p>
                        <p className="map__desc">inquiry@trizen.com</p>
                      </li>
                    </ul>
                    <ul className="social-profile text-center">
                      <li>
                        <a href="#/">
                          <i className="lab la-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          <i className="lab la-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          <i className="lab la-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          <i className="lab la-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          <i className="lab la-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-area padding-bottom-100px">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d36731.1752731323!2d105.76307168400422!3d21.033016869053537!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1633422810838!5m2!1sen!2sus"
                  width={1170}
                  height={450}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="This is a unique title"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
