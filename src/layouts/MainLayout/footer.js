import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { setting } from '../../redux/actions/setting';
const Footer = () => {
  const getSetting = useSelector((state) => state.setting.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setting());
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <section className="footer-area section-bg padding-top-100px padding-bottom-30px">
        <div className="container">
          <div className="row">
            {getSetting.slice(0, 1).map((item) => (
              <div className="col-lg-3 responsive-column" key={item.id}>
                <div className="footer-item">
                  <div className="footer-logo padding-bottom-30px">
                    <Link to={AppRoutes.home} className="foot__logo">
                      <img src="/assets/images/logo.png" alt="true" />
                    </Link>
                  </div>
                  {/* end logo */}
                  <p className="footer__desc">"{item.slogan}"</p>
                  <ul className="list-items pt-3">
                    <li>{item.title_deep}</li>
                    <li>{item.phone}</li>
                    <li>
                      <Link to="/">{item.email}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}

            <div className="col-lg-3 responsive-column">
              <div className="footer-item">
                <h4 className="title curve-shape pb-3 margin-bottom-20px" data-text="curvs">
                  Cửa hàng
                </h4>
                <ul className="list-items list--items">
                  <li>
                    <Link to="/">Về chúng tôi</Link>
                  </li>
                  <li>
                    <Link to="services.html">Dịch vụ</Link>
                  </li>
                  <li>
                    <Link to="/">Việc làm</Link>
                  </li>
                  <li>
                    <Link to="/">Tin tức</Link>
                  </li>
                  <li>
                    <Link to="/">Hỗ trợ</Link>
                  </li>
                  <li>
                    <Link to="/">Quảng cáo</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 responsive-column">
              <div className="footer-item">
                <h4 className="title curve-shape pb-3 margin-bottom-20px" data-text="curvs">
                  Giờ phục vụ
                </h4>
                <ul className="list-items list--items">
                  <li>
                    <Link to="/">Thứ 2 đến thứ 6: 8h00 - 21h00</Link>
                  </li>
                  <li>
                    <Link to="/">Thứ 7, chủ nhật: 7h30 - 21h00</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 responsive-column">
              <div className="footer-item">
                <h4 className="title curve-shape pb-3 margin-bottom-20px" data-text="curvs">
                  Theo dõi ngay
                </h4>
                <p className="footer__desc pb-3">Đăng ký để cập nhật và &amp; khuyến mãi mới nhất</p>
                <div className="contact-form-action">
                  <form action="#">
                    <div className="input-box">
                      <label className="label-text">Nhập địa chỉ email</label>
                      <div className="form-group mb-0">
                        <span className="la la-envelope form-icon" />
                        <input className="form-control" type="email" name="email" placeholder="Địa chỉ email" />
                        <button className="theme-btn theme-btn-small submit-btn" type="submit">
                          Go
                        </button>
                        <span className="font-size-14 pt-1">
                          <i className="la la-lock mr-1" />
                          Chúng tôi cam kết bảo mật thông tin của bạn.
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="term-box footer-item">
                <ul className="list-items list--items d-flex align-items-center">
                  <li>
                    <Link to="/">Điều khoản &amp; điều kiện</Link>
                  </li>
                  <li>
                    <Link to="/">Chính sách bảo mật</Link>
                  </li>
                  <li>
                    <Link to="/">Trung tâm trợ giúp</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="footer-social-box text-right">
                <ul className="social-profile">
                  <li>
                    <Link to="/">
                      <i className="lab la-facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="lab la-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="lab la-instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="lab la-linkedin-in" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="section-block mt-4" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="copy-right padding-top-30px">
                <p className="copy__desc">
                  © Copyright Time Nails 2020. Made with
                  <span className="la la-heart" /> by <Link to="/">Time Nails</Link>
                </p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="copy-right-content d-flex align-items-center justify-content-end padding-top-30px">
                <h3 className="title font-size-15 pr-2">Chấp nhận thanh toán</h3>
                <img src="/assets/images/payment-img.png" alt="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="back-to-top">
        <i className="la la-angle-up" title="Go top" />
      </div>
    </div>
  );
};

export default Footer;
