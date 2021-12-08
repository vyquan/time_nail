import { ComponentType, Fragment } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React from 'react';
import { isAuthenTicate } from '../../pages/Auth';
import LayoutClient from '../../layouts/MainLayout';
import StaffLayout from '../../layouts/StaffLayout';
import { AppRoutes } from '../../helpers/app.routes';

export const RouteLayout = ({
  layout: Layout,
  component: Component,
  isPrivate = false,
  title,
  path,
  isAuthRoute = false,
  ...props
}) => {
  const isAuthenticated = isAuthenTicate();
  // console.log(isAuthenTicate().roles,'hihi');
  // if(isAuthenTicate() && isAuthenTicate().roles === 'Staff') return <Redirect push exact={true} to={AppRoutes.login} />;
  if (!isAuthenticated && isPrivate) return <Redirect push exact={true} to={AppRoutes.login} />;
  if (isAuthenticated && isAuthRoute) return <Redirect push exact={true} to={'/'} />;

  return (
    <Route
      {...props}
      path={path}
      render={(ownProps) => {
        return (
          <Fragment>
            <Helmet>
              <title>{title ? title + ' - ' : ''} Object Admin</title>
            </Helmet>
            {Layout ? (
              <Layout>
                <Component {...ownProps} />
              </Layout>
            ) : (
              <Component {...ownProps} />
            )}
          </Fragment>
        );
      }}
    />
  );
};

export default RouteLayout;
