// @flow
import { OverflowMenuProvider, OverflowMenuContext } from '../OverflowMenuContext';
import { Text } from 'react-native';
import { render, fireEvent } from 'react-native-testing-library';
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

  it('the child and the menu item, when it is displayed by calling toggleMenu() provided by OverflowMenuContext', async () => {
    const menuItemLabel = 'overflow menu item';
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
    const { toJSON, getByText, findByText } = render(
      <OverflowMenuProvider>
        <ButtonThatShowsMenu />
      </OverflowMenuProvider>
    );

    const beforeShown = toJSON();
    fireEvent.press(getByText(showMenuLabel));
    expect(toJSON()).toMatchSnapshot();
    getByText(menuItemLabel);
    fireEvent.press(getByText(showMenuLabel));

    const waitForMenuToHide = async () => {
      await expect(findByText(menuItemLabel, { timeout: 500 })).rejects.toBeTruthy();
    };
    await waitForMenuToHide();

    const afterHidden = toJSON();
    expect(afterHidden).toStrictEqual(beforeShown);
  });
});
