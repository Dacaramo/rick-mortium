import {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
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
import { AMBER_500, LIME_400 } from '../../constants/colors';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const CharactersPage: FC<Props> = () => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<CharacterStatus | undefined>(undefined);
  const [gender, setGender] = useState<CharacterGender | undefined>(undefined);
  const [species, setSpecies] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [isGoUpButtonVisible, setIsGoUpButtonVisible] =
    useState<boolean>(false);

  const filtersSectionRef = useRef<HTMLElement | null>(null);

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

  const characters =
    data?.pages.reduce((acc: Array<Character>, current) => {
      return [...acc, ...current.results];
    }, []) ?? [];
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

  const handleClickOnGoUp = () => {
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const isBottomReached = window.scrollY >= scrollableHeight;

      if (isBottomReached) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }

      if (filtersSectionRef.current) {
        const filtersSectionRect =
          filtersSectionRef.current.getBoundingClientRect();
        const isFiltersSectionScrolled =
          window.scrollY >=
          navbarHeight + searchSectionHeight + filtersSectionRect.height;
        if (isFiltersSectionScrolled) {
          setIsGoUpButtonVisible(true);
        } else {
          setIsGoUpButtonVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, navbarHeight, searchSectionHeight, fetchNextPage]);

  return (
    <>
      <div
        style={{ height: bgImgHeight }}
        className={`w-full absolute top-0 -z-10 bg-[url('/charactersPageImg.jpg')] bg-contain max-[542px]: ${DROP_SHADOW_CLASSES}`}
      />
      <section
        style={{ height: searchSectionHeight }}
        className={`w-full z-0 flex justify-center items-center`}
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
      <section
        ref={filtersSectionRef}
        className='mt-5 flex flex-row flex-wrap justify-around items-center max-[320px]:flex-col max-[320px]:justify-center max-[320px]:items-center max-[320px]:gap-2'
      >
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
            htmlFor='characterTypeInput'
            className={`${labelClasses}`}
          >
            Type
          </label>
          <input
            type='text'
            id='characterTypeInput'
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
      <List
        items={characters}
        isLoading={isLoading}
      />
      {isGoUpButtonVisible && (
        <button
          type='button'
          className={`fixed z-10 bottom-4 right-4 w-[80px] h-[80px] rounded-full bg-rose-600 border-4 border-lime-500 ${DROP_SHADOW_CLASSES}`}
          hidden={!isGoUpButtonVisible}
          onClick={handleClickOnGoUp}
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            size='2xl'
            color={LIME_400}
          />
        </button>
      )}
    </>
  );
};

export default CharactersPage;
