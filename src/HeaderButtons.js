/*
 * @flow
 */
import * as React from 'react';
import { HeaderButton } from './HeaderButton';
import { HeaderButtonsContext } from './HeaderButtonsContext';
import { ButtonsWrapper } from './ButtonsWrapper';

type HeaderButtonsProps = {|
  children: React.Node,
  left: boolean,
  HeaderButtonComponent: React.ComponentType<any>,
|};

export function HeaderButtons({ HeaderButtonComponent, children, left }: HeaderButtonsProps) {
  return (
    <HeaderButtonsContext.Provider value={HeaderButtonComponent}>
      <ButtonsWrapper left={left}>{children}</ButtonsWrapper>
    </HeaderButtonsContext.Provider>
  );
}

HeaderButtons.defaultProps = {
  left: false,
  HeaderButtonComponent: HeaderButton,
};
