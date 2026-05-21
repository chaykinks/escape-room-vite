import {useEffect} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {AppRoute, RequestStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getQuest, getQuestRequestStatus} from '../../store/quest-slice/selectors';
import {fetchQuest} from '../../store/quest-slice/quest-slice';

function QuestPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuest);
  const questRequestStatus = useAppSelector(getQuestRequestStatus);

  useEffect(() => {
    if (id) {
      void dispatch(fetchQuest(id));
    }
  }, [dispatch, id]);

  if (questRequestStatus === RequestStatus.Loading) {
    return (
      <main className="decorated-page quest-page">
        <div className="container container--size-l">
          <p>Загрузка квеста...</p>
        </div>
      </main>
    );
  }

  if (questRequestStatus === RequestStatus.Failed) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (!quest) {
    return (
      <main className="decorated-page quest-page">
        <div className="container container--size-l">
          <p>Квест не найден</p>
        </div>
      </main>
    );
  }

  const [minPeople, maxPeople] = quest.peopleMinMax;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={quest.coverImgWebp}
          />
          <img
            src={quest.coverImg}
            width="1366"
            height="768"
            alt=""
          />
        </picture>
      </div>

      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {quest.title}
          </h1>

          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>
            {quest.type}
          </p>

          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>
              {minPeople}–{maxPeople}&nbsp;чел
            </li>

            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>
              {quest.level}
            </li>
          </ul>

          <p className="quest-page__description">
            {quest.description}
          </p>

          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={AppRoute.Booking.replace(':id', quest.id)}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
}

export default QuestPage;
