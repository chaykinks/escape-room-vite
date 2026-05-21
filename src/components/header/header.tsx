import {Link, NavLink} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch} from '../../hooks';
import {logout} from '../../store/user-slice/user-slice';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
};

function Header({authorizationStatus}: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <Link to={AppRoute.Root}>Escape Room</Link>

        <NavLink to={AppRoute.Root}>Квесты</NavLink>
        <NavLink to={AppRoute.Contacts}>Контакты</NavLink>

        {isAuth && (
          <NavLink to={AppRoute.MyQuests}>Мои бронирования</NavLink>
        )}

        {isAuth ? (
          <button type="button" onClick={handleLogoutClick}>
            Выйти
          </button>
        ) : (
          <NavLink to={AppRoute.Login}>Войти</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
