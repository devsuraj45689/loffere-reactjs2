import { lazy } from 'react';
import { IAppRoute } from 'routes';
const HomePage = lazy(() => import('../pages/Home'));

// Define routes with types
const routes: IAppRoute[] = [
  {
    path: '',
    element: HomePage,
    meta: { requiresAuth: true, title: 'Home' },
  },
];

export default routes;

// const routes: IAppRoute[] = [
//   {
//   path: "/dashboard",
//   element: NotFoundPage,
//   meta: { requiresAuth: true, title: "Dashboard" },
//   children: [
//     {
//       path: "overview",
//       element: NotFoundPage,
//       meta: { requiresAuth: true, title: "Dashboard Overview" },
//     },
//     {
//       path: "reports",
//       element: NotFoundPage,
//       meta: { requiresAuth: true, title: "Reports" },
//     },
//   ],
// }]  # demo routes
