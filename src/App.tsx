import './App.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { FC } from 'react';
import Navbar from './components/Navbar/Navbar.tsx';
import CharactersPage from './components/CharactersPage/CharactersPage.tsx';
import LocationsPage from './components/LocationsPage/LocationsPage.tsx';
import EpisodesPage from './components/EpisodesPage/EpisodesPage.tsx';
import SavedPage from './components/LikedPage/LikedPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Navbar />}
    >
      <Route
        index
        element={<CharactersPage />}
      />
      <Route
        path='/locations'
        element={<LocationsPage />}
      />
      <Route
        path='/episodes'
        element={<EpisodesPage />}
      />
      <Route
        path='/liked'
        element={<SavedPage />}
      />
    </Route>
  )
);

interface Props {}

const App: FC<Props> = () => {
  return <RouterProvider router={router} />;
};

export default App;
