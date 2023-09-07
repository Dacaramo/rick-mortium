import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Character } from '../../model/Character';
import { Episode } from '../../model/Episode';
import { Item, ItemType } from '../../model/Item';
import { Location } from '../../model/Location';

interface LocationState {
  item: Item;
  type: ItemType;
}

interface Props {}

const CharacterPage: FC<Props> = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const pClasses = 'font-dhand text-3xl text-stone-950';

  return (
    <section className='p-5 flex flex-row flex-wrap gap-5 justify-start items-center bg-amber-500'>
      {state.type === 'character' && (
        <img
          className='rounded-xl'
          src={(state.item as Character).image}
        />
      )}
      <div>
        <p className={`${pClasses}`}>
          <b>Name: </b>
          {state.item.name}
        </p>
        {state.type === 'character' && (
          <>
            <p className={`${pClasses}`}>
              <b>Status: </b>
              {(state.item as Character).status}
            </p>
            <p className={`${pClasses}`}>
              <b>Species: </b>
              {(state.item as Character).species}
            </p>
            <p className={`${pClasses}`}>
              <b>Type: </b>
              {(state.item as Character).type || 'N/A'}
            </p>
            <p className={`${pClasses}`}>
              <b>Gender: </b>
              {(state.item as Character).gender}
            </p>
            <p className={`${pClasses}`}>
              <b>Origin: </b>
              {(state.item as Character).origin.name}
            </p>
            <p className={`${pClasses}`}>
              <b>Last known location: </b>
              {(state.item as Character).location.name}
            </p>
          </>
        )}
        {state.type === 'location' && (
          <>
            <p className={`${pClasses}`}>
              <b>Type: </b>
              {(state.item as Location).type}
            </p>
            <p className={`${pClasses}`}>
              <b>Dimension: </b>
              {(state.item as Location).dimension}
            </p>
          </>
        )}
        {state.type === 'episode' && (
          <>
            <p className={`${pClasses}`}>
              <b>First emission: </b>
              {(state.item as Episode).airDate}
            </p>
            <p className={`${pClasses}`}>
              <b>Episode code: </b>
              {(state.item as Episode).episode}
            </p>
          </>
        )}
        <p className={`${pClasses}`}>
          <b>Item id: </b>
          {state.item.id}
        </p>
        <p className={`${pClasses}`}>
          <b>Creation date: </b>
          {state.item.created}
        </p>
      </div>
    </section>
  );
};

export default CharacterPage;
