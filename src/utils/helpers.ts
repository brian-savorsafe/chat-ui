import { BubbleProps } from '../components/Bubble/Bubble';

export const extractBubbleProps = <T extends BubbleProps>(props: T): T => {
  const { content, theme, avatar, placement } = props;
  return { content, theme, avatar, placement };
};