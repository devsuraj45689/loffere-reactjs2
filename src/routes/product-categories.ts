import { lazy } from 'react';
import { IAppRoute } from 'routes';
const ProductCategoriesPage = lazy(() => import('../pages/ProductCategories'));

const routes: IAppRoute[] = [
  {
    path: '/product-categories',
    element: ProductCategoriesPage,
    meta: { requiresAuth: true, title: 'Product Categories' },
  },
];

export default routes;
