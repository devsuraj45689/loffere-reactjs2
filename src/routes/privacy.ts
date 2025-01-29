import { lazy } from 'react';
import { IAppRoute } from 'routes';
const PrivacyPage = lazy(() => import('../components/Privacy/PrivacyPage'));

const routes: IAppRoute[] = [
  {
    path: '/job-info',
    element: PrivacyPage,
    meta: { requiresAuth: true, title: 'Privacy Page' },
  },
];

export default routes;
