import {Navigate, useLocation} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute({
  authorizationStatus,
  children,
}: PrivateRouteProps): JSX.Element {
  const location = useLocation();

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
