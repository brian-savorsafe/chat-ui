import React, { useMemo } from 'react';

import { ChatUIOptions, ChatUITheme } from '../../types';
import { defaultTheme } from '../../utils/config';
import { ChatUIThemeWrapper } from '../ChatUIThemeWrapper';
import { ChatUIContext, ChatUIContextType } from './ChatUIContext';

import '@radix-ui/themes/styles.css';

export interface ChatUIProviderProps extends ChatUIContextType {
  theme?: ChatUITheme;
  options?: ChatUIOptions;
}

export const ChatUIProvider: React.FC<ChatUIProviderProps> = ({ children, theme, options }) => {
  const mergedTheme = useMemo(() => {
    return {
      ...defaultTheme,
      ...theme,
    };
  }, [theme]);

  return (
    <ChatUIThemeWrapper theme={mergedTheme}>
      <ChatUIContext.Provider value={options || {}}>{children}</ChatUIContext.Provider>
    </ChatUIThemeWrapper>
  );
};
