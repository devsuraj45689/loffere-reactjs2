import { lazy } from 'react';
import { IAppRoute } from 'routes';
const PostProduct = lazy(() => import('../components/PostProduct/PostProduct'));

const routes: IAppRoute[] = [
  {
    path: '/post-product',
    element: PostProduct,
    meta: { requiresAuth: true, title: 'Post Product' },
  },
];

export default routes;
