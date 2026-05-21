import Map from '../../components/map/map';

const OFFICE_COORDINATES: [number, number] = [59.968322, 30.317359];

function ContactsPage(): JSX.Element {
  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-bg-size-m.webp"
          />
          <img
            src="img/content/maniac/maniac-bg-size-m.jpg"
            width="1366"
            height="768"
            alt=""
          />
        </picture>
      </div>

      <div className="container container--size-l">
        <div className="contacts">
          <div className="contacts__content">
            <h1 className="title title--size-m contacts__title">
              Контакты
            </h1>

            <div className="contacts__info">
              <p className="contacts__info-title">Адрес</p>
              <address className="contacts__info-text">
                Санкт-Петербург,<br />
                Набережная реки Карповки, д 5
              </address>

              <p className="contacts__info-title">Режим работы</p>
              <p className="contacts__info-text">
                Ежедневно, 10:00–22:00
              </p>

              <p className="contacts__info-title">Телефон</p>
              <a className="contacts__info-text" href="tel:88003335599">
                8 (800) 333-55-99
              </a>
            </div>
          </div>

          <div className="contacts__map">
            <Map
              center={OFFICE_COORDINATES}
              markerPosition={OFFICE_COORDINATES}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactsPage;
