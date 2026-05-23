import {Outlet} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {useAppSelector} from '../../hooks';

function Layout(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);

  return (
    <>
      <Header authorizationStatus={authorizationStatus} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
