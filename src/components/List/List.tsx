import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

import { AMBER_500 } from '../../constants/colors';
import { Item } from '../../model/Item';
import { determineListItemType } from '../../utils/modelUtils';

import ListItem from './ListItem/ListItem';

interface Props {
  items: Array<Item>;
  isLoading: boolean;
}

const List: FC<Props> = ({ items, isLoading }) => {
  return (
    <ul className='w-full p-5 grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-5'>
      {items.map((item) => {
        return (
          <ListItem
            key={item.id}
            item={item}
            type={determineListItemType(item)}
          />
        );
      })}
      {isLoading && (
        <li className='flex justify-center items-center'>
          <ClipLoader
            color={AMBER_500}
            size={50}
          />
        </li>
      )}
    </ul>
  );
};

export default List;
