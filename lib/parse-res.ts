import type { TransferEvent, ResponseGetDragons, DragonObject } from 'types';

import { Buffer } from 'buffer';
import { arraySum } from './array';


export function parseGetDragons(events: TransferEvent[], dragons: ResponseGetDragons) {
  const visualGens: string[] = dragons['1'];
  const fightGens: string[] = dragons['2'];
  const names: string[] = dragons['3'];
  const list: DragonObject[] = [];

  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    const name = names[index];
    const visual = visualGens[index];
    const combat = fightGens[index];
    const owner = event.to;
    const id = event.tokenId;
    const action = 0;
    const rarity = Buffer.from(visual)[0];
    const strong = arraySum(Array.from(Buffer.from(combat)));

    list.push({
      name,
      visual,
      combat,
      id,
      owner,
      action,
      rarity,
      strong
    });
  }

  return list;
}
