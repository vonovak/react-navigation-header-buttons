import { HeaderButtonsProvider, useOverflowMenu } from '../OverflowMenuContext';
import { Text, View } from 'react-native';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import React from 'react';

describe('HeaderButtonsProvider renders', () => {
  it('only the child when menu is not shown', () => {
    const { toJSON } = render(
      <HeaderButtonsProvider stackType={'js'}>
        <Text>hello</Text>
      </HeaderButtonsProvider>
    );
    expect(toJSON()).toMatchInlineSnapshot(`
      <Text>
        hello
      </Text>
    `);
  });

  it('the child and the menu item, when it is displayed by calling presentMenu() that is provided by OverflowMenuContext', async () => {
    const menuItemLabel = 'overflow menu item';
    const showMenuLabel = 'show menu';
    const hideMenuLabel = 'hide menu';

    const ButtonThatShowsMenu = () => {
      const { presentMenu } = useOverflowMenu();
      return (
        <Text
          onPress={() => {
            presentMenu({
              elements: <Text key="1">{menuItemLabel}</Text>,
              x: 0,
              y: 0,
            });
          }}
        >
          {showMenuLabel}
        </Text>
      );
    };
    const ButtonThatHidesMenu = () => {
      const { closeMenu } = useOverflowMenu();
      return (
        <Text
          onPress={() => {
            closeMenu();
          }}
        >
          {hideMenuLabel}
        </Text>
      );
    };
    const { toJSON, getByText } = render(
      <HeaderButtonsProvider stackType={'js'}>
        <View>
          <ButtonThatShowsMenu />
          <ButtonThatHidesMenu />
        </View>
      </HeaderButtonsProvider>
    );

    const presentMenu = () => fireEvent.press(getByText(showMenuLabel));
    const hideMenu = () => fireEvent.press(getByText(hideMenuLabel));

    const beforeShown = toJSON();
    presentMenu();
    expect(toJSON()).toMatchSnapshot();
    getByText(menuItemLabel);
    hideMenu();

    const waitForMenuToHide = async () => {
      await waitForElementToBeRemoved(() => getByText(menuItemLabel), {
        timeout: 800,
      });
    };
    await waitForMenuToHide();

    const afterHidden = toJSON();
    expect(afterHidden).toStrictEqual(beforeShown);
  });
});
