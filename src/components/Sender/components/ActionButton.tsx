import { IconButton, type IconButtonProps } from '@radix-ui/themes';
import classNames from 'classnames';
import * as React from 'react';

export interface ActionButtonContextProps {
  prefixCls: string;
  onSend?: VoidFunction;
  onSendDisabled?: boolean;
  onClear?: VoidFunction;
  onClearDisabled?: boolean;
  onCancel?: VoidFunction;
  onCancelDisabled?: boolean;
  onSpeech?: VoidFunction;
  onSpeechDisabled?: boolean;
  speechRecording?: boolean;
  disabled?: boolean;
}

export const ActionButtonContext = React.createContext<ActionButtonContextProps>(null!);

export interface ActionButtonProps extends IconButtonProps {
  action: 'onSend' | 'onClear' | 'onCancel' | 'onSpeech';
}

export function ActionButton(props: ActionButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { className, action, children, onClick, ...restProps } = props;
  const context = React.useContext(ActionButtonContext) || {};
  const { prefixCls, disabled: rootDisabled } = context;
  const mergedDisabled = restProps.disabled ?? rootDisabled ?? context[`${action}Disabled`];

  return (
    <IconButton
      variant="ghost"
      {...restProps}
      ref={ref}
      onClick={(e) => {
        if (mergedDisabled) {
          return;
        }
        context[action]?.();
        onClick?.(e);
      }}
      className={classNames(prefixCls, className, {
        [`${prefixCls}-disabled`]: mergedDisabled,
      })}
    >
      {children}
    </IconButton>
  );
}

export default React.forwardRef(ActionButton);
