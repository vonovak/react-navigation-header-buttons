import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons';

const IoniconsHeaderButton = (props) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="blue" />
);

const ReusableSelectItem = () => <Item title="Edit" onPress={() => alert('Edit')} />;

const ReusableHiddenItem = () => <HiddenItem title="hidden2" onPress={() => alert('hidden2')} />;

export function UsageWithIcons({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
          <ReusableSelectItem />
          <OverflowMenu
            style={{ marginHorizontal: 10 }}
            OverflowIcon={<Ionicons name="ios-more" size={23} color="blue" />}
          >
            <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
            <ReusableHiddenItem />
          </OverflowMenu>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return <Text style={{ flex: 1, margin: 20 }}>demo!</Text>;
}
