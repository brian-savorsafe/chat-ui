import { ThemeProps } from '@radix-ui/themes';

export type ChatUITheme = ThemeProps;

export type ChatUIOptions = {
  [key: string]: unknown;
};

export type MergeType<T> = T & {
  theme?: ChatUITheme;
};
