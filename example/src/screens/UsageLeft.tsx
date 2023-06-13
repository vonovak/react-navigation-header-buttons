import * as React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import type { ScreenProps } from '../NavTypes';
import { MaterialHeaderButton } from '../components/MaterialHeaderButton';
import { Button } from '../components/PaddedButton';
import { ScreenBody } from '../components/ScreenBody';

export function UsageLeft({ navigation, route }: ScreenProps<'UsageLeft'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title="Test"
            iconName={
              route.params && route.params.showIcon ? 'arrow-back' : undefined
            }
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
    <ScreenBody>
      <Button
        onPress={() =>
          navigation.setParams({
            showIcon: !(route.params && route.params.showIcon),
          })
        }
        title="Toggle Icon and Text"
      />
    </ScreenBody>
  );
}
