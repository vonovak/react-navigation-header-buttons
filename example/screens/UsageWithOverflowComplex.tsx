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
  function custom(obj) {
    console.warn(Object.keys(obj));
  },
];

export function UsageWithOverflowComplex({ navigation }) {
  const [index, setIndex] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OverflowMenu
          OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
          onPress={handlers[index]}
        >
          <HiddenItem
            icon={<MaterialIcons name="search" size={23} />}
            title="search"
            onPress={() => alert('search')}
          />
          <ReusableItem title="hidden2" />
          <ReusableItem title="hidden3" disabled />
          <Divider />
          {/*Arrays as children also work*/}
          {[<HiddenItem key="hidden4" title="hidden4" onPress={() => alert('hidden4')} />]}
          <View style={{ backgroundColor: 'orange', maxWidth: 200 }}>
            <Text>
              custom view that will only be considered for overflowMenuPressHandlerDropdownMenu
            </Text>
          </View>
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
