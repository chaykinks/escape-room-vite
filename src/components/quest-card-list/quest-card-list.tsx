import {Quest} from '../../types/quest';
import QuestCard from '../quest-card/quest-card';

type QuestCardListProps = {
  quests: Quest[];
};

function QuestCardList({quests}: QuestCardListProps): JSX.Element {
  return (
    <div className="cards-grid">
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} />
      ))}
    </div>
  );
}

export default QuestCardList;
