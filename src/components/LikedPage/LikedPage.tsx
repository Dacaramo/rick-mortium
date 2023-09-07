import { FC } from 'react';

import { useStore } from '../../zustand/store';
import ListItem from '../ListItem/ListItem';

interface Props {}

const SavedPage: FC<Props> = () => {
  const [characters, locations, episodes] = useStore((state) => {
    return [state.characters, state.locations, state.episodes];
  });

  const savedItemWidth = 275;

  return (
    <div className='w-[100%] p-5 flex flex-col justify-start items-start'>
      <section className='w-[100%] flex flex-col justify-start items-start'>
        <h1 className='text-4xl font-dhand text-amber-500'>Liked characters</h1>
        {characters.length > 0 ? (
          <ul className='w-[100%] py-5 gap-5 flex flex-row overflow-x-auto justify-start items-stretch'>
            {characters.map((character) => {
              return (
                <ListItem
                  key={character.id}
                  item={character}
                  type='character'
                  width={savedItemWidth}
                />
              );
            })}
          </ul>
        ) : (
          <p className='font-dhand text-xl text-amber-200'>
            {"You haven't liked any character yet"}
          </p>
        )}
      </section>
      <section className='w-[100%] flex flex-col justify-start items-start'>
        <h1 className='text-4xl font-dhand text-amber-500'>Liked locations</h1>
        {locations.length > 0 ? (
          <ul className='w-[100%] py-5 gap-5 flex flex-row overflow-x-auto justify-start items-stretch'>
            {locations.map((location) => {
              return (
                <ListItem
                  key={location.id}
                  item={location}
                  type='location'
                  width={savedItemWidth}
                />
              );
            })}
          </ul>
        ) : (
          <p className='font-dhand text-xl text-amber-200'>
            {"You haven't liked any locations yet"}
          </p>
        )}
      </section>
      <section className='w-[100%] flex flex-col justify-start items-start'>
        <h1 className='text-4xl font-dhand text-amber-500'>Liked episodes</h1>
        {episodes.length > 0 ? (
          <ul className='w-[100%] py-5 gap-5 flex flex-row overflow-x-auto justify-start items-stretch'>
            {episodes.map((episode) => {
              return (
                <ListItem
                  key={episode.id}
                  item={episode}
                  type='episode'
                  width={savedItemWidth}
                />
              );
            })}
          </ul>
        ) : (
          <p className='font-dhand text-xl text-amber-200'>
            {"You haven't liked any episodes yet"}
          </p>
        )}
      </section>
    </div>
  );
};

export default SavedPage;
