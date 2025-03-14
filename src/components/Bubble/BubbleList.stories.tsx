import { UpdateIcon, UploadIcon } from '@radix-ui/react-icons';
import { Flex } from '@radix-ui/themes';

import { Bubble } from '../../index';

export default {
  title: 'BubbleList',
  component: Bubble.List,
};

const renderFooter = () => {
  return (
    <Flex gap="2">
      <UploadIcon />
      <UpdateIcon />
    </Flex>
  );
};

// const getRole = (bubble: any, index: number) => {
//   if (index === 0) {
//     return {
//       ...bubble,
//       variant: 'shadow',
//       placement: 'end',
//       header: 'Typography',
//       footer: renderFooter(),
//     };
//   }

//   return {
//     variant: 'shadow',
//     placement: 'start',
//     header: 'Typography',
//     footer: renderFooter(),
//   };
// };

export const Default = {
  args: {
    items: [
      {
        role: 'user',
        content: 'The goal of typography is to relate font size.',
      },
      {
        role: 'ai',
        content: 'The goal11 of typography is to relate font size.',
      },
    ],
    roles: {
      user: {
        variant: 'shadow',
        placement: 'end',
        header: 'Typography',
        footer: renderFooter(),
      },
      ai: {
        variant: 'shadow',
        placement: 'start',
        header: 'Typography',
        footer: renderFooter(),
      },
    },
  },
};
