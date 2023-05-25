import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import type { ScreenProps } from '../NavTypes';
import { ScreenBody } from '../components/ScreenBody';

export function UsageCustom({ navigation }: ScreenProps<'UsageCustom'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title="capitalized"
            style={{ marginTop: 20 }}
            onPress={() => alert('misaligned')}
            buttonStyle={{ textTransform: 'capitalize' }}
          />
          <TouchableWithoutFeedback onPress={() => alert('green square')}>
            <View style={{ height: 25, width: 25, backgroundColor: 'green' }} />
          </TouchableWithoutFeedback>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return <ScreenBody />;
}
