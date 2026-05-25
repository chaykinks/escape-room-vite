import {SubmitHandler, useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearAuthError, login} from '../../store/user-slice/user-slice';
import {getAuthError} from '../../store/user-slice/selectors';
import {AuthData} from '../../types/user';

type LoginFormData = AuthData & {
  agreement: boolean;
};

type RedirectLocationState = {
  redirectPath?: {
    pathname: string;
    search: string;
    hash: string;
  };
};

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authError = useAppSelector(getAuthError);

  const locationState = location.state as RedirectLocationState | null;
  const redirectPath = locationState?.redirectPath
    ? `${locationState.redirectPath.pathname}${locationState.redirectPath.search}${locationState.redirectPath.hash}`
    : AppRoute.Root;

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      agreement: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    dispatch(clearAuthError());

    try {
      await dispatch(login({email: data.email, password: data.password})).unwrap();
      navigate(redirectPath, {replace: true});
    } catch (error) {
      void error;
    }
  };

  return (
    <main className="decorated-page login">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-size-m.jpg"
            srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
            width="1366"
            height="768"
            alt=""
          />
        </picture>
      </div>

      <div className="container container--size-l">
        <div className="login__form">
          <form
            className="login-form"
            action="#"
            method="post"
            onSubmit={(evt) => {
              void handleSubmit(onSubmit)(evt);
            }}
          >
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>

              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">
                    E&nbsp;&ndash;&nbsp;mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Адрес электронной почты"
                    {...register('email', {
                      required: 'Введите email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Введите корректный email',
                      },
                      onChange: () => dispatch(clearAuthError()),
                    })}
                  />
                </div>

                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    {...register('password', {
                      required: 'Введите пароль',
                      minLength: {
                        value: 3,
                        message: 'Пароль должен быть от 3 до 15 символов',
                      },
                      maxLength: {
                        value: 15,
                        message: 'Пароль должен быть от 3 до 15 символов',
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-zА-Яа-я])(?=.*\d).+$/,
                        message: 'Пароль должен содержать минимум одну букву и одну цифру',
                      },
                      onChange: () => dispatch(clearAuthError()),
                    })}
                  />
                </div>
              </div>

              {(errors.email || errors.password || errors.agreement || authError) && (
                <div style={{color: '#f2890f', marginTop: '10px'}}>
                  {errors.email && <p>{errors.email.message}</p>}
                  {errors.password && <p>{errors.password.message}</p>}
                  {errors.agreement && <p>{errors.agreement.message}</p>}
                  {authError && <p>{authError}</p>}
                </div>
              )}

              <button
                className="btn btn--accent btn--general login-form__submit"
                type="submit"
              >
                Войти
              </button>
            </div>

            <label className="custom-checkbox login-form__checkbox">
              <input
                type="checkbox"
                {...register('agreement', {
                  required: 'Необходимо согласиться с пользовательским соглашением',
                })}
              />

              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick" />
                </svg>
              </span>

              <span className="custom-checkbox__label">
                Я&nbsp;согласен с&nbsp;
                <a
                  className="link link--active-silver link--underlined"
                  href="/documents/personal-data-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                правилами обработки персональных данных
              </a>
                &nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
