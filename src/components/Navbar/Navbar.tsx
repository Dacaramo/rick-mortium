import { Link, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { NAVBAR_ITEM_FONT, TITLE_FONT } from '../../constants/fonts';
import {
  NAVBAR_ITEM_FONT_HOVER_SIZE,
  NAVBAR_ITEM_FONT_SIZE,
  TITLE_FONT_SIZE,
} from '../../constants/sizes';
import {
  NAVBAR_COLOR,
  NAVBAR_ITEM_FONT_COLOR,
  NAVBAR_ITEM_FONT_HOVER_COLOR,
  SHADOW_COLOR,
  TITLE_FONT_COLOR,
} from '../../constants/colors';

interface Props {}

const Navbar: FC<Props> = () => {
  return (
    <>
      <header
        className={`w-full min-h-[50px] flex flex-row justify-start items-center drop-shadow shadow-md rounded-b-lg ${NAVBAR_COLOR} ${SHADOW_COLOR}`}
      >
        <Link
          to='/'
          className={`ml-3 ${TITLE_FONT} ${TITLE_FONT_SIZE} ${TITLE_FONT_COLOR}`}
        >
          Rick Mortium
        </Link>
        <nav className='ml-auto mr-3'>
          <Link
            to='/'
            className={`ml-3 ${NAVBAR_ITEM_FONT} ${NAVBAR_ITEM_FONT_SIZE} ${NAVBAR_ITEM_FONT_COLOR} ${NAVBAR_ITEM_FONT_HOVER_COLOR} ${NAVBAR_ITEM_FONT_HOVER_SIZE}`}
          >
            Characters
          </Link>
          <Link
            to='/locations'
            className={`ml-3 ${NAVBAR_ITEM_FONT} ${NAVBAR_ITEM_FONT_SIZE} ${NAVBAR_ITEM_FONT_COLOR} ${NAVBAR_ITEM_FONT_HOVER_COLOR} ${NAVBAR_ITEM_FONT_HOVER_SIZE}`}
          >
            Locations
          </Link>
          <Link
            to='/episodes'
            className={`ml-3 ${NAVBAR_ITEM_FONT} ${NAVBAR_ITEM_FONT_SIZE} ${NAVBAR_ITEM_FONT_COLOR} ${NAVBAR_ITEM_FONT_HOVER_COLOR} ${NAVBAR_ITEM_FONT_HOVER_SIZE}`}
          >
            Episodes
          </Link>
          <Link
            to='/liked'
            className={`ml-3 ${NAVBAR_ITEM_FONT} ${NAVBAR_ITEM_FONT_SIZE} ${NAVBAR_ITEM_FONT_COLOR} ${NAVBAR_ITEM_FONT_HOVER_COLOR} ${NAVBAR_ITEM_FONT_HOVER_SIZE}`}
          >
            Liked
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
