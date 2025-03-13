import { ChatUITheme } from '../types';
import { BubbleProps } from '../components/Bubble/Bubble';

export const defaultTheme: ChatUITheme = {
  appearance: 'light',
  accentColor: 'blue',
  grayColor: 'auto',
  panelBackground: 'translucent',
  radius: 'medium',
  scaling: '100%',
};

export const defaultBubbleProps: BubbleProps = {
  placement: 'start',
};
