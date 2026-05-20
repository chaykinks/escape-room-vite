import {Outlet} from 'react-router-dom';
import Header from '../header/header';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

function Layout(): JSX.Element {
  const authorizationStatus = useSelector((state: RootState) => state.USER.authorizationStatus);

  return (
    <>
      <Header authorizationStatus={authorizationStatus} />
      <Outlet />
    </>
  );
}

export default Layout;
