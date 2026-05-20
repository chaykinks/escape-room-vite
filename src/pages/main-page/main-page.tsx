import {useAppSelector} from '../../hooks';
import {RequestStatus} from '../../const';

function MainPage(): JSX.Element {
  const quests = useAppSelector((state) => state.QUESTS.quests);
  const questsRequestStatus = useAppSelector((state) => state.QUESTS.questsRequestStatus);
  const questsError = useAppSelector((state) => state.QUESTS.questsError);

  if (questsRequestStatus === RequestStatus.Loading) {
    return <main><p>Loading...</p></main>;
  }

  if (questsRequestStatus === RequestStatus.Failed) {
    return <main><p>{questsError}</p></main>;
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
            <fieldset className="filter__section">
              <legend className="visually-hidden">Тематика</legend>

              <ul className="filter__list">
                <li className="filter__item">
                  <input type="radio" name="type" id="all" defaultChecked />

                  <label className="filter__label" htmlFor="all">
                    <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                      <use xlinkHref="#icon-all-quests"></use>
                    </svg>

                    <span className="filter__label-text">Все квесты</span>
                  </label>
                </li>

                <li className="filter__item">
                  <input type="radio" name="type" id="adventure" />

                  <label className="filter__label" htmlFor="adventure">
                    <svg className="filter__icon" width="36" height="30" aria-hidden="true">
                      <use xlinkHref="#icon-adventure"></use>
                    </svg>

                    <span className="filter__label-text">Приключения</span>
                  </label>
                </li>
              </ul>
            </fieldset>
          </form>
        </div>

        <h2 className="title visually-hidden">Выберите квест</h2>

        <div className="cards-grid">
          {quests.map((quest) => (
            <div className="quest-card" key={quest.id}>
              <div className="quest-card__img">
                <img
                  src={quest.previewImg}
                  alt={quest.title}
                />
              </div>

              <div className="quest-card__content">
                <div className="quest-card__info-wrapper">
                  <div className="quest-card__type">
                    {quest.type}
                  </div>

                  <div className="quest-card__level">
                    {quest.level}
                  </div>
                </div>

                <h3 className="quest-card__title">
                  {quest.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default MainPage;
