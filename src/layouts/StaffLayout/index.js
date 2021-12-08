import React from 'react';
import Footer from './footer';
import Header from './header';
import SidebarStaff from './sidebar';

const StaffLayout = ({ children }) => {
  return (
    <div>
      <SidebarStaff />
      <section className="dashboard-area">
        <Header />
        <div className="dashboard-content-wrap">
          <div className="dashboard-bread dashboard--bread">
            <div className="container-fluid">
              {/* <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title font-size-30 text-white">My Booking</h2>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="breadcrumb-list text-right">
                    <ul className="list-items">
                      <li>
                        <a href="index.html" className="text-white">
                          Home
                        </a>
                      </li>
                      <li>Dashboard</li>
                      <li>My Booking</li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="dashboard-main-content">
            <div className="container-fluid">
              {children}
              <Footer />
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

export default StaffLayout;
