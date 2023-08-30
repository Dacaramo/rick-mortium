import { FC } from 'react';
import ListItem from '../ListItem/ListItem';
import { Item } from '../../model/Item';
import { determineListItemType } from '../../utils/modelUtils';

interface Props {
  items: Array<Item>;
}

const List: FC<Props> = ({ items }) => {
  return (
    <ul className='w-full p-5 flex flex-row flex-wrap gap-2 justify-start items-center'>
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
