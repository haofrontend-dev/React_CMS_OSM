import Car from '@/assets/images/car.gif';
import React from 'react';

const LoadingPage = React.memo(() => {
  return (
    <React.Fragment>
      <div className='flex justify-center items-center w-full h-full'>
        <img src={Car} alt='car' />
      </div>
    </React.Fragment>
  );
});

export default LoadingPage;
