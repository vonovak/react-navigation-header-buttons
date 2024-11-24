/* eslint-env jest */

import { Item } from '../HeaderItems';
import { HeaderButtons } from '../HeaderButtons';
import { HeaderButton, HeaderButtonProps } from '../HeaderButton';
import { fireEvent } from '@testing-library/react-native';
import { Text, TextProps } from 'react-native';
import React from 'react';
import { wrappedRender } from './_wrappedRender';

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

describe('HeaderButtons', () => {
  it('renders button with pressable labels when Item is a direct or indirect child', () => {
    const searchOnPress = jest.fn();
    const deleteOnPress = jest.fn();
    const WrappedItem = () => <Item title="Delete" onPress={deleteOnPress} />;
    const { getByText } = wrappedRender(
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
    const { getByText, UNSAFE_queryAllByType } = wrappedRender(
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
          accessibilityHint="delete"
        />
      );
    };
    const IoniconsHeaderButton = (props: HeaderButtonProps) => (
      <HeaderButton
        {...props}
        IconComponent={({ name }: { name: any }) => <Text>{name}</Text>}
        iconSize={23}
        color="blue"
      />
    );
    const { queryAllByText, getByAccessibilityHint } = wrappedRender(
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          iconName="ios-search"
          title="search"
          onPress={searchOnPress}
          accessibilityHint="search"
        />
        <WrappedItem />
      </HeaderButtons>
    );
    expect(queryAllByText('Search')).toHaveLength(0);
    fireEvent.press(getByAccessibilityHint('search'));
    expect(searchOnPress).toHaveBeenCalled();

    expect(queryAllByText('Delete')).toHaveLength(0);
    fireEvent.press(getByAccessibilityHint('delete'));
    expect(deleteOnPress).toHaveBeenCalled();
  });

  it('props passed to HeaderButtonComponent or Item are passed through to HeaderButton and thus to the rendered result', () => {
    const searchOnPress = jest.fn();
    const CustomIconComponent = (props: TextProps) => <Text {...props} />;
    const IoniconsHeaderButton = (props: HeaderButtonProps) => (
      <HeaderButton
        IconComponent={CustomIconComponent}
        iconSize={23}
        color="blue"
        {...props}
      />
    );
    const { UNSAFE_getAllByType } = wrappedRender(
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          iconName="1"
          title="search"
          onPress={searchOnPress}
          iconSize={30}
        />
      </HeaderButtons>
    );
    const [item] = UNSAFE_getAllByType(HeaderButton);
    const { color, iconName, iconSize, title, IconComponent, onPress } =
      item.props;
    expect(color).toBe('blue');
    expect(iconName).toBe('1');
    expect(iconSize).toBe(30);
    expect(title).toBe('search');
    expect(onPress).toBe(searchOnPress);
    expect(IconComponent).toBe(CustomIconComponent);
  });
});
