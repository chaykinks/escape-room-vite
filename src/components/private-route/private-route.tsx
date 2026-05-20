import {Navigate, useLocation} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const location = useLocation();
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <p>Loading...</p>;
  }

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <Navigate
        to={AppRoute.Login}
        state={{from: location}}
        replace
      />
    );
  }

  return children;
}

export default PrivateRoute;
