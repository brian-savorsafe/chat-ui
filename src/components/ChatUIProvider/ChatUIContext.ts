import React, { createContext } from 'react';

import { ChatUIOptions } from '../../types';

export type ChatUIContextType = React.PropsWithChildren<ChatUIOptions>;

const defaultContext: ChatUIContextType = {};

export const ChatUIContext = createContext<ChatUIContextType>(defaultContext);
