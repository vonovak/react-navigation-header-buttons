import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

export function UsageCustom({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item title="shifted" style={{ marginTop: 20 }} onPress={() => alert('misaligned')} />
          <TouchableWithoutFeedback onPress={() => alert('green square')}>
            <View style={{ height: 25, width: 25, backgroundColor: 'green' }} />
          </TouchableWithoutFeedback>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}></View>;
}
