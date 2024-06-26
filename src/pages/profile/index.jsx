import { getProfileAll } from '@/features/profiles/profilesThunk';
import useAppSelector from '@/hooks/useAppSelector';
import ProfileManagerView from '@/sections/profile/views';
import React from 'react';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const { isLoading } = useAppSelector(state => state.users);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProfileAll());
  }, []);

  return (
    <React.Fragment>
      {isLoading ? <></> : <ProfileManagerView />}
    </React.Fragment>
  );
};

export default Profile;
