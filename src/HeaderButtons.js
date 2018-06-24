/*
* @flow
*/
import * as React from 'react';
import { HeaderButton, type HeaderButtonProps, type RippleOptions } from './HeaderButton';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { OverflowButton, type OverflowButtonProps, IS_IOS } from './OverflowButton';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

const textTransformer = (label: string) =>
  IS_IOS ? label.charAt(0).toUpperCase() + label.substr(1) : label.toUpperCase();

type ItemProps = {
  title: string,
  show: string,
  IconElement?: React.Node,
  iconName?: string,
  color?: string,
  ripple?: RippleOptions,
  iconSize?: number,
  buttonStyle?: StyleObj,
  ...$Exact<HeaderButtonProps>,
};

// TODO check RTL
class Item extends React.Component<ItemProps> {
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
  IconComponent?: React.ComponentType<*>,
  iconSize?: number,
  color?: string,
  ripple?: RippleOptions,
  overflowButtonWrapperStyle?: StyleObj,
  ...$Exact<OverflowButtonProps>,
};

export class HeaderButtons extends React.Component<HeaderButtonsProps> {
  static Item = Item;
  static defaultProps = {
    left: false,
  };

  render() {
    const { visibleButtons, hiddenButtons } = getVisibleAndHiddenButtons(this.props);
    const {
      color,
      OverflowIcon,
      cancelButtonLabel,
      overflowButtonWrapperStyle,
      onOverflowMenuPress,
    } = this.props;

    return (
      <View style={[styles.row, this.getEdgeMargin()]}>
        {visibleButtons.length > 0 && this.renderVisibleButtons(visibleButtons)}
        {hiddenButtons.length > 0 && (
          <OverflowButton
            color={color}
            hiddenButtons={hiddenButtons}
            OverflowIcon={OverflowIcon}
            cancelButtonLabel={cancelButtonLabel}
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

  renderVisibleButtons(visibleButtons: Array<React.Element<*>>) {
    return visibleButtons.map(btn => {
      const {
        props: { title, IconElement },
      } = btn;

      const ButtonElement = IconElement ? IconElement : this.renderVisibleButton(btn.props);

      return <HeaderButton key={title} ButtonElement={ButtonElement} ripple={this.props.ripple} {...btn.props} />;
    });
  }

  renderVisibleButton(itemProps: ItemProps) {
    const { IconComponent, iconSize, color } = this.props;
    const { iconName, title, buttonStyle } = itemProps;

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

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  extraEdgeMarginOnLeft: {
    ...Platform.select({
      android: {
        marginLeft: 5,
      },
      ios: {
        marginLeft: 4,
      },
    }),
  },
  extraEdgeMarginOnRight: {
    ...Platform.select({
      android: {
        marginRight: 4,
      },
      ios: {
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
      ios: {
        fontSize: 17,
        marginHorizontal: 10,
      },
    }),
  },
  button: {
    ...Platform.select({
      android: {
        marginHorizontal: 11,
      },
      ios: {
        marginHorizontal: 11,
      },
    }),
  },
});
