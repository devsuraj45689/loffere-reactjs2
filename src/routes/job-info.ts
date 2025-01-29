import { lazy } from 'react';
import { IAppRoute } from 'routes';
const JobInfo = lazy(() => import('../pages/JobInfo'));

const routes: IAppRoute[] = [
  {
    path: '/job-info',
    element: JobInfo,
    meta: { requiresAuth: true, title: 'Job Info' },
  },
];

export default routes;
