import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AppRoute, QUEST_LEVEL_NAME, QUEST_TYPE_NAME, RequestStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getQuest, getQuestRequestStatus} from '../../store/quest-slice/selectors';
import {fetchQuest} from '../../store/quest-slice/quest-slice';
import NotFoundPage from '../not-found-page/not-found-page';

function getSizeMImage(image: string): string {
  return image
    .replace('@2x.jpg', '-size-m.jpg')
    .replace('@2x.webp', '-size-m.webp');
}

function getSizeMImage2x(image: string): string {
  return image
    .replace('@2x.jpg', '-size-m@2x.jpg')
    .replace('@2x.webp', '-size-m@2x.webp');
}

function QuestPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuest);
  const questRequestStatus = useAppSelector(getQuestRequestStatus);
  const [isDefaultCover, setIsDefaultCover] = useState(false);

  useEffect(() => {
    if (id) {
      void dispatch(fetchQuest(id));
      setIsDefaultCover(false);
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
    return <NotFoundPage />;
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

  const coverImg = isDefaultCover ? quest.coverImg : getSizeMImage(quest.coverImg);
  const coverImg2x = isDefaultCover ? quest.coverImg : getSizeMImage2x(quest.coverImg);

  const coverImgWebp = isDefaultCover
    ? quest.coverImgWebp
    : getSizeMImage(quest.coverImgWebp);

  const coverImgWebp2x = isDefaultCover
    ? quest.coverImgWebp
    : getSizeMImage2x(quest.coverImgWebp);

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`${coverImgWebp}, ${coverImgWebp2x} 2x`}
          />

          <img
            src={coverImg}
            srcSet={`${coverImg2x} 2x`}
            width="1366"
            height="768"
            alt=""
            onError={() => {
              setIsDefaultCover(true);
            }}
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
            {QUEST_TYPE_NAME[quest.type]}
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
              {QUEST_LEVEL_NAME[quest.level]}
            </li>
          </ul>

          <p className="quest-page__description">{quest.description}</p>

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
