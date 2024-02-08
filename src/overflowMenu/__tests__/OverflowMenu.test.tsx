import { HiddenItem } from '../../HeaderItems';
import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import React from 'react';
import { OverflowMenu } from '../OverflowMenu';
import {
  OnOverflowMenuPressParams,
  overflowMenuPressHandlerDropdownMenu,
} from '../overflowMenuPressHandlers';
import { HeaderButtonsProvider } from '../OverflowMenuContext';
import { HeaderButtons } from '../../HeaderButtons';
import { ButtonsWrapper } from '../../ButtonsWrapper';

beforeEach(() => {
  jest.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});

afterEach(() => {
  // @ts-ignore
  global.requestAnimationFrame.mockRestore();
});

describe('overflowMenu', () => {
  it('onPress is given correct params when HiddenItem is a direct or indirect child', () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();
    const onPress = jest.fn();

    const WrappedItem = () => (
      <HiddenItem title="delete" onPress={deleteOnPress} />
    );

    const { queryAllByText, getByLabelText } = render(
      <OverflowMenu OverflowIcon={<Text>+</Text>} onPress={onPress}>
        <HiddenItem
          icon={<Text>O</Text>}
          title="search"
          onPress={searchOnPress}
        />
        <HiddenItem title="search2" onPress={searchOnPress} disabled />
        <WrappedItem />
      </OverflowMenu>
    );
    expect(queryAllByText('Search')).toHaveLength(0);
    fireEvent.press(getByLabelText('More options'));
    const mockCall: OnOverflowMenuPressParams = onPress.mock.calls[0][0];
    const hiddenButtons = mockCall.hiddenButtons.map((it) => ({
      title: it.title,
      onPress: it.onPress,
      destructive: it.destructive,
      disabled: it.disabled,
    }));
    expect({ ...mockCall, hiddenButtons }).toStrictEqual({
      hiddenButtons: [
        {
          title: 'search',
          onPress: searchOnPress,
          destructive: undefined,
          disabled: undefined,
        },
        {
          title: 'search2',
          onPress: searchOnPress,
          destructive: undefined,
          disabled: true,
        },
        {
          title: 'delete',
          onPress: deleteOnPress,
          destructive: undefined,
          disabled: undefined,
        },
      ],
      overflowButtonRef: expect.any(Object),
      children: expect.any(Array),
      presentMenu: expect.any(Function),
      closeMenu: expect.any(Function),
    });
  });

  it('renders dropdown material menu correctly', () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();

    const WrappedItem = () => (
      <HiddenItem title="delete" onPress={deleteOnPress} />
    );

    const { queryAllByText, getByLabelText, UNSAFE_queryAllByProps } = render(
      <OverflowMenu
        OverflowIcon={<Text>+</Text>}
        onPress={overflowMenuPressHandlerDropdownMenu}
      >
        <HiddenItem
          icon={<Text>O</Text>}
          title="search"
          onPress={searchOnPress}
        />
        <HiddenItem title="search2" onPress={searchOnPress} disabled />
        <WrappedItem />
      </OverflowMenu>,
      { wrapper: HeaderButtonsProvider }
    );
    expect(queryAllByText('Search')).toHaveLength(0);

    const menuAnchor = UNSAFE_queryAllByProps({ collapsable: false })[0];
    menuAnchor.instance.measureInWindow = (callback: any) => {
      callback(0, 0, 100);
    };
    fireEvent.press(getByLabelText('More options'));

    expect(queryAllByText('search')).toHaveLength(1);
    expect(queryAllByText('search2')).toHaveLength(1);
    expect(queryAllByText('delete')).toHaveLength(1);
  });

  it(
    'OverflowMenu, when rendered inside HeaderButtons which has left=false/true (false by default)' +
      'will not render extra margin which was already rendered by HeaderButtons',
    () => {
      const ReusableOverflowMenu = ({
        children,
      }: {
        children: React.ReactNode;
      }) => {
        return (
          <OverflowMenu
            OverflowIcon={<Text>+</Text>}
            onPress={overflowMenuPressHandlerDropdownMenu}
          >
            {children}
          </OverflowMenu>
        );
      };
      const { UNSAFE_getAllByType } = render(
        <HeaderButtons>
          <ReusableOverflowMenu>
            <HiddenItem title="search2" onPress={() => jest.fn()} />
          </ReusableOverflowMenu>
        </HeaderButtons>
      );
      const buttonWrappers = UNSAFE_getAllByType(ButtonsWrapper);
      expect(buttonWrappers[0].children[0].props.style).toStrictEqual([
        { columnGap: 24, flexDirection: 'row', justifyContent: 'flex-end' },
        { marginRight: 15 },
        undefined,
      ]);
      expect(buttonWrappers[1].children[0].props.style).toStrictEqual([
        { columnGap: 24, flexDirection: 'row', justifyContent: 'flex-end' },
        undefined,
        { columnGap: 0 },
      ]);
    }
  );

  describe('should not render overflow button when', () => {
    it('only single falsy child is specified', () => {
      const onPress = jest.fn();

      const { toJSON } = render(
        <OverflowMenu OverflowIcon={<Text>+</Text>} onPress={onPress}>
          {null}
        </OverflowMenu>
      );

      expect(toJSON()).toBeNull();
    });

    it('only falsy children are specified', () => {
      const onPress = jest.fn();

      const { toJSON } = render(
        <OverflowMenu OverflowIcon={<Text>+</Text>} onPress={onPress}>
          {false}
          {null}
        </OverflowMenu>
      );

      expect(toJSON()).toBeNull();
    });
  });
});
