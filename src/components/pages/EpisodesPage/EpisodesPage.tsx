import { FC, useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getEpisodes } from '../../../axios/axiosRequestSenders';
import { AMBER_500, LIME_400 } from '../../../constants/colors';
import {
  DROP_SHADOW_CLASSES,
  TEXT_INPUT_CLASSES,
} from '../../../constants/tailwindClasses';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { Episode } from '../../../model/Episode';
import List from '../../List/List';
import { useNavbar } from '../../Root/useNavbar';

interface Props {}

const EpisodesPage: FC<Props> = () => {
  const [name, setName] = useState<string>('');
  const [episode, setEpisode] = useState<string>('');
  const [isGoUpButtonVisible, setIsGoUpButtonVisible] =
    useState<boolean>(false);

  const filtersSectionRef = useRef<HTMLElement | null>(null);

  const delay = 50;
  const debouncedName = useDebouncedValue(name, delay);
  const debouncedEpisode = useDebouncedValue(episode, delay);
  const { navbarHeight } = useNavbar();
  const { data, fetchNextPage, hasNextPage, isError, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['locations', debouncedName, debouncedEpisode],
      queryFn: ({ pageParam = 1 }) => {
        return getEpisodes(
          {
            name: debouncedName === '' ? undefined : debouncedName,
            episode: debouncedEpisode === '' ? undefined : debouncedEpisode,
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

  const episodes =
    data?.pages.reduce((acc: Array<Episode>, current) => {
      return [...acc, ...current.results];
    }, []) ?? [];
  const searchCount = data?.pages[0].info.count;
  const bgImgHeight = 400;
  const searchSectionHeight = bgImgHeight - navbarHeight;
  const labelClasses = 'mb-2 font-dhand text-amber-500 text-2xl text-center';

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
        className={`w-full absolute top-0 -z-10 bg-[url('/episodesPageImg.jpg')] bg-contain`}
      />
      <section
        style={{ height: searchSectionHeight }}
        className={`w-full z-0 flex justify-center items-center ${DROP_SHADOW_CLASSES}`}
      >
        <form
          className={`p-5 flex flex-col justify-center items-center rounded-xl drop-shadow shadow-md bg-blue-800`}
          onSubmit={(e) => e.preventDefault()}
        >
          <label
            htmlFor='episodeInput'
            className={`mb-2 text-4xl text-center text-4xl text-amber-500 font-dhand`}
          >
            Curious about an episode?
          </label>
          <input
            type='text'
            id='episodeInput'
            className={`w-full ${TEXT_INPUT_CLASSES}`}
            placeholder='Type an episode name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </section>
      <section
        ref={filtersSectionRef}
        className='mt-5 flex flex-row flex-wrap justify-around items-center'
      >
        <div className='flex flex-col items-center'>
          <label
            htmlFor='episodeCodeInput'
            className={`${labelClasses}`}
          >
            Episode code
          </label>
          <input
            type='text'
            id='episodeCodeInput'
            className={`${TEXT_INPUT_CLASSES}`}
            placeholder='Filter by episode code'
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-center'>
          <label className={`${labelClasses}`}>Results</label>
          {getComponent()}
        </div>
      </section>
      <List
        items={episodes}
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

export default EpisodesPage;
