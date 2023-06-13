import * as React from 'react';
import { HeaderButton } from './HeaderButton';
import {
  HeaderButtonComponentContext,
  type HeaderButtonsComponentType,
} from './HeaderButtonComponentContext';
import { ButtonsWrapper } from './ButtonsWrapper';

type HeaderButtonsProps = {
  children: React.ReactNode;
  left?: boolean;
  HeaderButtonComponent?: HeaderButtonsComponentType;
};

export const HeaderButtons = ({
  children,
  HeaderButtonComponent = HeaderButton,
  left = false,
}: HeaderButtonsProps) => {
  return (
    <HeaderButtonComponentContext.Provider value={HeaderButtonComponent}>
      <ButtonsWrapper left={left}>{children}</ButtonsWrapper>
    </HeaderButtonComponentContext.Provider>
  );
};
