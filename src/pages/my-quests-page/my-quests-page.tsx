import {useEffect} from 'react';
import {RequestStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {deleteReservation, fetchReservations} from '../../store/reservations-slice/reservations-slice';
import {getDeleteReservationError, getReservations, getReservationsError,
  getReservationsRequestStatus} from '../../store/reservations-slice/selectors';
import ReservationList from '../../components/reservation-list/reservation-list';

function MyQuestsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector(getReservations);
  const reservationsRequestStatus = useAppSelector(getReservationsRequestStatus);
  const reservationsError = useAppSelector(getReservationsError);
  const deleteReservationError = useAppSelector(getDeleteReservationError);

  useEffect(() => {
    void dispatch(fetchReservations());
  }, [dispatch]);

  const handleCancelClick = (reservationId: string) => {
    void dispatch(deleteReservation(reservationId));
  };

  if (reservationsRequestStatus === RequestStatus.Loading) {
    return (
      <main className="page-content decorated-page">
        <div className="container">
          <p>Загрузка бронирований...</p>
        </div>
      </main>
    );
  }

  if (reservationsRequestStatus === RequestStatus.Failed) {
    return (
      <main className="page-content decorated-page">
        <div className="container">
          <p>{reservationsError}</p>
        </div>
      </main>
    );
  }

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

      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">
            Мои бронирования
          </h1>
        </div>

        {deleteReservationError && (
          <p style={{color: '#f2890f'}}>{deleteReservationError}</p>
        )}

        {reservations.length > 0 ? (
          <ReservationList
            reservations={reservations}
            onCancelClick={handleCancelClick}
          />
        ) : (
          <p>У вас пока нет забронированных квестов.</p>
        )}
      </div>
    </main>
  );
}

export default MyQuestsPage;
