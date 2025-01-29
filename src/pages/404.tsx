import React from 'react';
import { ApiHooks } from '../api';

// const {UserQueries} = ApiHooks;

const NotFound = () => {
  const { data: users } = ApiHooks.UserQueries.useGetUsers();
  console.log(users, '8');
  return <div>NotFound</div>;
};

export default NotFound;
