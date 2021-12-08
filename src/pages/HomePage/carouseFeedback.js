import React from 'react';
import Slider from 'react-slick';

const CarouseFeedback = () => {
  const feedback = [
    {
      status: '予想外に三角の飾りが大きいけど、色味は可愛いしなんと言ってもネイル代が安いからまあいっか！って感じ?♥️',
      image: '/assets/images/team8.jpg',
      author: 'Kana Umemura',
      address: 'Nhật Bản',
    },
    {
      status:
        'Làm nail tại Nail Room max xinh mà còn bền kinh khủng. Mình làm một bộ móng mà chơi dài mấy tháng liền, nhân viên lại dễ thương, cute nữa, mãi yêu Time Nails.',
      image: '/assets/images/team8.jpg',
      author: 'Hương Nhi',
      address: 'Hà Nội',
    },
    {
      status:
        'Mình làm móng 3 lần ở NAIL ROOM đều làm với chị Trúc và đều làm đúng một bộ ombre + marble. Tiệm đẹp, nhân viên nhẹ nhàng, dễ thương, đi đúng giờ hay gặp người nổi tiếng =)))))',
      image: '/assets/images/team8.jpg',
      author: 'Vũ Thảo',
      address: 'Hà Nội',
    },
    {
      status:
        'The best nail salon I had in Danang City. Full service include nail service, eyelash extension, facial, and hair wash.',
      image: '/assets/images/team8.jpg',
      author: 'Kim Jeong',
      address: 'Hàn Quốc',
    },
  ];
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    cssEase: 'linear',
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <section className="testimonial-area section-padding section-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading text-center mb-0">
              <h2 className="sec__title">CẢM NHẬN VỀ TIME NAILS</h2>
            </div>
          </div>
        </div>
        <div className="row padding-top-50px">
          <div className="col-lg-12">
            <Slider {...settings}>
              {feedback.map((item, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testi-desc-box text-center">
                    <p className="testi__desc">
                      <i className="la la-quote-left"></i> {item.status} <i className="la la-quote-right"></i>
                    </p>
                  </div>
                  <div className="author-content d-flex justify-content-center">
                    <div>
                      <img className="author-img" src={item.image} alt="" />
                      <div className="author-bio text-center">
                        <h4 className="author__title">{item.author}</h4>
                        <span className="author__meta">{item.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CarouseFeedback;
