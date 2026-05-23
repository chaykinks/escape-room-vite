import {QUEST_LEVEL_NAME, QUEST_LEVELS} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeLevel} from '../../store/quests-slice/quests-slice';
import {getActiveLevel} from '../../store/quests-slice/selectors';

function QuestLevelFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeLevel = useAppSelector(getActiveLevel);

  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">
        Сложность
      </legend>

      <ul className="filter__list">
        {QUEST_LEVELS.map((level) => (
          <li className="filter__item" key={level}>
            <input
              type="radio"
              name="level"
              id={level}
              checked={activeLevel === level}
              onChange={() => dispatch(changeLevel(level))}
            />

            <label
              className="filter__label"
              htmlFor={level}
            >
              <span className="filter__label-text">
                {QUEST_LEVEL_NAME[level]}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default QuestLevelFilter;
