import React from 'react';
import { Box, Text } from '@radix-ui/themes';

import { Prompt, PromptProps } from './Prompt';

import './Prompts.scss';

export type PromptsProps = {
  title?: React.ReactNode;
  items: PromptProps[];
  onItemClick?: (item: PromptProps) => void;
};

export const Prompts: React.FC<PromptsProps> = ({ items, title }) => {
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
    <div className="chat-ui-prompts">
      {renderTitle()}
      {renderContent()}
    </div>
  );
};
