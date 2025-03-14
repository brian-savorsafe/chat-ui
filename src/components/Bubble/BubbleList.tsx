import React from 'react';
import { ScrollArea } from '@radix-ui/themes';

import { MergeType } from '../../types';
import { Bubble, BubbleProps } from './Bubble';
import { useFormatItems } from './hooks/useFormatData';
import { ChatUIThemeWrapper } from '../ChatUIThemeWrapper';

export type RoleType = Partial<Omit<BubbleProps, 'content' | 'theme'>>;
export type BubbleRoleProps = RoleType & {
  role: string;
  key?: string | number;
};

export type RolesType = Record<string, RoleType> | ((bubble: BubbleProps, index: number) => RoleType);

export type BubbleListProps = MergeType<{
  items: BubbleRoleProps[];
  roles: RolesType;
}>;

export const BubbleList: React.FC<BubbleListProps> = ({ theme, items, roles }) => {
  const [formattedItems] = useFormatItems(items, roles);

  const renderBubbleList = () => {
    return (
      <ScrollArea scrollbars="vertical">
        {formattedItems.map((item) => (
          <Bubble key={item.key} {...item} />
        ))}
      </ScrollArea>
    );
  };

  return <ChatUIThemeWrapper theme={theme}>{renderBubbleList()}</ChatUIThemeWrapper>;
};
