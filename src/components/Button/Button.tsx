import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cx from 'clsx';
import { Button as ButtonPrimitive } from '@radix-ui/themes';

import './Button.scss';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button: FC<IButtonProps> = ({ onClick, disabled, className, children, ...rest }) => (
  <ButtonPrimitive
    className={cx(className, { 'button--dsiabled': disabled })}
    onClick={onClick}
    disabled={disabled}
    color="blue"
    {...rest}
  >
    {children}
  </ButtonPrimitive>
);
