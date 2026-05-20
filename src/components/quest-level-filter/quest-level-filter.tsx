import {QuestLevelName, QuestLevels} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeLevel} from '../../store/quests-slice/quests-slice';
import {getActiveLevel} from '../../store/quests-slice/selectors';

function QuestLevelFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeLevel = useAppSelector(getActiveLevel);

  return (
    <ul>
      {QuestLevels.map((level) => (
        <li key={level}>
          <button
            type="button"
            className={activeLevel === level ? 'active' : ''}
            onClick={() => dispatch(changeLevel(level))}
          >
            {QuestLevelName[level]}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default QuestLevelFilter;
