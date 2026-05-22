import {FormEvent} from 'react';
import Map from '../../components/map/map';

const OFFICE_COORDINATES: [number, number] = [59.968322, 30.317359];

function BookingPage(): JSX.Element {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-bg-size-m.jpg"
            srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
            width="1366"
            height="1959"
            alt=""
          />
        </picture>
      </div>

      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">
            Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">
            Маньяк
          </p>
        </div>

        <div className="page-content__item">
          <div className="booking-map">
            <div className="map">
              <Map
                center={OFFICE_COORDINATES}
                markerPosition={OFFICE_COORDINATES}
              />
            </div>

            <p className="booking-map__address">
              Вы&nbsp;выбрали: наб. реки Карповки&nbsp;5, лит&nbsp;П, м. Петроградская
            </p>
          </div>
        </div>

        <form
          className="booking-form"
          action="#"
          method="post"
          onSubmit={handleSubmit}
        >
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>

            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Сегодня</legend>

              <div className="booking-form__date-inner-wrapper">
                <label className="custom-radio booking-form__date">
                  <input id="today9h45m" name="date" required type="radio" value="today9h45m" />
                  <span className="custom-radio__label">9:45</span>
                </label>

                <label className="custom-radio booking-form__date">
                  <input id="today15h00m" name="date" required type="radio" value="today15h00m" defaultChecked />
                  <span className="custom-radio__label">15:00</span>
                </label>

                <label className="custom-radio booking-form__date">
                  <input id="today17h30m" name="date" required type="radio" value="today17h30m" />
                  <span className="custom-radio__label">17:30</span>
                </label>

                <label className="custom-radio booking-form__date">
                  <input id="today19h30m" name="date" required type="radio" value="today19h30m" disabled />
                  <span className="custom-radio__label">19:30</span>
                </label>

                <label className="custom-radio booking-form__date">
                  <input id="today21h30m" name="date" required type="radio" value="today21h30m" />
                  <span className="custom-radio__label">21:30</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Завтра</legend>

              <div className="booking-form__date-inner-wrapper">
                <label className="custom-radio booking-form__date">
                  <input id="tomorrow11h00m" name="date" required type="radio" value="tomorrow11h00m" />
                  <span className="custom-radio__label">11:00</span>
                </label>

                <label className="custom-radio booking-form__date">
                  <input id="tomorrow15h00m" name="date" required type="radio" value="tomorrow15h00m" disabled />
                  <span className="custom-radio__label">15:00</span>
                </label>

                <label className="custom-radio booking-form__date">
                  <input id="tomorrow17h30m" name="date" required type="radio" value="tomorrow17h30m" disabled />
                  <span className="custom-radio__label">17:30</span>
                </label>

                <label className="custom-radio booking-form__date">
                  <input id="tomorrow19h45m" name="date" required type="radio" value="tomorrow19h45m" />
                  <span className="custom-radio__label">19:45</span>
                </label>

                <label className="custom-radio booking-form__date">
                  <input id="tomorrow21h30m" name="date" required type="radio" value="tomorrow21h30m" />
                  <span className="custom-radio__label">21:30</span>
                </label>
              </div>
            </fieldset>
          </fieldset>

          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">Ваше имя</label>
              <input id="name" name="name" pattern="[А-Яа-яЁёA-Za-z'- ]{1,}" placeholder="Имя" required type="text" />
            </div>

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
              <input id="tel" name="tel" pattern="[0-9]{10,}" placeholder="Телефон" required type="tel" />
            </div>

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">Количество участников</label>
              <input id="person" name="person" placeholder="Количество участников" required type="number" />
            </div>

            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input id="children" name="children" type="checkbox" defaultChecked />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick" />
                </svg>
              </span>
              <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
            </label>
          </fieldset>

          <button className="btn btn--accent btn--cta booking-form__submit" type="submit">
            Забронировать
          </button>

          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input id="id-order-agreement" name="user-agreement" required type="checkbox" />
            <span className="custom-checkbox__icon">
              <svg width="20" height="17" aria-hidden="true">
                <use xlinkHref="#icon-tick" />
              </svg>
            </span>
            <span className="custom-checkbox__label">
              Я&nbsp;согласен с&nbsp;
              <a className="link link--active-silver link--underlined" href="#">
                правилами обработки персональных данных
              </a>
              &nbsp;и пользовательским соглашением
            </span>
          </label>
        </form>
      </div>
    </main>
  );
}

export default BookingPage;
