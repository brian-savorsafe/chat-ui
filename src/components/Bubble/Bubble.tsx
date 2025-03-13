import React from 'react';
import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarProps, Flex, Text } from '@radix-ui/themes';

import { ChatUITheme } from '../../types';
import { ChatUIThemeWrapper } from '../ChatUIThemeWrapper';

import './Bubble.scss';

export interface BubbleProps {
  theme?: ChatUITheme;
  content?: string;
  avatar?: AvatarProps | false;
  placement?: 'start' | 'end';
}

export const Bubble: React.FC<BubbleProps> = ({ content, theme, avatar }) => {
  const renderAvatar = () => {
    if (avatar === false) {
      return null;
    }

    return <Avatar fallback={<PersonIcon />} {...avatar} />;
  };

  return (
    <ChatUIThemeWrapper theme={theme}>
      <div className="chat-ui-bubble">
        <Flex gap="3">
          {renderAvatar()}
          <Text>{content}</Text>
        </Flex>
      </div>
    </ChatUIThemeWrapper>
  );
};
