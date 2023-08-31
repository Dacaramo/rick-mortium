import { FC, useState, useEffect, ChangeEvent } from 'react';
import List from '../List/List';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCharacters } from '../../axios/axiosRequestSenders';
import debounce from 'lodash/debounce';
import {
  DROP_SHADOW_CLASSES,
  TEXT_INPUT_CLASSES,
} from '../../constants/tailwindClasses';
import { useOutletContext } from 'react-router-dom';
import { useNavbar } from '../Navbar/useNavbar';
import FiltersSection from '../FiltersSection/FiltersSection';

interface Props {}

const CharactersPage: FC<Props> = () => {
  const [name, setName] = useState<string>('');

  const { navbarHeight } = useNavbar();
  const { data } = useQuery({
    queryKey: ['characters', name],
    queryFn: () =>
      getCharacters({
        name,
      }),
  });

  const bgImgHeight = 400;
  const searchSectionHeight = bgImgHeight - navbarHeight;

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
            onChange={handleNameInputChange}
          />
        </form>
      </section>
      <FiltersSection />
      {data && <List items={data.results} />}
    </>
  );
};

export default CharactersPage;
