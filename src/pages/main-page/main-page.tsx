import {useAppSelector} from '../../hooks';
import {RequestStatus} from '../../const';
import {getFilteredQuests, getQuestsError, getQuestsRequestStatus} from '../../store/quests-slice/selectors.ts';
import QuestTypeFilter from '../../components/quest-type-filter/quest-type-filter.tsx';
import QuestLevelFilter from '../../components/quest-level-filter/quest-level-filter.tsx';
import QuestCardList from '../../components/quest-card-list/quest-card-list.tsx';

function MainPage(): JSX.Element {
  const quests = useAppSelector(getFilteredQuests);
  const questsRequestStatus = useAppSelector(getQuestsRequestStatus);
  const questsError = useAppSelector(getQuestsError);

  if (questsRequestStatus === RequestStatus.Loading) {
    return (
      <main className="page-content">
        <div className="container">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (questsRequestStatus === RequestStatus.Failed) {
    return (
      <main className="page-content">
        <div className="container">
          <p>{questsError}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
            Выберите тематику
          </h2>
        </div>

        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <QuestTypeFilter />
            <QuestLevelFilter />
          </form>
        </div>

        <h2 className="title visually-hidden">Выберите квест</h2>

        {quests.length > 0 ? (
          <QuestCardList quests={quests} />
        ) : (
          <p>По выбранным фильтрам квесты не найдены.</p>
        )}
      </div>
    </main>
  );
}

export default MainPage;
