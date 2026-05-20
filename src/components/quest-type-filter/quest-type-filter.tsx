import {QuestTypeName, QuestTypes} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeType} from '../../store/quests-slice/quests-slice';
import {getActiveType} from '../../store/quests-slice/selectors';

function QuestTypeFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeType = useAppSelector(getActiveType);

  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">
        Тематика
      </legend>

      <ul className="filter__list">
        {QuestTypes.map((type) => (
          <li className="filter__item" key={type}>
            <input
              type="radio"
              name="type"
              id={type}
              checked={activeType === type}
              onChange={() => dispatch(changeType(type))}
            />

            <label
              className="filter__label"
              htmlFor={type}
            >
              <span className="filter__label-text">
                {QuestTypeName[type]}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default QuestTypeFilter;
