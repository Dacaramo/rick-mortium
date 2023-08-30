import { Character } from './Character';
import { Episode } from './Episode';
import { Location } from './Location';

export type Item = Character | Location | Episode;
export type ItemType = 'character' | 'location' | 'episode';
