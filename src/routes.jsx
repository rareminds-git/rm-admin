import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/dashboard/',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/pages/',
        element: lazy(() => import('./views/pages/Pages'))
      },
      {
        exact: 'true',
        path: '/pages/edit/:slug',
        element: lazy(() => import('./views/pages/EditPage'))
      },
      {
        exact: 'true',
        path: '/services/:slug',
        element: lazy(() => import('./views/services/Services'))
      },
      {
        exact: 'true',
        path: '/edit/:userType/services/:slug',
        element: lazy(() => import('./views/services/EditService'))
      },
      {
        exact: 'true',
        path: '/case-studies/:slug',
        element: lazy(() => import('./views/case-studies/CaseStudies'))
      },
      {
        exact: 'true',
        path: '/edit/:userType/case-studies/:slug',
        element: lazy(() => import('./views/case-studies/EditStudy'))
      },
      {
        exact: 'true',
        path: '/blogs',
        element: lazy(() => import('./views/blogs/Blogs'))
      },
      {
        exact: 'true',
        path: '/blogs/add',
        element: lazy(() => import('./views/blogs/AddBlog'))
      },
      {
        exact: 'true',
        path: '/edit/blog/:slug',
        element: lazy(() => import('./views/blogs/EditBlog'))
      },
      {
        exact: 'true',
        path: '/general-events',
        element: lazy(() => import('./views/general-events/GeneralEvents'))
      },
      {
        exact: 'true',
        path: '/general-events/add',
        element: lazy(() => import('./views/general-events/AddGeneralEvent'))
      },
      {
        exact: 'true',
        path: '/edit/general-events/:slug',
        element: lazy(() => import('./views/general-events/EditGeneralEvent'))
      },
      {
        exact: 'true',
        path: '/gallery',
        element: lazy(() => import('./views/gallery/Gallery'))
      },
      {
        exact: 'true',
        path: '/gallery/add',
        element: lazy(() => import('./views/gallery/AddGallery'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      },
      {
        exact: 'true',
        path: '/contacts',
        element: lazy(() => import('./views/contacts/Contacts'))
      },
      {
        exact: 'true',
        path: '/testimonials',
        element: lazy(() => import('./views/testimonials/Testimonials'))
      },
      {
        exact: 'true',
        path: '/testimonials/add',
        element: lazy(() => import('./views/testimonials/AddTestimonial'))
      },
      {
        exact: 'true',
        path: '/edit/testimonial/:id',
        element: lazy(() => import('./views/testimonials/EditTestimonial'))
      },
      {
        exact: 'true',
        path: '/events',
        element: lazy(() => import('./views/events/Events'))
      },
      {
        exact: 'true',
        path: '/events/add',
        element: lazy(() => import('./views/events/AddEvent'))
      },
      {
        exact: 'true',
        path: '/edit/events/:id',
        element: lazy(() => import('./views/events/EditEvent'))
      }
    ]
  }
];

export default routes;
