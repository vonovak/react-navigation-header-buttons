import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { HiddenItem, OverflowMenu, Divider, modes } from 'react-navigation-header-buttons';
import { Button } from './PaddedButton';

const ReusableItem = ({ title, disabled = false }) => {
  return <HiddenItem title={title} disabled={disabled} onPress={() => alert(title)} />;
};

export function UsageWithOverflowComplex({ navigation }) {
  const [mode, setMode] = React.useState(modes.DEFAULT);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OverflowMenu
          OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
          mode={mode}
          onOverflowMenuPress={console.warn}
        >
          <View style={{ height: 10, width: 10, backgroundColor: 'orange' }} />
          <ReusableItem title="hidden1" />
          <ReusableItem title="hidden2" disabled />
          <Divider />
          <ReusableItem title="hidden3" />
        </OverflowMenu>
      ),
    });
  }, [navigation, mode]);

  return (
    <View style={{ flex: 1 }}>
      <Text>mode behavior is platform-dependent</Text>
      <Text>current mode: {mode}</Text>
      <Button
        onPress={() => {
          const valuesArray = Object.values(modes);
          const index = valuesArray.indexOf(mode);
          setMode(valuesArray[(index + 1) % valuesArray.length]);
        }}
        title="next overflow mode"
      />
    </View>
  );
}
