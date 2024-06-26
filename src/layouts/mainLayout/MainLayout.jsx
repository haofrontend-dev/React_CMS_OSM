import React from 'react';

import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/routes/lazyLoader';
import MainWrapper from '@/layouts/common/MainWraper';
import Sidebar from '../sidebar/Sidebar';
import PageWrapper from '../common/PageWrapper';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getProfileAll } from '@/features/profiles/profilesThunk';

const MainLayout = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProfileAll());
  }, []);

  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <React.Fragment>
      <MainWrapper>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setSidebarOpen(false)}
          onMobileSidebarOpen={() => setMobileSidebarOpen(true)}
        />
        <PageWrapper>
          <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />

          <Container
            sx={{
              paddingTop: '20px',
              maxWidth: '2000px'
            }}
            maxWidth={false}
          >
            <main>
              <Outlet />
            </main>
          </Container>
        </PageWrapper>
      </MainWrapper>
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
