import { Outlet } from 'react-router-dom';
import Header from '../header';

function Layout() {
  return (
    <>
      <Header data-testid="header-component" />
      <Outlet />
    </>
  );
}

export default Layout;
