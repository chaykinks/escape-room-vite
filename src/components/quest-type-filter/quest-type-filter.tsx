import {QUEST_TYPE_NAME, QUEST_TYPES, QuestType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeType} from '../../store/quests-slice/quests-slice';
import {getActiveType} from '../../store/quests-slice/selectors';

const QUEST_TYPE_ICONS: Record<QuestType, string> = {
  all: 'icon-all-quests',
  adventures: 'icon-adventure',
  horror: 'icon-horror',
  mystic: 'icon-mystic',
  detective: 'icon-detective',
  'sci-fi': 'icon-sci-fi',
};

function QuestTypeFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeType = useAppSelector(getActiveType);

  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">
        Тематика
      </legend>

      <ul className="filter__list">
        {QUEST_TYPES.map((type) => (
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
              <svg
                className="filter__icon"
                width="26"
                height="30"
                aria-hidden="true"
              >
                <use xlinkHref={`#${QUEST_TYPE_ICONS[type]}`} />
              </svg>

              <span className="filter__label-text">
                {QUEST_TYPE_NAME[type]}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default QuestTypeFilter;
