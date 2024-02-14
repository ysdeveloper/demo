import React from 'react';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import DrawerLayout from '../layouts/DrawerLayout';
import Dashboard from '../page/dashboard/Dashboard';
import NotFound from '../page/Error/NoteFound';
import { RouteData } from './RouteData';
import MemberList from '../page/members-list/MemberList';
import Amenities from '../page/amenities/Amenities';
import Invoice from '../page/invoice/Invoice';
import User from '../page/users-staff/User';
import Roles from '../page/roles/Roles';
import Subscription from '../page/subscription/Subscription';
import CreateMember from '../page/members-list/create-member/CreateMember';
import CreateRole from '../page/roles/create-role/CreateRole';
import CreateStaff from '../page/users-staff/create-staff/CreateStaff';
import CreateSubscription from '../page/subscription/create-subscription/CreateSubscription';

const userRoles = {
  ADMIN: 'admin',
  USER: 'user',
};

const AppRoutes = () => {

  // This role will get from api
  const userRole = userRoles.USER

  // set tab bar name
  if (userRole) {
    document.title = `appName | ${userRole}`
  }

  const appRoutes = {
    [RouteData.dashboard]: { wrapper: DrawerLayout, component: Dashboard, allowedRoles: [userRoles.ADMIN, userRoles.USER] },
    [RouteData.memberslist]: { wrapper: DrawerLayout, component: MemberList, allowedRoles: [userRoles.ADMIN, userRoles.USER] },
    [RouteData.amenities]: { wrapper: DrawerLayout, component: Amenities, allowedRoles: [userRoles.ADMIN] },
    [RouteData.invoice]: { wrapper: DrawerLayout, component: Invoice, allowedRoles: [userRoles.ADMIN] },
    [RouteData.user]: { wrapper: DrawerLayout, component: User, allowedRoles: [userRoles.ADMIN] },
    [RouteData.roles]: { wrapper: DrawerLayout, component: Roles, allowedRoles: [userRoles.ADMIN] },
    [RouteData.subscription]: { wrapper: DrawerLayout, component: Subscription, allowedRoles: [userRoles.ADMIN] },
    [RouteData.createmember]: { wrapper: DrawerLayout, component: CreateMember, allowedRoles: [userRoles.ADMIN] },
    [RouteData.createstaff]: { wrapper: DrawerLayout, component: CreateStaff, allowedRoles: [userRoles.ADMIN] },
    [RouteData.createrole]: { wrapper: DrawerLayout, component: CreateRole, allowedRoles: [userRoles.ADMIN] },
    [RouteData.createsubscription]: { wrapper: DrawerLayout, component: CreateSubscription, allowedRoles: [userRoles.ADMIN] },
  };

  const filteredRoutes = Object.entries(appRoutes).filter(([routePath, opts]) =>
    opts.allowedRoles.includes(userRole)
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to={RouteData.dashboard} />} />
        {filteredRoutes.map(([routePath, opts]) => (
          <Route key={routePath} path={routePath} element={
            <opts.wrapper {...opts.wrapperProps}>
              <opts.component />
            </opts.wrapper>} />
        ))}
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
