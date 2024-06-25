import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { loginUser } from '@/features/auth/authThunk';
import useAppSelector from '@/hooks/useAppSelector';
import { setItem } from '@/utils';
import { USER_KEYS } from '@/configs';
import {
  Box,
  Button,
  TextField
} from '@mui/material';

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
      setItem(USER_KEYS.USER_TOKEN, dataAuth);
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
                      id='identifier'
                      label='Email or username'
                      variant='outlined'
                      {...register('identifier', {
                        required: true,
                        minLength: 3,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                      })}
                      error={!!errors.identifier}
                      helperText={
                        errors.identifier ? 'Email in correct format' : ''
                      }
                      autoComplete='off' // or "new-password"
                    />

                    <TextField
                      id='password'
                      label='Password'
                      variant='outlined'
                      type='password'
                      {...register('password', {
                        required: true,
                        minLength: 5,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                      })}
                      error={!!errors.password}
                      helperText={
                        errors.password ? 'Min 5, uppercase, lowercase, number, symbol' : ''
                      }
                      autoComplete='off' // or "new-password"
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      isLoading={true}
                      disabled={isLoading}
                    >
                      { isLoading ? 'Loading...' : 'Login' }
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
