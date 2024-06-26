import { getUsersAll } from '@/features/users/usersThunk';
import useAppSelector from '@/hooks/useAppSelector';
import UsersManagerView from '@/sections/users/views';
import React from 'react';
import { useDispatch } from 'react-redux';

const User = () => {
  const { isLoading } = useAppSelector(state => state.users);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUsersAll());
  }, []);
  return (
    <React.Fragment>{isLoading ? <></> : <UsersManagerView />}</React.Fragment>
  );
};

export default User;
