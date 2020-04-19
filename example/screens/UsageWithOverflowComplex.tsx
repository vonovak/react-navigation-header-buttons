import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import {
  HiddenItem,
  OverflowMenu,
  Divider,
  overflowMenuPressHandlerActionSheet,
  overflowMenuPressHandlerPopupMenu,
  overflowMenuPressHandlerDropdownMenu,
} from 'react-navigation-header-buttons';
import { Button } from './PaddedButton';

const ReusableItem = ({ title, disabled = false }) => {
  return <HiddenItem title={title} disabled={disabled} onPress={() => alert(title)} />;
};

const handlers = [
  overflowMenuPressHandlerActionSheet,
  overflowMenuPressHandlerPopupMenu,
  overflowMenuPressHandlerDropdownMenu,
  console.warn,
];

export function UsageWithOverflowComplex({ navigation }) {
  const [index, setIndex] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OverflowMenu
          OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
          onOverflowMenuPress={handlers[index]}
        >
          <View style={{ height: 10, width: 10, backgroundColor: 'orange' }} />
          <ReusableItem title="hidden1" />
          <ReusableItem title="hidden2" disabled />
          <Divider />
          <ReusableItem title="hidden3" />
        </OverflowMenu>
      ),
    });
  }, [navigation, index]);

  return (
    <View style={{ flex: 1 }}>
      <Text>behavior is platform-dependent</Text>
      <Text>current mode: {handlers[index].name}</Text>
      <Button
        onPress={() => {
          setIndex((index + 1) % handlers.length);
        }}
        title="next overflow mode"
      />
    </View>
  );
}
