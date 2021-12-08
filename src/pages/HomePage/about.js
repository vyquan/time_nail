import React from 'react';

const About = () => {
  return (
    <section className="mobile-app padding-top-100px padding-bottom-50px ">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="mobile-app-content">
              <div className="section-heading">
                <h3 className="cart-title">"You Love It. We Nail It!"</h3>
                <h2 className="sec__title line-height-55 padding-top-30px">
                  VỚI TIME NAILS <br />
                  “AI CŨNG CÓ THỂ TRỞ NÊN ĐẸP HƠN”
                </h2>
              </div>
              <ul className="info-list padding-top-30px">
                <li className="d-flex align-items-center mb-3">
                  Sở hữu các dịch vụ từ làm nail, spa, waxing, phun thêu lông mày, nối mi,… và một không gian cửa hàng
                  yên tĩnh, long lanh dành riêng cho phái đẹp khiến Time Nails trở thành điểm đến yêu thích của hơn
                  500.000 khách hàng trong và ngoài nước.
                </li>
                <li className="d-flex align-items-center mb-3">
                  Với đội ngũ chuyên viên tài năng, dễ thương cùng hệ thống máy móc, dụng cụ nhập từ Hàn Quốc và các sản
                  phẩm organic của Hàn – Anh – Pháp – Mỹ, 15 cơ sở của Time Nails chắc chắn sẽ đem lại những xu hướng
                  làm đẹp mới nhất đến khách hàng
                </li>
                <li className="d-flex align-items-center mb-3">
                  Hãy ghé chơi với chúng mình để cảm nhận niềm vui từ việc yêu chiều bản thân nhé!
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="mobile-img">
              <img src="./assets/images/mobile-app.png" alt="mobile-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
