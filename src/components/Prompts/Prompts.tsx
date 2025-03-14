import React from 'react';
import { Box, Card, Text } from '@radix-ui/themes';

import { MergeType } from '../../types';
import { ChatUIThemeWrapper } from '../../components/ChatUIThemeWrapper';
import { Prompt, PromptProps } from './Prompt';

import './Prompts.scss';

export type PromptsProps = MergeType<{
  title?: React.ReactNode;
  items: PromptProps[];
  onItemClick?: (item: PromptProps) => void;
}>;

export const Prompts: React.FC<PromptsProps> = ({ theme, items, title }) => {
  const renderTitle = () => {
    let displayTitle = title;
    if (typeof title === 'string') {
      displayTitle = (
        <Text color="gray" size="2">
          {title}
        </Text>
      );
    }

    return <Box mb="2">{displayTitle}</Box>;
  };

  const renderContent = () => {
    return (
      <Box>
        {items.map((item, index) => (
          <Box mb="2" key={`${item.id}-${index}`}>
            <Prompt {...item} />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <ChatUIThemeWrapper theme={theme}>
      <div className="chat-ui-prompts">
        {renderTitle()}
        {renderContent()}
      </div>
    </ChatUIThemeWrapper>
  );
};
