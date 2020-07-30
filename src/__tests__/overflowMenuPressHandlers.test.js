// @flow

/* eslint-env jest */
import React from 'react';
import { View } from 'react-native';
import {
  extractOverflowButtonData,
  overflowMenuPressHandlerActionSheet,
  overflowMenuPressHandlerPopupMenu,
} from '../overflowMenuPressHandlers';
import { ActionSheetIOS, UIManager } from 'react-native';
import { HiddenItem } from '../HeaderItems';
import { Divider } from '../overflowMenu/vendor/Divider';

describe('overflowMenuPressHandlers', () => {
  describe('extractOverflowButtonData', () => {
    it(
      'extracts titles, onPresses and destructive flags when given an array of ' +
        'HiddenItem or custom function components that render HiddenItem',
      () => {
        const prefix = 'customized_';
        const WrappedHiddenItem = ({ title, ...otherProps }) => (
          <HiddenItem title={prefix + title} {...otherProps} />
        );

        const propsArray = [
          { title: 'one', onPress: jest.fn() },
          { title: 'two', onPress: jest.fn() },
          { title: 'three', onPress: jest.fn(), destructive: true },
        ];
        const items = [
          ...propsArray.map((props) => <HiddenItem {...props} />),
          ...propsArray.map((props) => <WrappedHiddenItem {...props} />),
        ];
        const titlesAndOnPresses = extractOverflowButtonData(items);

        expect(titlesAndOnPresses).toStrictEqual([
          { title: propsArray[0].title, onPress: propsArray[0].onPress, destructive: undefined },
          { title: propsArray[1].title, onPress: propsArray[1].onPress, destructive: undefined },
          { title: propsArray[2].title, onPress: propsArray[2].onPress, destructive: true },
          {
            title: prefix + propsArray[0].title,
            onPress: propsArray[0].onPress,
            destructive: undefined,
          },
          {
            title: prefix + propsArray[1].title,
            onPress: propsArray[1].onPress,
            destructive: undefined,
          },
          {
            title: prefix + propsArray[2].title,
            onPress: propsArray[2].onPress,
            destructive: true,
          },
        ]);
      }
    );

    it('fails when hook / class component is used in the provided elements', () => {
      function MyComponent({ title, onPress }) {
        const [titleFromState] = React.useState('from state hook');
        return <HiddenItem title={titleFromState + title} onPress={onPress} />;
      }
      const propsArray = [
        { title: 'one', onPress: jest.fn() },
        { title: 'two', onPress: jest.fn() },
      ];
      const items = propsArray.map((props) => <MyComponent {...props} />);

      // would be nice if this worked but we can only call Hooks from React function components.
      // https://reactjs.org/docs/hooks-rules.html
      expect(() => extractOverflowButtonData(items)).toThrow(
        'There was an error extracting overflow button data from children of OverflowMenu.\n' +
          "      It's possible you didn't follow the limitation rules documented in readme.\n" +
          '      The nested error is: Invalid hook call. Hooks can only be called inside of the body of a function component.'
      );

      class Component extends React.Component<{}> {
        render() {
          return <View style={{ height: 20, width: 20 }} />;
        }
      }
      expect(() => extractOverflowButtonData(<Component />)).toThrow(
        'There was an error extracting overflow button data from children of OverflowMenu.\n' +
          "      It's possible you didn't follow the limitation rules documented in readme.\n" +
          '      The nested error is: Cannot call a class as a function'
      );
    });

    it('ignores custom components', () => {
      const SomeCustomComponent = () => <View style={{ height: 20, width: 20 }} />;
      const NestedComponent = () => <Divider />;
      const items = [<Divider />, <NestedComponent />, <SomeCustomComponent />];

      const titlesAndOnPresses = extractOverflowButtonData(items);

      expect(titlesAndOnPresses).toStrictEqual([]);
    });

    describe('corner cases', () => {
      const NestedHiddenItem = () => (
        <HiddenItem title="disabled-nested" onPress={jest.fn()} disabled />
      );
      const NullNestedComponent = () => null;

      it.each([
        [null],
        [undefined],
        [[<HiddenItem title="disabled" onPress={jest.fn()} disabled />]],
        [[<NestedHiddenItem />]],
        [[<NullNestedComponent />]],
      ])('extractOverflowButtonData works for case %#', (input) => {
        expect(extractOverflowButtonData(input)).toEqual([]);
      });
    });

    it('ignores invalid / non-element values', () => {
      const titlesAndOnPresses = extractOverflowButtonData([null, false, 'hello', 123]);
      expect(titlesAndOnPresses).toHaveLength(0);
    });

    it('works for single child element', () => {
      const props = { title: 'one', onPress: jest.fn() };
      expect(extractOverflowButtonData(<HiddenItem {...props} />)).toEqual([props]);
      expect(extractOverflowButtonData(null)).toEqual([]);
    });
  });

  describe('overflow button press handlers: given an array of {title, onPress}', () => {
    const hiddenButtons = [{ title: 'one', onPress: jest.fn() }];
    beforeEach(() => {
      ActionSheetIOS.showActionSheetWithOptions = jest.fn();
      // $FlowExpectedError
      UIManager.showPopupMenu = jest.fn();
    });

    it('overflowMenuPressHandlerActionSheet calls showActionSheetWithOption with correct params', () => {
      overflowMenuPressHandlerActionSheet({
        hiddenButtons,
        overflowButtonRef: null,
        children: null,
        _private_toggleMenu: jest.fn(),
      });
      expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledWith(
        {
          cancelButtonIndex: 0,
          destructiveButtonIndex: [],
          options: ['Cancel', 'one'],
        },
        expect.any(Function) // press callback
      );
    });

    it('overflowMenuPressHandlerActionSheet should call ActionSheet with correct destructiveButtonIndex param', () => {
      const hiddenButtonsWithDestructive = [
        { title: 'one', onPress: jest.fn() },
        { title: 'two', onPress: jest.fn(), destructive: true },
        { title: 'three', onPress: jest.fn(), destructive: true },
      ];
      overflowMenuPressHandlerActionSheet({
        hiddenButtons: hiddenButtonsWithDestructive,
        overflowButtonRef: null,
        children: null,
        _private_toggleMenu: jest.fn(),
      });
      expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledWith(
        {
          cancelButtonIndex: 0,
          destructiveButtonIndex: [2, 3],
          options: ['Cancel', 'one', 'two', 'three'],
        },
        expect.any(Function) // press callback
      );
    });

    it('overflowMenuPressHandlerPopupMenu calls showPopupMenu with correct params', () => {
      overflowMenuPressHandlerPopupMenu({
        hiddenButtons,
        children: null,
        overflowButtonRef: null,
        _private_toggleMenu: jest.fn(),
      });
      expect(UIManager.showPopupMenu).toHaveBeenCalledWith(
        null,
        ['one'],
        expect.any(Function), // error callback
        expect.any(Function) // press callback
      );
    });

    it.each([
      [overflowMenuPressHandlerPopupMenu],
      [overflowMenuPressHandlerActionSheet],
      // [overflowMenuPressHandlerDropdownMenu],
    ])(
      'native handlers throw on invalid params, user needs to filter them before provided; case %#',
      (handler) => {
        expect(() =>
          handler({
            hiddenButtons: null,
            overflowButtonRef: null,
            _private_toggleMenu: jest.fn(),
          })
        ).toThrow();
      }
    );
  });
});
