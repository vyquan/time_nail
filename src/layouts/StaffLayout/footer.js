import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="border-top mt-4" />
      <div className="row align-items-center">
        <div className="col-lg-7">
          <div className="copy-right padding-top-30px">
            <p className="copy__desc">
              © Copyright Trizen 2020. Made with
              <span className="la la-heart" /> by{' '}
              <a className="" href="#/">
                72
              </a>
            </p>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="copy-right-content text-right padding-top-30px">
            <ul className="social-profile">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
