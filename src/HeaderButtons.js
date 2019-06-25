/*
 * @flow
 */
import * as React from 'react';
import { HeaderButton, type HeaderButtonProps, type VisibleButtonProps } from './HeaderButton';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { OverflowButton, type OverflowButtonProps } from './OverflowButton';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Item } from './HeaderItems';

const textTransformer = (label: string) =>
  Platform.OS === 'ios' ? label.charAt(0).toUpperCase() + label.substr(1) : label.toUpperCase();

type HeaderButtonsProps = {
  children: React.Node,
  left: boolean,
  overflowButtonWrapperStyle?: ViewStyleProp,
  overflowButtonTestID?: string,
  HeaderButtonComponent: React.ComponentType<any>,
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
    const {
      OverflowIcon,
      overflowButtonWrapperStyle,
      onOverflowMenuPress,
      overflowButtonTestID,
    } = this.props;

    return (
      <View style={[styles.row, this.getEdgeMargin()]}>
        {visibleButtons.length > 0 && this.renderVisibleButtons(visibleButtons)}
        {hiddenButtons.length > 0 && (
          <OverflowButton
            hiddenButtons={hiddenButtons}
            OverflowIcon={OverflowIcon}
            buttonWrapperStyle={overflowButtonWrapperStyle}
            onOverflowMenuPress={onOverflowMenuPress}
            testID={overflowButtonTestID}
          />
        )}
      </View>
    );
  }

  getEdgeMargin() {
    return this.props.left ? styles.extraEdgeMarginOnLeft : styles.extraEdgeMarginOnRight;
  }

  renderVisibleButtons(visibleButtons: Array<React.Element<any>>): Array<React.Element<any>> {
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
