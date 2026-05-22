import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Reservation} from '../../types/reservation';

type ReservationCardProps = {
  reservation: Reservation;
  onCancelClick: (reservationId: string) => void;
};

function ReservationCard({
  reservation,
  onCancelClick,
}: ReservationCardProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={reservation.quest.previewImgWebp}
          />
          <img
            src={reservation.quest.previewImg}
            width="344"
            height="232"
            alt={reservation.quest.title}
          />
        </picture>
      </div>

      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={AppRoute.Quest.replace(':id', reservation.quest.id)}
          >
            {reservation.quest.title}
          </Link>

          <span className="quest-card__info">
            [{reservation.date},&nbsp;{reservation.time}. {reservation.location.address}]
          </span>
        </div>

        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {reservation.peopleCount}&nbsp;чел
          </li>

          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {reservation.quest.level}
          </li>
        </ul>

        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
          onClick={() => onCancelClick(reservation.id)}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;
