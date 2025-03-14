import { UpdateIcon, UploadIcon } from '@radix-ui/react-icons';

import { Prompts } from '../../index';

export default {
  title: 'Prompts',
  component: Prompts,
};

export const Default = {
  args: {
    title: 'Prompts',
    items: [
      {
        id: '1',
        label: 'Typography',
        avatar: {
          src: 'https://github.com/shadcn.png',
        },
        description: 'The goal of typography is to relate font size.',
      },
      {
        id: '2',
        label: 'Typography',
        description: 'The goal of typography is to relate font size.',
        onItemClick: (info) => {
          console.log('clicked', info);
        },
      },
      {
        id: '3',
        disabled: true,
        description: 'The goal of typography is to relate font size.',
      },
      {
        id: '4',
        avatar: {
          size: '1',
          fallback: <UploadIcon />,
        },
        description: 'The goal of typography is to relate font size.',
      },
    ],
  },
};
