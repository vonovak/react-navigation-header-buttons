import * as React from 'react';
import { HeaderButton } from './HeaderButton';
import {
  HeaderButtonComponentContext,
  type HeaderButtonsComponentType,
} from './HeaderButtonComponentContext';
import { ButtonsWrapper, ButtonsWrapperProps } from './ButtonsWrapper';

export type HeaderButtonsProps = Pick<
  ButtonsWrapperProps,
  'left' | 'preset' | 'children'
> & {
  HeaderButtonComponent?: HeaderButtonsComponentType;
};

export const HeaderButtons = ({
  children,
  HeaderButtonComponent = HeaderButton,
  left = false,
  preset,
}: HeaderButtonsProps) => {
  return (
    <HeaderButtonComponentContext.Provider value={HeaderButtonComponent}>
      <ButtonsWrapper left={left} preset={preset}>
        {children}
      </ButtonsWrapper>
    </HeaderButtonComponentContext.Provider>
  );
};
