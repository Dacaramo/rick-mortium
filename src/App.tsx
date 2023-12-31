import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import CharactersPage from './components/pages/CharactersPage/CharactersPage.tsx';
import EpisodesPage from './components/pages/EpisodesPage/EpisodesPage.tsx';
import ErrorPage from './components/pages/ErrorPage/ErrorPage.tsx';
import ItemPage from './components/pages/ItemPage/ItemPage.tsx';
import SavedPage from './components/pages/LikedPage/LikedPage.tsx';
import LocationsPage from './components/pages/LocationsPage/LocationsPage.tsx';
import Navbar from './components/Root/Root.tsx';

import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/rick-mortium'
      element={<Navbar />}
    >
      <Route
        index
        element={<CharactersPage />}
      />
      <Route
        path='/rick-mortium/locations'
        element={<LocationsPage />}
      />
      <Route
        path='/rick-mortium/episodes'
        element={<EpisodesPage />}
      />
      <Route
        path='/rick-mortium/liked'
        element={<SavedPage />}
      />
      <Route
        path='/rick-mortium/items/:key'
        element={<ItemPage />}
      />
      <Route
        path='/rick-mortium/*'
        element={<ErrorPage />}
      />
    </Route>
  )
);

interface Props {}

const App: FC<Props> = () => {
  return <RouterProvider router={router} />;
};

export default App;
