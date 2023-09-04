import { Link, Outlet } from 'react-router-dom';
import { FC, useEffect, useRef, useState } from 'react';
import { DROP_SHADOW_CLASSES } from '../../constants/tailwindClasses';

interface Props {}

const Navbar: FC<Props> = () => {
  const [navbarHeight, setNavbarHeight] = useState<number>(0);

  const navbarRef = useRef<HTMLElement | null>(null);

  const navbarItemClasses =
    'font-dhand text-xl text-amber-200 hover:text-amber-500';

  useEffect(() => {
    const navbarElement = navbarRef.current;

    if (!navbarElement) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const navbarRect = navbarElement.getBoundingClientRect();
      setNavbarHeight(navbarRect.height);
    });

    observer.observe(navbarElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header
        ref={navbarRef}
        className={`w-full p-4 sticky top-0 z-10 flex flex-row flex-wrap justify-start items-center drop-shadow shadow-md rounded-b-lg bg-blue-800 ${DROP_SHADOW_CLASSES}`}
      >
        <Link
          to='/'
          className={`ml-3 font-chicle text-5xl text-amber-500`}
        >
          Rick Mortium
        </Link>
        <nav className='ml-auto mr-3'>
          <Link
            to='/'
            className={`${navbarItemClasses}`}
          >
            Characters
          </Link>
          <Link
            to='/locations'
            className={`ml-3 ${navbarItemClasses}`}
          >
            Locations
          </Link>
          <Link
            to='/episodes'
            className={`ml-3 ${navbarItemClasses}`}
          >
            Episodes
          </Link>
          <Link
            to='/liked'
            className={`ml-3 ${navbarItemClasses}`}
          >
            Liked
          </Link>
        </nav>
      </header>
      <main>
        <Outlet context={{ navbarHeight }} />
      </main>
    </>
  );
};

export default Navbar;
