import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import BookingPage from '../../pages/booking-page/booking-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {useEffect} from 'react';
import {checkAuth} from '../../store/user-slice/user-slice';
import {fetchQuests} from '../../store/quests-slice/quests-slice';
import {useAppDispatch} from '../../hooks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkAuth());
    void dispatch(fetchQuests());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout/>}>
          <Route index element={<MainPage/>}/>

          <Route path={AppRoute.Quest} element={<QuestPage/>}/>

          <Route path={AppRoute.Contacts} element={<ContactsPage/>}/>

          <Route
            path={AppRoute.Login}
            element={(
              <PrivateRoute isReverse>
                <LoginPage/>
              </PrivateRoute>
            )}
          />

          <Route
            path={AppRoute.Booking}
            element={
              <PrivateRoute>
                <BookingPage/>
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.MyQuests}
            element={
              <PrivateRoute>
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
