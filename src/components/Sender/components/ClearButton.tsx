import { ClearOutlined } from '@ant-design/icons';
import type { IconButtonProps } from '@radix-ui/themes';
import * as React from 'react';

import ActionButton from './ActionButton';

function ClearButton(props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) {
  return (
    <ActionButton {...props} action="onClear" ref={ref}>
      <ClearOutlined />
    </ActionButton>
  );
}

export default React.forwardRef(ClearButton);
