import { Button } from '@radix-ui/themes';

import { ChatUIProvider } from './ChatUIProvider';
import { Bubble } from '../Bubble';

export default {
  title: 'ChatUIProvider',
  component: ChatUIProvider,
};

export const Default = {
  args: {
    children: (
      <>
        <Bubble content="Hello" />
        <Bubble content="Hello" />
        <Bubble content="Hello" />
        <Bubble content="Hello" />
        <Bubble content="Hello" />
      </>
    ),
  },
};
