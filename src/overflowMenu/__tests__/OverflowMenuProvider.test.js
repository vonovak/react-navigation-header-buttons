// @flow
import { OverflowMenuProvider, OverflowMenuContext } from '../OverflowMenuContext';
import { Text } from 'react-native';
import { render, fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import React from 'react';

describe('OverflowMenuProvider renders', () => {
  it('only the child when menu is not shown', () => {
    const { toJSON } = render(
      <OverflowMenuProvider>
        <Text>hello</Text>
      </OverflowMenuProvider>
    );
    expect(toJSON()).toMatchInlineSnapshot(`
      <Text>
        hello
      </Text>
    `);
  });

  it('the child and the menu, when it is displayed by calling toggleMenu() provided by OverflowMenuContext', async () => {
    const menuItemLabel = 'menu item';
    const showMenuLabel = 'show menu';

    const ButtonThatShowsMenu = () => {
      const toggleMenu = React.useContext(OverflowMenuContext);
      return (
        <Text
          onPress={() => {
            toggleMenu({ elements: <Text key="1">{menuItemLabel}</Text>, x: 0, y: 0 });
          }}
        >
          {showMenuLabel}
        </Text>
      );
    };
    const { toJSON, getByText } = render(
      <OverflowMenuProvider>
        <ButtonThatShowsMenu />
      </OverflowMenuProvider>
    );

    const beforeShown = toJSON();
    fireEvent.press(getByText(showMenuLabel));
    expect(toJSON()).toMatchSnapshot();
    getByText(menuItemLabel);
    fireEvent.press(getByText(showMenuLabel));
    await flushMicrotasksQueue();

    const afterHidden = toJSON();
    expect(afterHidden).toStrictEqual(beforeShown);
  });
});
