import React from 'react';

const BookingResult = () => {
  return (
    <section className="about-area section--padding overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="about-content pr-5">
              <div className="section-heading text-center align-content-center">
                {/* <h4 className="font-size-16 pb-2">Our Story</h4> */}
                <h2 className="sec__title pt-5">NHẬN YÊU CẦU ĐẶT CHỖ!</h2>
                <p className="sec__desc pt-5 pb-2">Cảm ơn bạn đã đặt lịch!<br /> Chúng tôi đang xử lý yêu cầu đặt lịch của bạn.</p>
                <p className="sec__desc pt-2">Vui lòng kiểm tra Email của bạn để biết xác nhận đặt lịch từ Time Nails.</p>
              </div>
              <div className="btn-box pt-5 w-full d-flex justify-content-center">
              <img style={{width:'300px'}} src="/assets/images/pngkit_thanks-you-png.png" alt="kit_thanks-you" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image-box about-img-box">
              <img src="/assets/images/Rectangle-74.jpg" alt="about-img" className="img__item img__item-1" />
              <img src="/assets/images/waterless-manicure.jpg" alt="about-img" className="img__item img__item-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingResult;
