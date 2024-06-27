import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import LoadingPage from '@/components/ui/loading/LoadingPage';
import { router } from '@/routes/router';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} fallbackElement={<LoadingPage />} />
);
