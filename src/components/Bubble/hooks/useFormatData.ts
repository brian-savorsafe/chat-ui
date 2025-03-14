import { useCallback, useMemo } from 'react';

import { BubbleListProps, BubbleRoleProps, RolesType } from '../BubbleList';

type BubbleItems = BubbleListProps['items'];

export const useFormatItems = (items: BubbleItems, roles: RolesType) => {
  const formatRoles = useCallback(
    (bubble: BubbleRoleProps, index: number) => {
      if (typeof roles === 'function') {
        return roles(bubble, index);
      }

      return roles[bubble.role] || {};
    },
    [roles],
  );

  const formattedItems = useMemo<BubbleItems>(() => {
    return (items || []).map((item, index) => {
      const key = item.key ?? `bubble-${index}`;

      return {
        ...item,
        ...formatRoles(item, index),
        key,
      };
    });
  }, [items, formatRoles]);

  return [formattedItems];
};
