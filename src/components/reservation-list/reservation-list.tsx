import {Reservation} from '../../types/reservation';
import ReservationCard from '../reservation-card/reservation-card';

type ReservationListProps = {
  reservations: Reservation[];
  onCancelClick: (reservationId: string) => void;
};

function ReservationList({
  reservations,
  onCancelClick,
}: ReservationListProps): JSX.Element {
  return (
    <ul>
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onCancelClick={onCancelClick}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
