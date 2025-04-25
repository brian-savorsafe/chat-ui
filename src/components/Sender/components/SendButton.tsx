import { ArrowUpOutlined } from '@ant-design/icons';
import type { IconButtonProps } from '@radix-ui/themes';
import * as React from 'react';

import ActionButton from './ActionButton';

function SendButton(props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) {
  return (
    <ActionButton radius="full" variant="soft" {...props} action="onSend" ref={ref}>
      <ArrowUpOutlined />
    </ActionButton>
  );
}

export default React.forwardRef(SendButton);
