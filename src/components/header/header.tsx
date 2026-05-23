import {Link, NavLink, useLocation} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch} from '../../hooks';
import {logout} from '../../store/user-slice/user-slice';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
};

function Header({authorizationStatus}: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const isLoginPage = pathname === AppRoute.Login;

  const handleLogoutClick = () => {
    void dispatch(logout());
  };

  const getLinkClassName = ({isActive}: {isActive: boolean}) =>
    isActive ? 'link active' : 'link';

  return (
    <header className="header">
      <div className="container container--size-l">
        <Link
          className="logo header__logo"
          to={AppRoute.Root}
          aria-label="Перейти на Главную"
        >
          <svg width="134" height="52" aria-hidden="true">
            <use xlinkHref="#logo" />
          </svg>
        </Link>

        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink
                className={getLinkClassName}
                to={AppRoute.Root}
                end
              >
                Квесты
              </NavLink>
            </li>

            <li className="main-nav__item">
              <NavLink
                className={getLinkClassName}
                to={AppRoute.Contacts}
              >
                Контакты
              </NavLink>
            </li>

            {isAuth && !isLoginPage && (
              <li className="main-nav__item">
                <NavLink
                  className={getLinkClassName}
                  to={AppRoute.MyQuests}
                >
                  Мои бронирования
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="header__side-nav">
          {!isLoginPage && (
            isAuth ? (
              <button
                className="btn btn--accent header__side-item"
                type="button"
                onClick={handleLogoutClick}
              >
                Выйти
              </button>
            ) : (
              <NavLink
                className="btn header__side-item header__login-btn"
                to={AppRoute.Login}
              >
                Вход
              </NavLink>
            )
          )}

          <a
            className="link header__side-item header__phone-link"
            href="tel:88001111111"
          >
            8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
