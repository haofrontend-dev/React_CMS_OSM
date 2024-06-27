// hoc/withSuspense.js
import LoadingPage from '@/components/ui/loading/LoadingPage';
import PropTypes from 'prop-types'; // Thêm thư viện PropTypes
import React from 'react';

const withSuspense = (Component, fallback = <LoadingPage />) => {
  const MemoizedComponent = React.memo(Component); // Sử dụng React.memo

  const SuspenseComponent = props => {
    console.log('withSuspense', props);
    return (
      <React.Suspense fallback={fallback}>
        <MemoizedComponent {...props} />
      </React.Suspense>
    );
  };

  SuspenseComponent.propTypes = {
    fallback: PropTypes.element,
    Component: PropTypes.elementType.isRequired
  };

  return SuspenseComponent;
};

export default withSuspense;
