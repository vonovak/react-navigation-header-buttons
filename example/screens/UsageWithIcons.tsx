import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
  Divider,
} from 'react-navigation-header-buttons';

const IoniconsHeaderButton = (props) => {
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={23}
      // you can customize the colors, by default colors from react navigation theme will be used
      // color="red"
      // pressColor="blue"
      {...props}
    />
  );
};

// normally, on android, text is UPPERCASED
const ReusableCapitalizedEditItem = ({ onPress }) => {
  return <Item title="edit" onPress={onPress} buttonStyle={{ textTransform: 'capitalize' }} />;
};

const ReusableItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;

export function UsageWithIcons({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="search"
            iconName="ios-search"
            onPress={() => alert('search')}
            pressColor="blue"
          />
          <ReusableCapitalizedEditItem onPress={() => alert('Edit')} />
          <OverflowMenu
            style={{ marginHorizontal: 10 }}
            OverflowIcon={({ color }) => <Ionicons name="ios-more" size={23} color={color} />}
            color="red"
          >
            <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
            <Divider />
            <ReusableItem onPress={() => alert('hidden2')} />
          </OverflowMenu>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return <Text style={{ flex: 1, margin: 20 }}>demo!</Text>;
}
