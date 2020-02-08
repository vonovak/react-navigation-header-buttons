// @flow
import { getOnPressForMode, modes, OverflowMenu } from '../OverflowMenu';
import { HiddenItem } from '../../HeaderItems';
import { fireEvent, render, flushMicrotasksQueue } from 'react-native-testing-library';
import { Text } from 'react-native';
import React from 'react';

const showNativeMenu = jest.fn().mockName('showNativeMenu');
const toggleDropdownMenu = jest.fn().mockName('toggleDropdownMenu');
const customOnPress = jest.fn().mockName('customOnPress');

const { DEFAULT, ALTERNATIVE, DROPDOWN_MENU, CUSTOM } = modes;

describe('overflow menu tests', () => {
  describe('getOnPressForMode', () => {
    it.each([
      ['android', DEFAULT, toggleDropdownMenu],
      ['ios', DEFAULT, showNativeMenu],
      //
      ['android', ALTERNATIVE, showNativeMenu],
      ['ios', ALTERNATIVE, showNativeMenu],
      //
      ['android', DROPDOWN_MENU, toggleDropdownMenu],
      ['ios', DROPDOWN_MENU, toggleDropdownMenu],
      //
      ['android', CUSTOM, customOnPress],
      ['ios', CUSTOM, customOnPress],
    ])('returns correct handler for platform %s, mode %s', (platform, mode, expected) => {
      jest.resetModules();
      // test env defaults to using the ios module so mock that one
      jest.mock('react-native/Libraries/Utilities/Platform.ios', () => {
        return jest.requireActual(`react-native/Libraries/Utilities/Platform.${platform}.js`);
      });

      const firedOnPress = getOnPressForMode(
        mode,
        showNativeMenu,
        toggleDropdownMenu,
        customOnPress
      );
      expect(firedOnPress).toBe(expected);
    });

    it('throws for invalid mode', () => {
      expect(() =>
        // $FlowExpectedError
        getOnPressForMode('some invalid mode', showNativeMenu, toggleDropdownMenu, customOnPress)
      ).toThrow();
    });
  });

  it('correctly reacts to overflow button press when HiddenItem is a direct or indirect child', async () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();
    const onOverflowMenuPress = jest.fn();

    const WrappedItem = () => <HiddenItem title="delete" onPress={deleteOnPress} />;

    const { queryAllByText, getByA11yLabel } = render(
      <OverflowMenu
        mode={modes.CUSTOM}
        OverflowIcon={<Text>+</Text>}
        onOverflowMenuPress={onOverflowMenuPress}
      >
        <HiddenItem title="search" onPress={searchOnPress} />
        <HiddenItem title="search" onPress={searchOnPress} disabled />
        <WrappedItem />
      </OverflowMenu>
    );
    expect(queryAllByText('Search')).toHaveLength(0);
    fireEvent.press(getByA11yLabel('More options'));
    await flushMicrotasksQueue();
    expect(onOverflowMenuPress).toHaveBeenCalledWith({
      hiddenButtons: [
        { title: 'search', onPress: searchOnPress },
        { title: 'delete', onPress: deleteOnPress },
      ],
      overflowButtonRef: expect.any(Object),
    });
  });
});
