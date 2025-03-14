import { Bubble } from './Bubble';
import { BubbleList } from './BubbleList';

export type { BubbleProps } from './Bubble';
export type { BubbleListProps } from './BubbleList';

type BubbleType = typeof Bubble & {
  List: typeof BubbleList;
};

const BubbleWithList = Bubble as BubbleType;
BubbleWithList.List = BubbleList;

export { BubbleWithList as Bubble };
