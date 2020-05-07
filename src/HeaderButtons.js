/*
 * @flow
 */
import * as React from 'react';
import { HeaderButton } from './HeaderButton';
import { HeaderButtonsContext } from './HeaderButtonsContext';
import { OverflowMenu } from './overflowMenu/OverflowMenu';
import { ButtonsWrapper } from './ButtonsWrapper';

type HeaderButtonsProps = {|
  children: React.Node,
  left: boolean,
  HeaderButtonComponent: React.ComponentType<any>,
|};

export function HeaderButtons({ HeaderButtonComponent, children, left }: HeaderButtonsProps) {
  return (
    <HeaderButtonsContext.Provider value={HeaderButtonComponent}>
      <ButtonsWrapper left={left}>
        {React.Children.map(children, (child) => {
          if (child.type !== OverflowMenu) {
            return child;
          } else {
            // we do this to support OverflowMenu being rendered
            // by itself - without HeaderButtons
            return React.cloneElement(child, { left: null });
          }
        })}
      </ButtonsWrapper>
    </HeaderButtonsContext.Provider>
  );
}

HeaderButtons.defaultProps = {
  left: false,
  HeaderButtonComponent: HeaderButton,
};
