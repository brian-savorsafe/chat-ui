import React, { useRef } from 'react';
import { Box, Flex, type IconButtonProps } from '@radix-ui/themes';
import RcTextArea, { TextAreaRef } from 'rc-textarea';
import type { TextAreaProps } from 'rc-textarea';
import { useMergedState } from 'rc-util';

import SendButton from './components/SendButton';
import ClearButton from './components/ClearButton';
import SpeechButton from './components/SpeechButton';
import LoadingButton from './components/LoadingButton';
import useSpeech, { AllowSpeech } from './useSpeech';
import { ActionButtonContext } from './components/ActionButton';

import './Sender.scss';

export type SubmitType = 'enter' | 'shiftEnter' | false;

export interface SenderComponents {
  input?: React.ComponentType<TextAreaProps>;
}
type ActionsComponents = {
  SendButton: React.ComponentType<IconButtonProps>;
  ClearButton: React.ComponentType<IconButtonProps>;
  LoadingButton: React.ComponentType<IconButtonProps>;
  SpeechButton: React.ComponentType<IconButtonProps>;
};
export type ActionsRender = (
  ori: React.ReactNode,
  info: {
    components: ActionsComponents;
  },
) => React.ReactNode;

export type FooterRender = (info: { components: ActionsComponents }) => React.ReactNode;

export type SenderProps = TextAreaProps & {
  allowSpeech?: AllowSpeech;
  submitType?: SubmitType;
  loading?: boolean;
  onChange?: (
    value: string,
    event?: React.FormEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onSubmit?: (value: string) => void;
  onCancel?: VoidFunction;
  onPaste?: React.ClipboardEventHandler;
  onPasteFile?: (file: File, files: FileList) => void;
  footer?: React.ReactNode | FooterRender;
  header?: React.ReactNode;
  actions?: React.ReactNode | ActionsRender;
};

const inputCls = 'chat-ui-sender-input';

/** Used for actions render needed components */
const sharedRenderComponents = {
  SendButton,
  ClearButton,
  LoadingButton,
  SpeechButton,
};

export const Sender: React.FC<SenderProps> = (props) => {
  const {
    value,
    footer,
    header,
    actions,
    loading,
    autoSize = {
      minRows: 1,
      maxRows: 5,
    },
    disabled,
    defaultValue,
    allowSpeech,
    submitType = 'enter',
    onKeyDown,
    onChange,
    onPaste,
    onSubmit,
    onCancel,
    onPasteFile,
    placeholder = 'Type a message...',
    ...rest
  } = props;

  const inputRef = useRef<TextAreaRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ============================ Value =============================
  const [innerValue, setInnerValue] = useMergedState(defaultValue || '', {
    value,
  });

  // ============================ Events ============================
  const triggerSend = () => {
    if (innerValue && onSubmit && !loading) {
      onSubmit(innerValue as string);
    }
  };

  const triggerValueChange: SenderProps['onChange'] = (event: any) => {
    const nextValue = event.target.value;
    setInnerValue(nextValue);

    if (onChange) {
      onChange(nextValue, event);
    }
  };

  const triggerClear = () => {
    triggerValueChange?.('');
  };

  // ============================ Speech ============================
  const [speechPermission, triggerSpeech, speechRecording] = useSpeech((transcript) => {
    triggerValueChange?.(`${innerValue} ${transcript}`);
  }, allowSpeech);

  const actionsButtonContextProps = {
    prefixCls: 'chat-ui',
    onSend: triggerSend,
    onSendDisabled: !innerValue,
    onClear: triggerClear,
    onClearDisabled: !innerValue,
    onCancel,
    onCancelDisabled: !loading,
    onSpeech: () => triggerSpeech(false),
    onSpeechDisabled: !speechPermission,
    speechRecording,
    disabled,
  };

  // ============================ Paste =============================
  const onInternalPaste: React.ClipboardEventHandler<HTMLElement> = (e) => {
    // Get files
    const files = e.clipboardData?.files;
    if (files?.length && onPasteFile) {
      onPasteFile(files[0], files);
      e.preventDefault();
    }

    onPaste?.(e);
  };

  // ============================ Action ============================
  let actionNode: React.ReactNode = (
    <Flex gap="3" align="center">
      {allowSpeech && <SpeechButton />}
      {/* Loading or Send */}
      {loading ? <LoadingButton /> : <SendButton />}
    </Flex>
  );

  // Custom actions
  if (typeof actions === 'function') {
    actionNode = actions(actionNode, {
      components: sharedRenderComponents,
    });
  } else if (actions || actions === false) {
    actionNode = actions;
  }

  // ============================ Submit ============================
  const isCompositionRef = React.useRef(false);

  const onInternalCompositionStart = () => {
    isCompositionRef.current = true;
  };

  const onInternalCompositionEnd = () => {
    isCompositionRef.current = false;
  };

  const onInternalKeyPress: TextAreaProps['onKeyDown'] = (e) => {
    const canSubmit = e.key === 'Enter' && !isCompositionRef.current;

    // Check for `submitType` to submit
    switch (submitType) {
      case 'enter':
        if (canSubmit && !e.shiftKey) {
          e.preventDefault();
          triggerSend();
        }
        break;

      case 'shiftEnter':
        if (canSubmit && e.shiftKey) {
          e.preventDefault();
          triggerSend();
        }
        break;
    }

    onKeyDown?.(e);
  };

  // ============================ Focus =============================
  const onContentMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // If input focused but click on the container,
    // input will lose focus.
    // We call `preventDefault` to prevent this behavior
    if (e.target !== containerRef.current?.querySelector(`.${inputCls}`)) {
      e.preventDefault();
    }

    inputRef.current?.focus();
  };

  // ============================ Footer ============================
  const footerNode = typeof footer === 'function' ? footer({ components: sharedRenderComponents }) : footer || null;

  return (
    <Box className="chat-ui-sender" ref={containerRef}>
      <ActionButtonContext.Provider value={actionsButtonContextProps}>
        {header && <Box className="chat-ui-sender-header">{header}</Box>}
        <Flex align="end" gap="2" className="chat-ui-sender-content" onMouseDown={onContentMouseDown}>
          <RcTextArea
            ref={inputRef}
            value={innerValue}
            autoSize={autoSize}
            style={{ outline: 'none', lineHeight: '22px' }}
            placeholder={placeholder}
            className={inputCls}
            {...rest}
            onChange={triggerValueChange}
            onPaste={onInternalPaste}
            onKeyDown={onKeyDown}
            onClear={triggerClear}
            onPressEnter={onInternalKeyPress}
            onCompositionStart={onInternalCompositionStart}
            onCompositionEnd={onInternalCompositionEnd}
          />
          <div className="chat-ui-sender-actions">{actionNode}</div>
        </Flex>
        {footerNode && <Box className="chat-ui-sender-footer">{footerNode}</Box>}
      </ActionButtonContext.Provider>
    </Box>
  );
};
