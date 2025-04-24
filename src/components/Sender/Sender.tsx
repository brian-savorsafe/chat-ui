import React from 'react';
import { Flex } from '@radix-ui/themes';
import RcTextArea, { TextAreaProps } from 'rc-textarea';

import { MergeType } from '../../types';
import { ChatUIThemeWrapper } from '../ChatUIThemeWrapper';

import './Sender.scss';

export type SenderProps = MergeType<TextAreaProps & {}>;

export const Sender: React.FC<SenderProps> = (props) => {
  const { value, onChange, theme, ...rest } = props;

  return (
    <ChatUIThemeWrapper theme={theme}>
      <Flex className="chat-ui-sender">
        <Flex className="chat-ui-sender-content" flex="1">
          <RcTextArea value={value} onChange={onChange} {...rest} className="chat-ui-sender-input" />
        </Flex>
      </Flex>
    </ChatUIThemeWrapper>
  );
};
