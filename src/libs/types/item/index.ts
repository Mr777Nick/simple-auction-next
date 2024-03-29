import { ItemBid } from '../item-bid';
import { User } from '../user';

export type Item = {
  currentPrice?: number;
  endedAt: string;
  id: string;
  itemBids: ItemBid[];
  name: string;
  soldPrice?: number;
  startPrice: number;
  status: ItemStatus;
  user: User;
  isMine?: boolean;
};

export enum ItemStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SOLD = 'SOLD',
}
