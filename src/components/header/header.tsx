import {Link, NavLink} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
};

function Header({authorizationStatus}: HeaderProps): JSX.Element {
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

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
          <button type="button">Выйти</button>
        ) : (
          <NavLink to={AppRoute.Login}>Войти</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
