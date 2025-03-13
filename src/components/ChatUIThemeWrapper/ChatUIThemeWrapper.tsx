import React, { useMemo } from 'react';
import { Theme } from '@radix-ui/themes';

import { ChatUITheme } from '../../types';
import { defaultTheme } from '../../utils/config';

import '@radix-ui/themes/styles.css';

export interface ChatUIThemeWrapperProps extends ChatUITheme {
  theme?: ChatUITheme;
}

export const ChatUIThemeWrapper: React.FC<ChatUIThemeWrapperProps> = ({ children, theme }) => {
  const mergedTheme = useMemo(() => {
    return {
      ...defaultTheme,
      ...theme,
    };
  }, [theme]);

  return <Theme {...mergedTheme}>{children}</Theme>;
};
