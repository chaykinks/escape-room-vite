import {Link} from 'react-router-dom';
import {AppRoute, QUEST_LEVEL_NAME} from '../../const';
import {Quest} from '../../types/quest';

type QuestCardProps = {
  quest: Quest;
};

function QuestCard({quest}: QuestCardProps): JSX.Element {
  const [minPeople, maxPeople] = quest.peopleMinMax;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={quest.previewImgWebp}
          />
          <img
            src={quest.previewImg}
            width="344"
            height="232"
            alt={quest.title}
          />
        </picture>
      </div>

      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={AppRoute.Quest.replace(':id', quest.id)}
          >
            {quest.title}
          </Link>
        </div>

        <ul className="tags quest-card__tags">
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
      </div>
    </div>
  );
}

export default QuestCard;
