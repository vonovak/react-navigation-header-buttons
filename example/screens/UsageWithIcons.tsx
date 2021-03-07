import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
  Divider,
} from 'react-navigation-header-buttons';

const MaterialHeaderButton = (props) => {
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  return (
    <HeaderButton
      IconComponent={MaterialIcons}
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

const ReusableItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} disabled />;

export function UsageWithIcons({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item title="search" iconName="search" onPress={() => alert('search')} />
          <ReusableCapitalizedEditItem onPress={() => alert('Edit')} />
          <OverflowMenu
            style={{ marginHorizontal: 10 }}
            OverflowIcon={({ color }) => (
              <MaterialIcons name="more-horiz" size={23} color={color} />
            )}
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
