import {QuestTypeName, QuestTypes} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeType} from '../../store/quests-slice/quests-slice';
import {getActiveType} from '../../store/quests-slice/selectors';

function QuestTypeFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeType = useAppSelector(getActiveType);

  return (
    <ul>
      {QuestTypes.map((type) => (
        <li key={type}>
          <button
            type="button"
            className={activeType === type ? 'active' : ''}
            onClick={() => dispatch(changeType(type))}
          >
            {QuestTypeName[type]}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default QuestTypeFilter;
