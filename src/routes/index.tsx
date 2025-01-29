import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import homePageRoutes from './home';
import JobInfoRoutes from './job-info';
import ProductInfoRoutes from './product-info';
import ProductCategoriesRoutes from './product-categories';
import PostProductRoutes from './post-product';
import PostJobRoutes from './post-job';
import PrivacyRoutes from './privacy';

const NotFoundPage = lazy(() => import('../pages/404'));

const Loading: React.FC = () => {
  return <div>Loading...</div>;
};

export interface RouteMeta {
  requiresAuth: boolean;
  roles?: string[];
  title: string;
}

export interface IAppRoute extends Omit<RouteObject, 'children' | 'element'> {
  element: React.FC;
  meta: RouteMeta;
  children?: IAppRoute[];
}

export const routes: IAppRoute[] = [
  ...homePageRoutes,
  ...JobInfoRoutes,
  ...ProductInfoRoutes,
  ...ProductCategoriesRoutes,
  ...PostProductRoutes,
  ...PostJobRoutes,
  ...PrivacyRoutes,
  {
    path: '*',
    element: NotFoundPage,
    meta: { requiresAuth: false, title: '404 - Page Not Found' },
  },
];

const buildRoutes = (routes: IAppRoute[]): RouteObject[] =>
  routes.map((Route) => ({
    path: Route.path,
    element: (
      <Suspense fallback={<Loading />}>
        {Route.meta.requiresAuth ? (
          <ProtectedRoute meta={Route?.meta} children={<Route.element />} />
        ) : (
          <Route.element />
        )}
      </Suspense>
    ),
    children: Route.children ? buildRoutes(Route.children) : undefined,
  }));

const router = createBrowserRouter(buildRoutes(routes));
export default router;
