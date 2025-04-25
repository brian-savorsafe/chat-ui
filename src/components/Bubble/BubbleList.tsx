import React from 'react';
import { ScrollArea } from '@radix-ui/themes';

import { Bubble, BubbleProps } from './Bubble';
import { useFormatItems } from './hooks/useFormatData';

export type RoleType = Partial<Omit<BubbleProps, 'content' | 'theme'>>;
export type BubbleRoleProps = RoleType & {
  role: string;
  key?: string | number;
};

export type RolesType = Record<string, RoleType> | ((bubble: BubbleProps, index: number) => RoleType);

export type BubbleListProps = {
  items?: BubbleRoleProps[];
  roles?: RolesType;
  children?: React.ReactNode;
};

export const BubbleList: React.FC<BubbleListProps> = ({ items, roles, children }) => {
  const [formattedItems] = useFormatItems(items, roles);

  const renderBubbleList = () => {
    return (
      <ScrollArea scrollbars="vertical">
        {children || formattedItems?.map((item) => <Bubble key={item.key} {...item} />)}
      </ScrollArea>
    );
  };

  return renderBubbleList();
};
