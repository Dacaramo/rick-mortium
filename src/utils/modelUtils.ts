import { Item, ItemType } from '../model/Item';

export const determineListItemType = (item: Item): ItemType => {
  if ('species' in item) {
    return 'character';
  } else if ('dimension' in item) {
    return 'location';
  } else if ('airDate' in item) {
    return 'episode';
  }
  throw Error(
    'The item is not identified as a character, a location or an episode. Maybe the API schema for any of this items has changed?'
  );
};
