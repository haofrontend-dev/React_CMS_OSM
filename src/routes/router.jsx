import { createBrowserRouter } from 'react-router-dom';

import NotFound from '@/pages/notfound';
import {
  Error5XX,
  LayoutAuth,
  LayoutMain,
  Login,
  Maps,
  Orders,
  Profile,
  Unauthorized,
  User,
  UserCreate,
  UserDetail,
  UserEdit,
  UserLayout,
  Vehicle,
  VehicleCreate,
  VehicleDetail,
  VehicleEdit,
  VehicleLayout
} from '@/routes/lazyLoader';

import App from '@/App';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LayoutMain />,
        errorElement: <Error5XX />,
        children: [
          //* Dashboard Page
          {
            path: '/',
            element: <VehicleLayout />,
            errorElement: <Error5XX />,
            children: [
              {
                index: true,
                element: <Vehicle />
              }
            ]
          },
          //* Profile Page
          {
            path: 'profile',
            element: <Profile />,
            errorElement: <Error5XX />
          },
          //* User Page
          {
            path: 'user',
            element: <UserLayout />,
            errorElement: <Error5XX />,
            children: [
              {
                index: true,
                element: <User />
              },
              {
                path: ':id',
                element: <UserDetail />
              },
              {
                path: 'create',
                element: <UserCreate />
              },
              {
                path: 'edit/:id',
                element: <UserEdit />
              }
            ]
          },
          // * Vehicle Page
          {
            path: 'vehicle',
            element: <VehicleLayout />,
            errorElement: <Error5XX />,
            children: [
              {
                index: true,
                element: <Vehicle />
              },
              {
                path: ':id',
                element: <VehicleDetail />
              },
              {
                path: 'create',
                element: <VehicleCreate />
              },
              {
                path: 'edit/:id',
                element: <VehicleEdit />
              }
            ]
          },

          {
            path: 'list-orders',
            element: <Orders />,
            errorElement: <Error5XX />
          },
          {
            path: 'maps',
            element: <Maps />,
            errorElement: <Error5XX />
          },
          //* Unauthorized Page
          {
            path: 'unauthorized',
            element: <Unauthorized />,
            errorElement: <Error5XX />
          }
        ]
      },
      {
        path: 'auth',
        element: <LayoutAuth />,
        errorElement: <Error5XX />,
        children: [
          {
            path: 'login',
            element: <Login />,
            errorElement: <Error5XX />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <Error5XX />
  }
];

const router = createBrowserRouter(routes);

export { router, routes };
