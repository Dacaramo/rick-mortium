import { FC } from 'react';
import ListItem from '../ListItem/ListItem';
import { Item } from '../../model/Item';
import { determineListItemType } from '../../utils/modelUtils';

interface Props {
  items: Array<Item>;
}

const List: FC<Props> = ({ items }) => {
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
    </ul>
  );
};

export default List;
