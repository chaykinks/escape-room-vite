import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import BookingPage from '../../pages/booking-page/booking-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function App(): JSX.Element {
  const authorizationStatus = AuthorizationStatus.NoAuth;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout/>}>
          <Route index element={<MainPage/>}/>

          <Route path={AppRoute.Quest} element={<QuestPage/>}/>

          <Route path={AppRoute.Contacts} element={<ContactsPage/>}/>

          <Route path={AppRoute.Login} element={<LoginPage/>}/>

          <Route
            path={AppRoute.Booking}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <BookingPage/>
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.MyQuests}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyQuestsPage/>
              </PrivateRoute>
            }
          />

          <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
