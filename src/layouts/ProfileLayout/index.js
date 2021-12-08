import React from 'react';
import SidebarProfile from '../../pages/AccountClient/sidebarProfile';
import Footer from '../MainLayout/footer';
import Header from '../MainLayout/header';

const ProfileLayout = ({ children }) => {
  return (
    <>
      <Header />
      <section className="user-area padding-top-50px padding-bottom-60px">
        <div className="container">
          <div className="row">
            <SidebarProfile />
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProfileLayout;
