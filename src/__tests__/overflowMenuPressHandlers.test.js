// @flow

/* eslint-env jest */
import React from 'react';
import {
  extractOverflowButtonData,
  overflowMenuPressHandlerActionSheet,
  overflowMenuPressHandlerPopupMenu,
} from '../overflowMenuPressHandlers';
import { ActionSheetIOS, UIManager, Text } from 'react-native';
import { HiddenItem } from '../HeaderItems';
import { Divider } from '../overflowMenu/vendor/Divider';

describe('extractOverflowButtonData', () => {
  describe('extracts titles, onPresses and element types when given an array of', () => {
    it('HiddenItem or custom function components that render HiddenItem', () => {
      const prefix = 'customized_';
      const MyComponent = ({ title, onPress }) => (
        <HiddenItem title={prefix + title} onPress={onPress} />
      );

      const propsArray = [
        { title: 'one', onPress: jest.fn() },
        { title: 'two', onPress: jest.fn() },
      ];
      const items = [
        ...propsArray.map((props) => <HiddenItem {...props} />),
        ...propsArray.map((props) => <MyComponent {...props} />),
      ];
      const titlesAndOnPresses = extractOverflowButtonData(items);

      expect(titlesAndOnPresses).toStrictEqual([
        { title: propsArray[0].title, onPress: propsArray[0].onPress },
        { title: propsArray[1].title, onPress: propsArray[1].onPress },
        { title: prefix + propsArray[0].title, onPress: propsArray[0].onPress },
        { title: prefix + propsArray[1].title, onPress: propsArray[1].onPress },
      ]);
    });

    it('ItemDivider or custom function components that render ItemDivider', () => {
      const NestedComponent = () => <Divider />;
      const NullNestedComponent = () => null;
      const items = [<Divider />, <NestedComponent />, <NullNestedComponent />];

      const titlesAndOnPresses = extractOverflowButtonData(items);

      expect(titlesAndOnPresses).toStrictEqual([]);
    });
  });

  const NestedHiddenItem = () => (
    <HiddenItem title="disabled-nested" onPress={jest.fn()} disabled />
  );
  it.each([
    [null],
    [undefined],
    [[<HiddenItem title="disabled" onPress={jest.fn()} disabled />]],
    [[<NestedHiddenItem title="disabled" onPress={jest.fn()} disabled />]],
  ])('extractOverflowButtonData works for case %#', (input) => {
    expect(extractOverflowButtonData(input)).toEqual([]);
  });

  it('fails when hook is used in the hidden component', () => {
    function MyComponent({ title, onPress }) {
      const [titleFromState, setTitle] = React.useState('from state hook');
      return <HiddenItem title={titleFromState + title} onPress={onPress} />;
    }
    const propsArray = [
      { title: 'one', onPress: jest.fn() },
      { title: 'two', onPress: jest.fn() },
    ];
    const items = propsArray.map((props) => <MyComponent {...props} />);

    // would be nice if this worked but we can only call Hooks from React function components.
    // https://reactjs.org/docs/hooks-rules.html
    expect(() => extractOverflowButtonData(items)).toThrow();
  });

  it('ignores invalid / non-element values', () => {
    // $FlowExpectedError
    const titlesAndOnPresses = extractOverflowButtonData([null, false, 'hello', 123]);
    expect(titlesAndOnPresses).toHaveLength(0);
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
    });
    expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledWith(
      {
        cancelButtonIndex: 0,
        options: ['Cancel', 'one'],
      },
      expect.any(Function) // press callback
    );
  });

  it('overflowMenuPressHandlerPopupMenu calls showPopupMenu with correct params', () => {
    overflowMenuPressHandlerPopupMenu({
      hiddenButtons,
      overflowButtonRef: null,
    });
    expect(UIManager.showPopupMenu).toHaveBeenCalledWith(
      null,
      ['one'],
      expect.any(Function), // error callback
      expect.any(Function) // press callback
    );
  });

  it('both handlers do not handle invalid params, user needs to filter them before provded', () => {
    expect(() =>
      overflowMenuPressHandlerPopupMenu({
        // $FlowExpectedError
        hiddenButtons: null,
        overflowButtonRef: null,
      })
    ).toThrow();
    expect(() =>
      overflowMenuPressHandlerActionSheet({
        // $FlowExpectedError
        hiddenButtons: null,
        overflowButtonRef: null,
      })
    ).toThrow();
  });
});
