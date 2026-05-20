import {RequestStatus} from '../../const';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

function MainPage(): JSX.Element {
  const quests = useSelector((state: RootState) => state.QUESTS.quests);
  const questsRequestStatus = useSelector((state: RootState) => state.QUESTS.questsRequestStatus);
  const questsError = useSelector((state: RootState) => state.QUESTS.questsError);

  if (questsRequestStatus === RequestStatus.Loading) {
    return <main><p>Loading...</p></main>;
  }

  if (questsRequestStatus === RequestStatus.Failed) {
    return <main><p>{questsError}</p></main>;
  }

  return (
    <main>
      <h1>Каталог квестов</h1>

      <ul>
        {quests.map((quest) => (
          <li key={quest.id}>
            {quest.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default MainPage;
