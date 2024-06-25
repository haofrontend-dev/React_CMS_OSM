import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

import useRouteTitle from '@/hooks/useRouteTitle';
import DocumentTitle from '@/layouts/helmet/DocumentTitle';
import { store } from '@/states/store';
import ThemeProvider from './theme';

const App = () => {
  const title = useRouteTitle();
  return (
    <Provider store={store}>
      <ThemeProvider>
      <HelmetProvider>
        <DocumentTitle title={title} />
        <Outlet />
      </HelmetProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
