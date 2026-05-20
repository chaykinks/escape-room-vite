import {Link} from 'react-router-dom';
import {Quest} from '../../types/quest';

type QuestCardProps = {
  quest: Quest;
};

function QuestCard({quest}: QuestCardProps): JSX.Element {
  const [minPeople, maxPeople] = quest.peopleMinMax;

  return (
    <li>
      <Link to={`/quest/${quest.id}`}>
        <img
          src={quest.previewImg}
          srcSet={`${quest.previewImgWebp} 1x`}
          width="344"
          height="232"
          alt={quest.title}
        />

        <h3>{quest.title}</h3>

        <p>{quest.level}</p>

        <p>
          {minPeople}–{maxPeople} чел.
        </p>
      </Link>
    </li>
  );
}

export default QuestCard;
