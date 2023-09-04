import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { Character } from '../../model/Character';
import { Location } from '../../model/Location';
import { Episode } from '../../model/Episode';
import { Item, ItemType } from '../../model/Item';
import { DROP_SHADOW_CLASSES } from '../../constants/tailwindClasses';
import { useStore } from '../../zustand/store';
import FilledHearthIcon from '../FilledHearthIcon/FilledHearthIcon';
import HollowHearthIcon from '../HollowHearthIcon/HollowHearthIcon';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: Item;
  type: ItemType;
  width?: number;
  height?: number;
}

const ListItem: FC<Props> = ({ item, type, width, height }) => {
  const iconColor = '#e11d48';
  const iconSize = 25;

  const [
    characters,
    locations,
    episodes,
    saveCharacter,
    removeSavedCharacter,
    saveLocation,
    removeSavedLocation,
    saveEpisode,
    removeSavedEpisode,
  ] = useStore((state) => {
    return [
      state.characters,
      state.locations,
      state.episodes,
      state.saveCharacter,
      state.removeSavedCharacter,
      state.saveLocation,
      state.removeSavedLocation,
      state.saveEpisode,
      state.removeSavedEpisode,
    ];
  });
  const navigate = useNavigate();

  const handleClickOnHearth = (e: ReactMouseEvent) => {
    e.stopPropagation();

    switch (type) {
      case 'character':
        {
          const characterIndex = characters.findIndex((character) => {
            return character.id === item.id;
          });
          if (characterIndex === -1) {
            saveCharacter(item as Character);
          } else {
            removeSavedCharacter(characterIndex);
          }
        }
        break;
      case 'location':
        {
          const locationIndex = locations.findIndex((location) => {
            return location.id === item.id;
          });
          if (locationIndex === -1) {
            saveLocation(item as Location);
          } else {
            removeSavedLocation(locationIndex);
          }
        }
        break;
      case 'episode':
        {
          const episodeIndex = episodes.findIndex((episode) => {
            return episode.id === item.id;
          });
          if (episodeIndex === -1) {
            saveEpisode(item as Episode);
          } else {
            removeSavedEpisode(episodeIndex);
          }
        }
        break;
    }
  };

  const handleClickOnListItem = () => {
    navigate(`/rick-mortium/items/${item.id}`, {
      state: {
        item,
        type,
      },
    });
  };

  return (
    <li
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
      }}
      className={`flex flex-col justify-start items-start rounded-xl bg-amber-500 cursor-pointer ${DROP_SHADOW_CLASSES}`}
      onClick={handleClickOnListItem}
    >
      {type === 'character' && (
        <img
          className='w-full rounded-t-xl'
          src={(item as Character).image}
          alt={(item as Character).name}
        />
      )}
      <div className='p-2 w-full h-full flex flex-row justify-between items-start'>
        <div>
          <p className='font-dhand text-xl text-stone-950'>
            <b>Name: </b> {item.name}
          </p>
          {type === 'character' && (
            <>
              <p className='mt-1 font-dhand text-xl text-stone-950'>
                <b>Origin: </b> {(item as Character).origin.name}
              </p>
              <p className='mt-1 font-dhand text-xl text-stone-950'>
                <b>Species: </b> {(item as Character).species}
              </p>
              <p className='mt-1 font-dhand text-xl text-stone-950'>
                <b>Status: </b>{' '}
                {`${(item as Character).status} ${
                  (item as Character).status.toLowerCase() === 'alive'
                    ? '🙂'
                    : ''
                } ${
                  (item as Character).status.toLowerCase() === 'dead'
                    ? '💀'
                    : ''
                } ${
                  (item as Character).status.toLowerCase() === 'unknown'
                    ? '❓'
                    : ''
                }`}
              </p>
            </>
          )}
          {type === 'location' && (
            <>
              <p className='mt-1 font-dhand text-xl text-stone-950'>
                <b>Type: </b> {(item as Location).type}
              </p>
              <p className='mt-1 font-dhand text-xl text-stone-950'>
                <b>Dimension: </b> {(item as Location).dimension}
              </p>
            </>
          )}
          {type === 'episode' && (
            <>
              <p className='mt-1 font-dhand text-xl text-stone-950'>
                <b>First emission: </b> {(item as Episode).airDate}
              </p>
            </>
          )}
        </div>
        <button
          type='button'
          onClick={handleClickOnHearth}
        >
          {(type === 'character' &&
            characters.some((character) => character.id === item.id)) ||
          (type === 'location' &&
            locations.some((location) => location.id === item.id)) ||
          (type === 'episode' &&
            episodes.some((episode) => episode.id === item.id)) ? (
            <FilledHearthIcon
              fill={iconColor}
              width={iconSize}
              height={iconSize}
            />
          ) : (
            <HollowHearthIcon
              fill={iconColor}
              width={iconSize}
              height={iconSize}
            />
          )}
        </button>
      </div>
    </li>
  );
};

export default ListItem;
