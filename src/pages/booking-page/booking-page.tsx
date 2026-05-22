import {useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {AppRoute, RequestStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchQuest} from '../../store/quest-slice/quest-slice';
import {getQuest} from '../../store/quest-slice/selectors';
import {fetchBookingInfo, sendBooking} from '../../store/booking-slice/booking-slice';
import {getBookingInfo, getBookingInfoError, getBookingInfoRequestStatus,
  getSendBookingError, getSendBookingRequestStatus} from '../../store/booking-slice/selectors';
import BookingMap from '../../components/booking-map/booking-map';
import BookingSlots from '../../components/booking-slots/booking-slots';

type DateType = 'today' | 'tomorrow';

type BookingFormData = {
  contactPerson: string;
  phone: string;
  peopleCount: number;
};

function BookingPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const quest = useAppSelector(getQuest);
  const bookingInfo = useAppSelector(getBookingInfo);
  const bookingInfoRequestStatus = useAppSelector(getBookingInfoRequestStatus);
  const bookingInfoError = useAppSelector(getBookingInfoError);
  const sendBookingRequestStatus = useAppSelector(getSendBookingRequestStatus);
  const sendBookingError = useAppSelector(getSendBookingError);

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateType | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setSelectedPlaceId(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setSlotError(null);

      void dispatch(fetchQuest(id));
      void dispatch(fetchBookingInfo(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (bookingInfo.length > 0) {
      setSelectedPlaceId(bookingInfo[0].id);
    }
  }, [bookingInfo]);

  const selectedPlace = bookingInfo.find((place) => place.id === selectedPlaceId);
  const [minPeople, maxPeople] = quest?.peopleMinMax ?? [2, 10];

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<BookingFormData>({
    defaultValues: {
      contactPerson: '',
      phone: '',
      peopleCount: minPeople,
    },
  });

  const handlePlaceSelect = (placeId: string) => {
    setSelectedPlaceId(placeId);
    setSelectedDate(null);
    setSelectedTime(null);
    setSlotError(null);
  };

  const handleSlotSelect = (date: DateType, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setSlotError(null);
  };

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    if (!id || !selectedPlaceId || !selectedDate || !selectedTime) {
      setSlotError('Select place, date and time of booking');
      return;
    }

    const result = await dispatch(
      sendBooking({
        questId: id,
        placeId: selectedPlaceId,
        date: selectedDate,
        time: selectedTime,
        contactPerson: data.contactPerson,
        phone: data.phone,
        peopleCount: data.peopleCount,
      })
    );

    if (sendBooking.fulfilled.match(result)) {
      navigate(AppRoute.MyQuests);
    }
  };

  if (!id) {
    return <Navigate to={AppRoute.Root} replace />;
  }

  if (bookingInfoRequestStatus === RequestStatus.Loading) {
    return (
      <main className="page-content decorated-page">
        <div className="container container--size-s">
          <p>Loading booking info...</p>
        </div>
      </main>
    );
  }

  if (bookingInfoRequestStatus === RequestStatus.Failed) {
    return (
      <main className="page-content decorated-page">
        <div className="container container--size-s">
          <p>{bookingInfoError}</p>
        </div>
      </main>
    );
  }

  if (!selectedPlace || bookingInfo.length === 0) {
    return (
      <main className="page-content decorated-page">
        <div className="container container--size-s">
          <p>There is no available places for booking</p>
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
            srcSet={quest?.coverImgWebp}
          />
          <img
            src={quest?.coverImg}
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
            {quest?.title}
          </p>
        </div>

        <div className="page-content__item">
          <div className="booking-map">
            <BookingMap
              places={bookingInfo}
              selectedPlaceId={selectedPlace.id}
              onPlaceSelect={handlePlaceSelect}
            />

            <p className="booking-map__address">
              Вы&nbsp;выбрали: {selectedPlace.location.address}
            </p>
          </div>
        </div>

        <form
          className="booking-form"
          action="#"
          method="post"
          onSubmit={(evt) => {
            void handleSubmit(onSubmit)(evt);
          }}
        >
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>

            <BookingSlots
              title="Сегодня"
              date="today"
              slots={selectedPlace.slots.today}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSlotSelect={handleSlotSelect}
            />

            <BookingSlots
              title="Завтра"
              date="tomorrow"
              slots={selectedPlace.slots.tomorrow}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSlotSelect={handleSlotSelect}
            />
          </fieldset>

          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>

            {(slotError || errors.contactPerson || errors.phone || errors.peopleCount || sendBookingError) && (
              <div style={{color: '#f2890f', marginBottom: '20px'}}>
                {slotError && <p>{slotError}</p>}
                {errors.contactPerson && <p>{errors.contactPerson.message}</p>}
                {errors.phone && <p>{errors.phone.message}</p>}
                {errors.peopleCount && <p>{errors.peopleCount.message}</p>}
                {sendBookingError && <p>{sendBookingError}</p>}
              </div>
            )}

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">
                Ваше имя
              </label>

              <input
                id="name"
                type="text"
                placeholder="Имя"
                {...register('contactPerson', {
                  required: 'Введите имя',
                  minLength: {
                    value: 1,
                    message: 'Имя должно быть от 1 до 15 символов',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Имя должно быть от 1 до 15 символов',
                  },
                })}
              />
            </div>

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">
                Контактный телефон
              </label>

              <input
                id="tel"
                type="tel"
                placeholder="+7 (000) 000-00-00"
                {...register('phone', {
                  required: 'Введите телефон',
                  pattern: {
                    value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    message: 'Введите телефон в формате +7 (000) 000-00-00',
                  },
                })}
              />
            </div>

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">
                Количество участников
              </label>

              <input
                id="person"
                type="number"
                placeholder="Количество участников"
                {...register('peopleCount', {
                  required: 'Введите количество участников',
                  valueAsNumber: true,
                  min: {
                    value: minPeople,
                    message: `Минимум участников: ${minPeople}`,
                  },
                  max: {
                    value: maxPeople,
                    message: `Максимум участников: ${maxPeople}`,
                  },
                })}
              />
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

          <button
            className="btn btn--accent btn--cta booking-form__submit"
            type="submit"
            disabled={sendBookingRequestStatus === RequestStatus.Loading}
          >
            {sendBookingRequestStatus === RequestStatus.Loading
              ? 'Отправляем...'
              : 'Забронировать'}
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
