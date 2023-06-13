import {
  HomeScreen,
  UsageCustom,
  UsageDifferentFontFamilies,
  UsageDisabled,
  UsageLeft,
  UsageWithCustomOverflow,
  UsageWithIcons,
  UsageWithOverflow,
  UsageWithOverflowComplex,
} from './screens';
import type { StackScreenProps } from '@react-navigation/stack';
import { UsageNativeMenu } from './screens/UsageNativeMenu';

export const screens = {
  HomeScreen,
  UsageWithIcons,
  UsageWithOverflowComplex,
  UsageLeft,
  UsageCustom,
  UsageDisabled,
  UsageWithOverflow,
  UsageDifferentFontFamilies,
  UsageWithCustomOverflow,
  UsageNativeMenu,
} as const;

export type ScreenNames = keyof typeof screens;

export type RootStackParamList = Omit<
  {
    [key in keyof typeof screens]: undefined;
  },
  'UsageLeft'
> & {
  UsageLeft: { showIcon: boolean };
};

export type ScreenProps<S extends ScreenNames> = StackScreenProps<
  RootStackParamList,
  S
>;
