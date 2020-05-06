import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = (props) => (
  // the `props` here come from <Item .../>
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="blue" />
);

const ReusableSelectItem = () => {
  return <Item title="select" onPress={() => alert('select')} />;
};

export function UsageWithIcons({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
          <ReusableSelectItem />
        </HeaderButtons>
      ),
      title: 'indeed a very, very, long title, and it actually does not stop here',
    });
  }, [navigation]);

  return <Text style={{ flex: 1 }}>body</Text>;
}
