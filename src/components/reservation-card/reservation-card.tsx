import {Link} from 'react-router-dom';
import {Reservation} from '../../types/reservation';

type ReservationCardProps = {
  reservation: Reservation;
  onCancelClick: (reservationId: string) => void;
};

function ReservationCard({
  reservation,
  onCancelClick,
}: ReservationCardProps): JSX.Element {
  const [minPeople, maxPeople] = reservation.quest.peopleMinMax;

  return (
    <li>
      <Link to={`/quest/${reservation.quest.id}`}>
        <img
          src={reservation.quest.previewImg}
          srcSet={`${reservation.quest.previewImgWebp} 1x`}
          width="344"
          height="232"
          alt={reservation.quest.title}
        />

        <h3>{reservation.quest.title}</h3>
      </Link>

      <p>{reservation.quest.level}</p>
      <p>
        {minPeople}–{maxPeople} чел.
      </p>

      <p>Адрес: {reservation.location.address}</p>
      <p>Дата: {reservation.date}</p>
      <p>Время: {reservation.time}</p>
      <p>Участников: {reservation.peopleCount}</p>

      <button
        type="button"
        onClick={() => onCancelClick(reservation.id)}
      >
        Отменить
      </button>
    </li>
  );
}

export default ReservationCard;
