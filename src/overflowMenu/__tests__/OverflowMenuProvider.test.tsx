import { HeaderButtonsProvider, useOverflowMenu } from '../OverflowMenuContext';
import { Text } from 'react-native';
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

  it('the child and the menu item, when it is displayed by calling toggleMenu() that is provided by OverflowMenuContext', async () => {
    const menuItemLabel = 'overflow menu item';
    const showMenuLabel = 'show menu';

    const ButtonThatShowsMenu = () => {
      const { toggleMenu } = useOverflowMenu();
      return (
        <Text
          onPress={() => {
            toggleMenu({
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
    const { toJSON, getByText } = render(
      <HeaderButtonsProvider stackType={'js'}>
        <ButtonThatShowsMenu />
      </HeaderButtonsProvider>
    );

    const toggleMenuShown = () => fireEvent.press(getByText(showMenuLabel));

    const beforeShown = toJSON();
    toggleMenuShown();
    expect(toJSON()).toMatchSnapshot();
    getByText(menuItemLabel);
    toggleMenuShown();

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
