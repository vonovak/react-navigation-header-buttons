/*
 * @flow
 */
import * as React from 'react';
import { HeaderButton, type HeaderButtonProps, type VisibleButtonProps } from './HeaderButton';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { OverflowButton, type OverflowButtonProps, IS_IOS } from './OverflowButton';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

const textTransformer = (label: string) =>
  IS_IOS ? label.charAt(0).toUpperCase() + label.substr(1) : label.toUpperCase();

type ItemProps = {
  title: string,
  show: string,
  ...$Exact<HeaderButtonProps>,
};

// TODO check RTL
export class Item extends React.Component<ItemProps> {
  static SHOW_ALWAYS = 'always';
  static SHOW_NEVER = 'never';

  static defaultProps = {
    show: 'always',
  };
  render() {
    return null;
  }
}

type HeaderButtonsProps = {
  children: React.Node,
  left: boolean,
  overflowButtonWrapperStyle?: ViewStyleProp,
  HeaderButtonComponent: React.ComponentType<*>,
  ...$Exact<OverflowButtonProps>,
};

export class HeaderButtons extends React.Component<HeaderButtonsProps> {
  static Item = Item;
  static defaultProps = {
    left: false,
    HeaderButtonComponent: HeaderButton,
    OverflowIcon: <View />,
  };

  render() {
    const { visibleButtons, hiddenButtons } = getVisibleAndHiddenButtons(this.props);
    const { OverflowIcon, overflowButtonWrapperStyle, onOverflowMenuPress } = this.props;

    return (
      <View style={[styles.row, this.getEdgeMargin()]}>
        {visibleButtons.length > 0 && this.renderVisibleButtons(visibleButtons)}
        {hiddenButtons.length > 0 && (
          <OverflowButton
            hiddenButtons={hiddenButtons}
            OverflowIcon={OverflowIcon}
            buttonWrapperStyle={overflowButtonWrapperStyle}
            onOverflowMenuPress={onOverflowMenuPress}
          />
        )}
      </View>
    );
  }

  getEdgeMargin() {
    return this.props.left ? styles.extraEdgeMarginOnLeft : styles.extraEdgeMarginOnRight;
  }

  renderVisibleButtons(visibleButtons: Array<React.Element<*>>): Array<React.Element<*>> {
    return visibleButtons.map(btn => {
      const {
        props: { title },
      } = btn;

      const RenderedHeaderButton = this.props.HeaderButtonComponent;

      return (
        <RenderedHeaderButton key={title} {...btn.props} getButtonElement={renderVisibleButton} />
      );
    });
  }
}

function getVisibleAndHiddenButtons(props) {
  let visibleButtons = [];
  let hiddenButtons = [];

  React.Children.forEach(props.children, child => {
    if (child && typeof child === 'object') {
      // TODO implement ifRoom, which will be tricky
      if (!child.props.show || child.props.show === Item.SHOW_ALWAYS) {
        visibleButtons.push(child);
      } else {
        hiddenButtons.push(child);
      }
    }
  });

  return {
    visibleButtons,
    hiddenButtons,
  };
}

function renderVisibleButton(visibleButtonProps: VisibleButtonProps): React.Element<any> {
  const { IconComponent, iconSize, color, iconName, title, buttonStyle } = visibleButtonProps;

  return IconComponent && iconName ? (
    <IconComponent
      name={iconName}
      color={color}
      size={iconSize}
      style={[styles.button, buttonStyle]}
    />
  ) : (
    <Text style={[styles.text, { color }, buttonStyle]}>{textTransformer(title)}</Text>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  extraEdgeMarginOnLeft: {
    ...Platform.select({
      android: {
        marginLeft: 5,
      },
      default: {
        marginLeft: 4,
      },
    }),
  },
  extraEdgeMarginOnRight: {
    ...Platform.select({
      android: {
        marginRight: 4,
      },
      default: {
        marginRight: 5,
      },
    }),
  },
  text: {
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
        marginHorizontal: 11,
      },
      default: {
        fontSize: 17,
        marginHorizontal: 10,
      },
    }),
  },
  button: {
    marginHorizontal: 11,
  },
});
