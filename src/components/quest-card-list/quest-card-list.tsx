import {Quest} from '../../types/quest';
import QuestCard from '../quest-card/quest-card';

type QuestListProps = {
  quests: Quest[];
};

function QuestList({quests}: QuestListProps): JSX.Element {
  return (
    <ul>
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} />
      ))}
    </ul>
  );
}

export default QuestList;
