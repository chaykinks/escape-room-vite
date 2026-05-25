import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div style={{padding: '40px', textAlign: 'center'}}>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Root}>Вернуться на Главную страницу</Link>
    </div>
  );
}

export default NotFoundPage;
