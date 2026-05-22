import {Slot} from '../../types/booking';

type DateType = 'today' | 'tomorrow';

type BookingSlotsProps = {
  title: string;
  date: DateType;
  slots: Slot[];
  selectedDate: DateType | null;
  selectedTime: string | null;
  onSlotSelect: (date: DateType, time: string) => void;
};

function BookingSlots({
  title,
  date,
  slots,
  selectedDate,
  selectedTime,
  onSlotSelect,
}: BookingSlotsProps): JSX.Element {
  return (
    <fieldset className="booking-form__date-section">
      <legend className="booking-form__date-title">
        {title}
      </legend>

      <div className="booking-form__date-inner-wrapper">
        {slots.map((slot) => {
          const isSelected = selectedDate === date && selectedTime === slot.time;
          const inputId = `${date}-${slot.time.replace(':', 'h')}m`;

          return (
            <label className="custom-radio booking-form__date" key={slot.time}>
              <input
                id={inputId}
                type="radio"
                name="date"
                value={`${date}-${slot.time}`}
                disabled={!slot.isAvailable}
                checked={isSelected}
                onChange={() => onSlotSelect(date, slot.time)}
              />

              <span className="custom-radio__label">
                {slot.time}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default BookingSlots;
