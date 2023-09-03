import { FC } from 'react';

interface Props {}

const ErrorPage: FC<Props> = () => {
  return (
    <h1 className='w-[100%] h-[100vh] overflow-y-hidden flex justify-center items-center font-dhand text-5xl text-amber-500'>
      Page not found
    </h1>
  );
};

export default ErrorPage;
