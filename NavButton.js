/**
 * @flow
 */
import * as React from 'react';
const BUTTON_HIT_SLOP = { top: 5, bottom: 5, left: 5, right: 5 };
import { StyleSheet, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

type Props = {
  onPress: () => void,
  ButtonElement: ?React.Node,
  buttonWrapperStyle?: Object,
};

export class NavButton extends React.PureComponent<Props> {
  render() {
    const { ButtonElement, onPress, buttonWrapperStyle } = this.props;

    return (
      <Touchable
        background={Touchable.SelectableBackgroundBorderless()}
        onPress={onPress}
        hitSlop={BUTTON_HIT_SLOP}
        style={styles.buttonContainer}
      >
        <View style={[buttonWrapperStyle]}>{ButtonElement}</View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
