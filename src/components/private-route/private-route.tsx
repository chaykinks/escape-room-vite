import {Navigate, useLocation} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-slice/selectors';

type PrivateRouteProps = {
  isReverse?: boolean;
  children: JSX.Element;
};

function PrivateRoute({
  isReverse = false,
  children,
}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <main>
        <p>Провереям авторизацию...</p>
      </main>
    );
  }

  if (isReverse && authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} replace />;
  }

  if (!isReverse && authorizationStatus === AuthorizationStatus.NoAuth) {
    return (
      <Navigate
        to={AppRoute.Login}
        state={{redirectPath: location}}
        replace
      />
    );
  }

  return children;
}

export default PrivateRoute;
