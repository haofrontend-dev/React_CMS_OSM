import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { USER_KEYS } from '@/configs';
import { loginUser } from '@/features/auth/authThunk';
import useAppSelector from '@/hooks/useAppSelector';
import { setItem } from '@/utils';
import { Box, Button, TextField } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { isLoading, dataAuth } = useAppSelector(state => state.auth);
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(loginUser(data));
  };

  React.useEffect(() => {
    if (dataAuth) {
      setItem(USER_KEYS.USER_TOKEN, dataAuth.access_token);
      navigate('/');
    }
  }, [dataAuth]);

  return (
    <React.Fragment>
      <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col items-center justify-center h-full'>
              <h1 className='text-2xl xl:text-3xl font-extrabold'>Login</h1>
              <div className='w-full mt-8'>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                  >
                    <TextField
                      id='email'
                      label='Email or username'
                      variant='outlined'
                      {...register('email', {
                        required: true,
                        minLength: 3,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                      })}
                      error={!!errors.email}
                      helperText={errors.email ? 'Email in correct format' : ''}
                      autoComplete='off' // or "new-password"
                    />

                    <TextField
                      id='password'
                      label='Password'
                      variant='outlined'
                      type='password'
                      {...register('password', {
                        required: true,
                        minLength: 5
                      })}
                      error={!!errors.password}
                      helperText={
                        errors.password ? 'Password must be 5 characters' : ''
                      }
                      autoComplete='off' // or "new-password"
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                  </Box>
                </form>
              </div>
            </div>
          </div>
          <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
            <img
              src='https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg'
              alt=''
              className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
