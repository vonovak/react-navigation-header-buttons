import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import { Button } from './PaddedButton';

const MaterialHeaderButton = (props) => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

export function UsageLeft({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title="Test"
            iconName={route.params && route.params.showIcon ? 'arrow-back' : undefined}
            onPress={() => alert('Test')}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item title="back" onPress={() => navigation.goBack()} />
        </HeaderButtons>
      ),
    });
  }, [navigation, route]);

  return (
    <View>
      <Button
        onPress={() => navigation.setParams({ showIcon: !(route.params && route.params.showIcon) })}
        title="Toggle Icon and Text"
      />
    </View>
  );
}
