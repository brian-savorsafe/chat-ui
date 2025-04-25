import type { IconButtonProps } from '@radix-ui/themes';
import classNames from 'classnames';
import * as React from 'react';

import StopLoadingIcon from '../StopLoading';
import ActionButton, { ActionButtonContext } from './ActionButton';

function LoadingButton(props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { prefixCls } = React.useContext(ActionButtonContext);
  const { className } = props;

  return (
    <ActionButton
      variant="ghost"
      radius="full"
      {...props}
      className={classNames(className, `${prefixCls}-loading-button`)}
      action="onCancel"
      ref={ref}
    >
      <StopLoadingIcon className={`${prefixCls}-loading-icon`} />
    </ActionButton>
  );
}

export default React.forwardRef(LoadingButton);
