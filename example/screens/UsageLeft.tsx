import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import ScreenProps from './index';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import { Button } from './PaddedButton';

const MaterialHeaderButton = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

export class UsageLeft extends React.Component<ScreenProps> {
  static navigationOptions = ({ navigation, navigation: { state } }) => ({
    title: 'Usage Left',
    headerLeft: (
      <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
        <Item
          title="Test"
          iconName={state.params && state.params.showIcon ? 'arrow-back' : undefined}
          onPress={() => alert('Test')}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <Item title="back" onPress={() => navigation.goBack()} />
      </HeaderButtons>
    ),
  });

  render() {
    const {
      navigation: { state },
    } = this.props;

    return (
      <View>
        <Button
          onPress={() =>
            this.props.navigation.setParams({ showIcon: !(state.params && state.params.showIcon) })
          }
          title="Toggle Icon and Text"
        />
      </View>
    );
  }
}
