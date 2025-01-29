import { lazy } from 'react';
import { IAppRoute } from 'routes';
const ProductInfo = lazy(() => import('../pages/ProductInfo'));

const routes: IAppRoute[] = [
  {
    path: '/product-info',
    element: ProductInfo,
    meta: { requiresAuth: true, title: 'Product Info' },
  },
];

export default routes;
