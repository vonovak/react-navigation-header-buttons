// @flow
/* eslint-env jest */

import { Item } from '../HeaderItems';
import { HeaderButtons } from '../HeaderButtons';
import { HeaderButton } from '../HeaderButton';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import React from 'react';

beforeEach(() => {
  jest.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => cb());
});

afterEach(() => {
  global.requestAnimationFrame.mockRestore();
});

describe('HeaderButtons', () => {
  it('renders button with pressable labels when Item is a direct or indirect child', () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();
    const WrappedItem = () => <Item title="Delete" onPress={deleteOnPress} />;
    const { getByText } = render(
      <HeaderButtons>
        <Item title="Search" onPress={searchOnPress} />
        <WrappedItem />
      </HeaderButtons>
    );
    fireEvent.press(getByText('Search'));
    expect(searchOnPress).toHaveBeenCalled();

    fireEvent.press(getByText('Delete'));
    expect(deleteOnPress).toHaveBeenCalled();
  });

  it('renders totally custom elements when provided', () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();
    const WrappedItem = () => <Text onPress={deleteOnPress}>Delete</Text>;
    const { getByText, UNSAFE_queryAllByType } = render(
      <HeaderButtons>
        <Text onPress={searchOnPress}>Search</Text>
        <WrappedItem />
      </HeaderButtons>
    );
    expect(UNSAFE_queryAllByType(Item)).toHaveLength(0);
    fireEvent.press(getByText('Search'));
    expect(searchOnPress).toHaveBeenCalled();

    fireEvent.press(getByText('Delete'));
    expect(deleteOnPress).toHaveBeenCalled();
  });

  it('renders button with pressable Icons when Item is a direct or indirect child', () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();
    const WrappedItem = () => {
      return (
        <Item
          title="delete"
          iconName="ios-delete"
          onPress={deleteOnPress}
          accessibilityLabel="delete"
        />
      );
    };
    const IoniconsHeaderButton = (props) => (
      <HeaderButton {...props} IconComponent={Text} iconSize={23} color="blue" />
    );
    const { queryAllByText, getByA11yLabel } = render(
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          iconName="ios-search"
          title="search"
          onPress={searchOnPress}
          accessibilityLabel="search"
        />
        <WrappedItem />
      </HeaderButtons>
    );
    expect(queryAllByText('Search')).toHaveLength(0);
    fireEvent.press(getByA11yLabel('search'));
    expect(searchOnPress).toHaveBeenCalled();

    expect(queryAllByText('Delete')).toHaveLength(0);
    fireEvent.press(getByA11yLabel('delete'));
    expect(deleteOnPress).toHaveBeenCalled();
  });

  it('props passed to HeaderButtonComponent or Item are passed through to HeaderButton and thus to the rendered result', () => {
    const searchOnPress = jest.fn();
    const CustomIconComponent = (props) => <Text {...props} />;
    const IoniconsHeaderButton = (props) => (
      <HeaderButton IconComponent={CustomIconComponent} iconSize={23} color="blue" {...props} />
    );
    const { UNSAFE_getAllByType } = render(
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item iconName="1" title="search" onPress={searchOnPress} iconSize={30} />
      </HeaderButtons>
    );
    const [item] = UNSAFE_getAllByType(HeaderButton);
    const {
      color,
      iconName,
      iconSize,
      title,
      renderButtonElement,
      IconComponent,
      onPress,
    } = item.props;
    expect(color).toBe('blue');
    expect(iconName).toBe('1');
    expect(iconSize).toBe(30);
    expect(title).toBe('search');
    expect(onPress).toBe(searchOnPress);
    expect(renderButtonElement).toBeInstanceOf(Function);
    expect(IconComponent).toBe(CustomIconComponent);
  });
});
