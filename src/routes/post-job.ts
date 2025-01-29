import { lazy } from 'react';
import { IAppRoute } from 'routes';
const PostJob = lazy(() => import('../components/PostJob/PostJob'));

const routes: IAppRoute[] = [
  {
    path: '/job-info',
    element: PostJob,
    meta: { requiresAuth: true, title: 'Dashboard' },
  },
];

export default routes;
