/*
* @flow
*/
import * as React from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  StyleSheet,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Touchable from 'react-native-platform-touchable';

type Props = {
  hiddenButtons: Array<React.Element<*>>,
  color: string,
  OverflowIcon?: React.Node,
};

export class OverflowButton extends React.Component<Props> {
  overflowRef: ?View;
  static defaultProps = {
    color: 'grey',
  };

  setOverflowRef = (ref: ?View) => {
    this.overflowRef = ref;
  };

  render() {
    const { OverflowIcon } = this.props;
    return (
      <View>
        <View ref={this.setOverflowRef} style={styles.overflowMenuView} />
        <Touchable
          background={Touchable.SelectableBackgroundBorderless()}
          style={styles.touchable}
          onPress={this.showOverflowPopup}
        >
          {OverflowIcon ? (
            OverflowIcon
          ) : (
            <Icon name="more-vert" size={23} color={this.props.color} style={styles.icon} />
          )}
        </Touchable>
      </View>
    );
  }

  showOverflowPopup = () => {
    Platform.OS === 'android' ? this.showPopupAndroid() : this.showPopupIos();
  };

  showPopupAndroid = () => {
    UIManager.showPopupMenu(
      findNodeHandle(this.overflowRef),
      this.props.hiddenButtons.map(btn => btn.props.label),
      err => {
        console.debug(`popup error ${err}`);
      },
      this.onHiddenItemPress
    );
  };

  onHiddenItemPress = (eventName: string, index: number) => {
    if (eventName !== 'itemSelected') return;
    this.props.hiddenButtons[index].props.onPress();
  };

  showPopupIos = () => {
    const actionLabels = this.props.hiddenButtons.map(it => it.props.label);
    // todo prop for cancel label
    actionLabels.push('Cancel');

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionLabels,
        cancelButtonIndex: actionLabels.length - 1,
      },
      (buttonIndex: number) => {
        if (buttonIndex !== actionLabels.length - 1) {
          this.onHiddenItemPress('itemSelected', buttonIndex);
        }
      }
    );
  };
}

const styles = StyleSheet.create({
  overflowMenuView: {
    position: 'absolute',
    top: -10,
    // TODO android actually has a little gap on the right of the menu
    right: 0,
    backgroundColor: 'transparent',
    width: 1,
    height: 1,
  },
  touchable: {
    marginRight: 10,
    marginLeft: 7,
  },
  icon: {
    marginTop: 2,
  },
});
