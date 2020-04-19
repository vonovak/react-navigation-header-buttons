// @flow
import { HiddenItem } from '../../HeaderItems';
import { fireEvent, render, flushMicrotasksQueue } from 'react-native-testing-library';
import { Text } from 'react-native';
import React from 'react';
import { OverflowMenu } from '../OverflowMenu';

describe('overflow menu tests', () => {
  it('correctly reacts to overflow button press when HiddenItem is a direct or indirect child', async () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();
    const onPress = jest.fn();

    const WrappedItem = () => <HiddenItem title="delete" onPress={deleteOnPress} />;

    const { queryAllByText, getByA11yLabel } = render(
      <OverflowMenu OverflowIcon={<Text>+</Text>} onPress={onPress}>
        <HiddenItem title="search" onPress={searchOnPress} />
        <HiddenItem title="search" onPress={searchOnPress} disabled />
        <WrappedItem />
      </OverflowMenu>
    );
    expect(queryAllByText('Search')).toHaveLength(0);
    fireEvent.press(getByA11yLabel('More options'));
    await flushMicrotasksQueue();
    expect(onPress).toHaveBeenCalledWith({
      hiddenButtons: [
        { title: 'search', onPress: searchOnPress },
        { title: 'delete', onPress: deleteOnPress },
      ],
      overflowButtonRef: expect.any(Object),
      children: expect.any(Array),
      _private_toggleMenu: undefined,
    });
  });
});
