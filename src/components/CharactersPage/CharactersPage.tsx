import { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';
import List from '../List/List';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCharacters } from '../../axios/axiosRequestSenders';
import {
  DROP_SHADOW_CLASSES,
  TEXT_INPUT_CLASSES,
} from '../../constants/tailwindClasses';
import { useNavbar } from '../Navbar/useNavbar';
import ToggleButtonGroup from '../ToggleButtonGroup/ToggleButtonGroup';
import {
  Character,
  CharacterGender,
  CharacterStatus,
} from '../../model/Character';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { ClipLoader } from 'react-spinners';
import { AMBER_500 } from '../../constants/colors';
import { AxiosError } from 'axios';

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
  const { data, fetchNextPage, hasNextPage, isError, isLoading, error } =
    useInfiniteQuery({
      queryKey: [
        'characters',
        debouncedName,
        status,
        gender,
        debouncedSpecies,
        debouncedType,
      ],
      queryFn: ({ pageParam = 1 }) => {
        return getCharacters(
          {
            name: debouncedName === '' ? undefined : debouncedName,
            status,
            gender,
            species: debouncedSpecies === '' ? undefined : debouncedSpecies,
            type: debouncedType === '' ? undefined : debouncedType,
          },
          pageParam as number
        );
      },
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.info.next) {
          return;
        }
        return allPages.length + 1;
      },
    });

  console.log((error as AxiosError)?.response?.status);
  const characters = data?.pages.reduce((acc: Array<Character>, current) => {
    return [...acc, ...current.results];
  }, []);
  const searchCount = data?.pages[0].info.count;

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
  const getComponent = () => {
    if (isLoading) {
      return (
        <ClipLoader
          color={AMBER_500}
          size={25}
        />
      );
    } else if (isError) {
      const statusCode = (error as AxiosError).response?.status;
      switch (statusCode) {
        case 404: {
          return <label className={`${labelClasses}`}>Not found</label>;
        }
        case 500: {
          return <label className={`${labelClasses}`}>Server error</label>;
        }
        default: {
          return <label className={`${labelClasses}`}>Unknown error</label>;
        }
      }
    } else {
      return <label className={`${labelClasses}`}>{searchCount}</label>;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= scrollableHeight) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage]);

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
        <div className='flex flex-col items-center'>
          <label className={`${labelClasses}`}>Status</label>
          <ToggleButtonGroup
            buttons={statusButtons}
            selectedBtnText={status}
            setSelectedBtnText={
              setStatus as Dispatch<SetStateAction<string | undefined>>
            }
          />
        </div>
        <div className='flex flex-col items-center'>
          <label className={`${labelClasses}`}>Gender</label>
          <ToggleButtonGroup
            buttons={genderButtons}
            selectedBtnText={gender}
            setSelectedBtnText={
              setGender as Dispatch<SetStateAction<string | undefined>>
            }
          />
        </div>
        <div className='flex flex-col items-center'>
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
        <div className='flex flex-col items-center'>
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
        <div className='flex flex-col items-center'>
          <label className={`${labelClasses}`}>Results</label>
          {getComponent()}
        </div>
      </section>
      {characters && (
        <List
          items={characters}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default CharactersPage;
