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
    <fieldset>
      <legend>{title}</legend>

      {slots.map((slot) => {
        const isSelected =
          selectedDate === date && selectedTime === slot.time;

        return (
          <label key={slot.time}>
            <input
              type="radio"
              name="time"
              value={`${date}-${slot.time}`}
              disabled={!slot.isAvailable}
              checked={isSelected}
              onChange={() => onSlotSelect(date, slot.time)}
            />
            <span>
              {slot.time}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

export default BookingSlots;
