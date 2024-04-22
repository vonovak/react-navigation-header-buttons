import { useOverflowMenu } from '../OverflowMenuContext';
import { Text, View } from 'react-native';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import React from 'react';
import { HeaderButtonsProviderDropdownMenu } from '../HeaderButtonsProviderDropdownMenu';
import { HeaderButtonsProviderPlain } from '../HeaderButtonsProviderPlain';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as child_process from 'node:child_process';

describe('HeaderButtonsProvider renders', () => {
  it('only the child when menu is not shown', () => {
    const { toJSON } = render(
      <HeaderButtonsProviderDropdownMenu stackType={'js'}>
        <Text>hello</Text>
      </HeaderButtonsProviderDropdownMenu>
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
      <HeaderButtonsProviderDropdownMenu stackType={'js'}>
        <View>
          <ButtonThatShowsMenu />
          <ButtonThatHidesMenu />
        </View>
      </HeaderButtonsProviderDropdownMenu>
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

  it('warning is shown if presenting menu is called but wrong provider was used', () => {
    const menuItemLabel = 'overflow menu item';
    const showMenuLabel = 'show menu';

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

    const { getByText } = render(
      <HeaderButtonsProviderPlain stackType={'js'}>
        <View>
          <ButtonThatShowsMenu />
        </View>
      </HeaderButtonsProviderPlain>
    );

    const presentMenu = () => fireEvent.press(getByText(showMenuLabel));
    const originalWarn = console.warn;
    console.warn = jest.fn();
    presentMenu();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        `It seems like you tried to open / close the overflow menu using the overflowMenuPressHandlerDropdownMenu, but you forgot to wrap your root component in <HeaderButtonsProviderDropdownMenu />.`
      )
    );
    console.warn = originalWarn;
  });

  it('should match the expected modules snapshot', () => {
    // TODO improve detection of the example path
    const cwd = process.cwd();
    const examplePath = `${cwd}/example/`;
    child_process.execSync(
      `cd ${examplePath} && yarn requires-ios && yarn requires-android`
    );

    // Read the output from the file
    const outputIos = fs.readFileSync(
      path.join(examplePath, `requires-ios.txt`),
      'utf8'
    );
    const outputAndroid = fs.readFileSync(
      path.join(examplePath, `requires-android.txt`),
      'utf8'
    );

    const filteredIos = outputIos
      .split('\n')
      .filter((line) => line.includes('header-buttons/src'))
      .map((path) => {
        // return file name only
        return path.split('/').pop();
      });
    const filteredAndroid = outputAndroid
      .split('\n')
      .filter((line) => line.includes('header-buttons/src'))
      .map((path) => {
        // return file name only
        return path.split('/').pop();
      });

    expect(filteredIos).not.toContain('Menu.tsx');
    expect(filteredIos).not.toContain('HeaderButtonsProviderDropdownMenu.tsx');
    expect(filteredAndroid).toContain('HeaderButtonsProviderDropdownMenu.tsx');
    expect(filteredAndroid).toContain('Menu.tsx');

    expect(filteredIos).toMatchInlineSnapshot(`
      [
        "HeaderButtonsProvider.tsx",
        "HeaderButtonsProvider.ios.tsx",
        "HeaderButtonsProviderPlain.tsx",
        "ButtonsWrapper.tsx",
        "index.ts",
        "HeaderButtonComponentContext.tsx",
        "HeaderButton.tsx",
        "HeaderButtons.tsx",
        "overflowMenuPressHandlers.ts",
        "HeaderItems.tsx",
        "OverflowMenuContext.tsx",
        "MenuItem.tsx",
        "OverflowMenu.tsx",
        "e2e.js",
        "Divider.tsx",
      ]
    `);
  }, 20000);
});
