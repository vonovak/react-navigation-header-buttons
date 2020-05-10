// @flow
import { HiddenItem } from '../../HeaderItems';
import { fireEvent, render } from 'react-native-testing-library';
import { Text } from 'react-native';
import React from 'react';
import { OverflowMenu } from '../OverflowMenu';
import { overflowMenuPressHandlerDropdownMenu } from '../../overflowMenuPressHandlers';
import { OverflowMenuProvider } from '../OverflowMenuContext';
import { HeaderButtons } from '../../HeaderButtons';
import { ButtonsWrapper } from '../../ButtonsWrapper';

describe('overflowMenu', () => {
  it('onPress is given correct params when HiddenItem is a direct or indirect child', () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();
    const onPress = jest.fn();

    const WrappedItem = () => <HiddenItem title="delete" onPress={deleteOnPress} />;

    const { queryAllByText, getByA11yLabel } = render(
      <OverflowMenu OverflowIcon={<Text>+</Text>} onPress={onPress}>
        <HiddenItem icon={<Text>O</Text>} title="search" onPress={searchOnPress} />
        <HiddenItem title="search2" onPress={searchOnPress} disabled />
        <WrappedItem />
      </OverflowMenu>
    );
    expect(queryAllByText('Search')).toHaveLength(0);
    fireEvent.press(getByA11yLabel('More options'));
    expect(onPress).toHaveBeenCalledWith({
      hiddenButtons: [
        { title: 'search', onPress: searchOnPress },
        { title: 'delete', onPress: deleteOnPress },
      ],
      overflowButtonRef: expect.any(Object),
      children: expect.any(Array),
      _private_toggleMenu: expect.any(Function),
    });
  });

  it('renders dropdown material menu correctly', () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();

    const WrappedItem = () => <HiddenItem title="delete" onPress={deleteOnPress} />;

    const { queryAllByText, getByA11yLabel, UNSAFE_getByProps } = render(
      <OverflowMenu OverflowIcon={<Text>+</Text>} onPress={overflowMenuPressHandlerDropdownMenu}>
        <HiddenItem icon={<Text>O</Text>} title="search" onPress={searchOnPress} />
        <HiddenItem title="search2" onPress={searchOnPress} disabled />
        <WrappedItem />
      </OverflowMenu>,
      { wrapper: OverflowMenuProvider }
    );
    expect(queryAllByText('Search')).toHaveLength(0);

    const menuAnchor = UNSAFE_getByProps({ collapsable: false });
    menuAnchor.instance.measureInWindow = (callback) => {
      callback(0, 0, 100);
    };
    fireEvent.press(getByA11yLabel('More options'));

    expect(queryAllByText('search')).toHaveLength(1);
    expect(queryAllByText('search2')).toHaveLength(1);
    expect(queryAllByText('delete')).toHaveLength(1);
  });

  it(
    'OverflowMenu, when rendered inside HeaderButtons which has left=false/true (false by default)' +
      'will not render extra margin which was already rendered by HeaderButtons',
    () => {
      const ReusableOverflowMenu = ({ children }) => {
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
        {
          flexDirection: 'row',
          justifyContent: 'center',
        },
        { marginRight: 5 },
      ]);
      expect(buttonWrappers[1].children[0].props.style).toStrictEqual({
        flexDirection: 'row',
        justifyContent: 'center',
      });
    }
  );
});
