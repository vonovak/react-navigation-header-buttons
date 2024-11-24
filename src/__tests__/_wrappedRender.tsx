import * as React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

export function wrappedRender<T>(
  component: React.ReactElement<T>
): ReturnType<typeof render> {
  return render<T>(component, { wrapper: NavigationContainer });
}
