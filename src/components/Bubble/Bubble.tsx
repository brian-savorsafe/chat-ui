import React from 'react';
import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarProps, Box, Flex, Section, Spinner, Text } from '@radix-ui/themes';

import { MergeType } from '../../types';
import { ChatUIThemeWrapper } from '../ChatUIThemeWrapper';

import './Bubble.scss';

type ModifiedType = Omit<AvatarProps, 'fallback'>;

type BubbleAvatarProps = ModifiedType & {
  fallback?: Exclude<React.ReactNode, null>;
};

export type BubbleContent = string | React.ReactNode;

export type BubbleProps = MergeType<{
  content?: BubbleContent;
  loading?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  avatar?: BubbleAvatarProps | false;
  style?: React.CSSProperties;
  placement?: 'start' | 'end';
  variant?: 'filled' | 'outlined' | 'shadow' | 'none';
  renderMessage?: (content: BubbleContent) => React.ReactNode | string | null;
}>;

export const Bubble: React.FC<BubbleProps> = ({
  theme,
  avatar,
  header,
  footer,
  style,
  content,
  loading,
  variant = 'filled',
  placement = 'start',
  renderMessage,
}) => {
  const renderAvatar = () => {
    if (avatar === false) {
      return null;
    }

    return <Avatar radius="medium" fallback={<PersonIcon />} {...avatar} />;
  };

  const _renderMessage = (content: BubbleContent) => {
    if (loading) {
      return (
        <Box pl="2" pr="2" pt="1">
          <Spinner />
        </Box>
      );
    }

    if (renderMessage) {
      return renderMessage(content);
    }

    return content;
  };

  const renderNoneContent = () => {
    return (
      <Section p="0" flexBasis="auto" flexShrink="1" maxWidth="100%" className="chat-ui-bubble-content none">
        {content}
      </Section>
    );
  };

  const renderContent = () => {
    if (variant === 'none') {
      return renderNoneContent();
    }

    return (
      <Section p="2" flexBasis="auto" flexShrink="1" maxWidth="100%" className={`chat-ui-bubble-content ${variant}`}>
        <Text size="2" wrap="balance">
          {_renderMessage(content)}
        </Text>
      </Section>
    );
  };

  const renderBubbleItem = (item: React.ReactNode, type: 'header' | 'footer') => {
    if (!item) {
      return null;
    }

    const getItem = typeof item === 'string' ? <Text size="2">{item}</Text> : item;

    return (
      <Flex p="1" justify={placement} className={`chat-ui-bubble-${type}`}>
        {getItem}
      </Flex>
    );
  };

  const renderHeader = () => renderBubbleItem(header, 'header');
  const renderFooter = () => renderBubbleItem(footer, 'footer');

  const renderContentWrapper = () => {
    return (
      <Flex direction="column" gap="2">
        {renderHeader()}
        {renderContent()}
        {renderFooter()}
      </Flex>
    );
  };

  return (
    <ChatUIThemeWrapper theme={theme}>
      <Flex mb="4" className="chat-ui-bubble" justify={placement} style={style}>
        <Flex
          gap="3"
          direction={placement === 'start' ? 'row' : 'row-reverse'}
          width={{ initial: '600px', xs: '320px', sm: '480px', md: '600px', xl: '800px' }}
        >
          {renderAvatar()}
          {renderContentWrapper()}
        </Flex>
      </Flex>
    </ChatUIThemeWrapper>
  );
};
