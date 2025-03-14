import { UpdateIcon, UploadIcon } from '@radix-ui/react-icons';
import { Flex } from '@radix-ui/themes';

import { Bubble } from '../../index';

export default {
  title: 'Bubble',
  component: Bubble,
};

const renderFooter = () => {
  return (
    <Flex gap="2">
      <UploadIcon />
      <UpdateIcon />
    </Flex>
  );
};

export const Default = {
  args: {
    children: <div>111</div>,
    variant: 'shadow',
    placement: 'end',
    header: 'Typography',
    footer: renderFooter(),
    content: 'The goal of typography is to relate font size.',
  },
};
