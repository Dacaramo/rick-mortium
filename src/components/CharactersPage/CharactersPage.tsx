import { FC, useState, Dispatch, SetStateAction } from 'react';
import List from '../List/List';
import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../../axios/axiosRequestSenders';
import {
  DROP_SHADOW_CLASSES,
  TEXT_INPUT_CLASSES,
} from '../../constants/tailwindClasses';
import { useNavbar } from '../Navbar/useNavbar';
import ToggleButtonGroup from '../ToggleButtonGroup/ToggleButtonGroup';
import { CharacterGender, CharacterStatus } from '../../model/Character';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

interface Props {}

const CharactersPage: FC<Props> = () => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<CharacterStatus | undefined>(undefined);
  const [gender, setGender] = useState<CharacterGender | undefined>(undefined);
  const [species, setSpecies] = useState<string>('');
  const [type, setType] = useState<string>('');

  const delay = 50;
  const debouncedName = useDebouncedValue(name, delay);
  const debouncedSpecies = useDebouncedValue(species, delay);
  const debouncedType = useDebouncedValue(type, delay);
  const { navbarHeight } = useNavbar();
  const { data } = useQuery({
    queryKey: [
      'characters',
      debouncedName,
      status,
      gender,
      debouncedSpecies,
      debouncedType,
    ],
    queryFn: () =>
      getCharacters({
        name: debouncedName === '' ? undefined : debouncedName,
        status,
        gender,
        species: debouncedSpecies === '' ? undefined : debouncedSpecies,
        type: debouncedType === '' ? undefined : debouncedType,
      }),
  });

  const bgImgHeight = 400;
  const searchSectionHeight = bgImgHeight - navbarHeight;
  const labelClasses = 'mb-2 font-dhand text-amber-500 text-2xl text-center';
  const statusButtons = [
    {
      text: 'alive',
    },
    {
      text: 'dead',
    },
    {
      text: 'unknown',
    },
  ];
  const genderButtons = [
    {
      text: 'female',
    },
    {
      text: 'male',
    },
    {
      text: 'genderless',
    },
    {
      text: 'unknown',
    },
  ];

  return (
    <>
      <div
        style={{ height: bgImgHeight }}
        className={`w-full absolute top-0 -z-10 bg-[url('/charactersPageImg.jpg')] bg-contain`}
      />
      <section
        style={{ height: searchSectionHeight }}
        className={`w-full z-0 flex justify-center items-center ${DROP_SHADOW_CLASSES}`}
      >
        <form
          className={`p-5 flex flex-col justify-center items-center rounded-xl drop-shadow shadow-md bg-blue-800`}
        >
          <label
            htmlFor='characterInput'
            className={`mb-2 text-4xl text-center text-4xl text-amber-500 font-dhand`}
          >
            Curious about a character?
          </label>
          <input
            type='text'
            id='characterInput'
            className={`w-full ${TEXT_INPUT_CLASSES}`}
            placeholder='Type a character name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </section>
      <section className='mt-5 flex flex-row flex-wrap justify-around items-center'>
        <div className='flex flex-col align-center'>
          <label className={`${labelClasses}`}>Status</label>
          <ToggleButtonGroup
            buttons={statusButtons}
            selectedBtnText={status}
            setSelectedBtnText={
              setStatus as Dispatch<SetStateAction<string | undefined>>
            }
          />
        </div>
        <div className='flex flex-col align-center'>
          <label className={`${labelClasses}`}>Gender</label>
          <ToggleButtonGroup
            buttons={genderButtons}
            selectedBtnText={gender}
            setSelectedBtnText={
              setGender as Dispatch<SetStateAction<string | undefined>>
            }
          />
        </div>
        <div className='flex flex-col align-center'>
          <label
            htmlFor='speciesInput'
            className={`${labelClasses}`}
          >
            Species
          </label>
          <input
            type='text'
            id='speciesInput'
            className={`${TEXT_INPUT_CLASSES}`}
            placeholder='Filter by species'
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </div>
        <div className='flex flex-col align-center'>
          <label
            htmlFor='typeInput'
            className={`${labelClasses}`}
          >
            Type
          </label>
          <input
            type='text'
            id='typeInput'
            className={`${TEXT_INPUT_CLASSES}`}
            placeholder='Filter by type'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
      </section>
      {data && <List items={data.results} />}
    </>
  );
};

export default CharactersPage;
