import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearAuthError, login} from '../../store/user-slice/user-slice';
import {getAuthError} from '../../store/user-slice/selectors';
import {AuthData} from '../../types/user';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authError = useAppSelector(getAuthError);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<AuthData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<AuthData> = async (data) => {
    dispatch(clearAuthError());

    try {
      await dispatch(login(data)).unwrap();
      navigate(AppRoute.Root);
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

              {(errors.email || errors.password || authError) && (
                <div style={{color: '#f2890f', marginTop: '10px'}}>
                  {errors.email && <p>{errors.email.message}</p>}
                  {errors.password && <p>{errors.password.message}</p>}
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
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
