import {Outlet} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {useAppSelector} from '../../hooks';

function Layout(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header authorizationStatus={authorizationStatus} />

      <div style={{flexGrow: 1}}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
