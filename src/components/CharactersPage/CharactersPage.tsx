import { FC } from 'react';

interface Props {}

const CharactersPage: FC<Props> = () => {
  return (
    <>
      <section className="absolute w-full h-[500px] bg-[url('/charactersPageImg.jpg')] bg-cover"></section>
    </>
  );
};

export default CharactersPage;
