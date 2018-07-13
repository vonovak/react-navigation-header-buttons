import {
  UsageCustom,
  UsageWithIcons,
  UsageWithOverflow,
  UsageLeft,
  UsageDisabled,
  CustomRipple,
} from './screens';
import { StackNavigator } from 'react-navigation';

export default StackNavigator({
  UsageWithIcons: {
    screen: UsageWithIcons,
  },
  UsageLeft: {
    screen: UsageLeft,
  },
  UsageCustom: {
    screen: UsageCustom,
  },
  UsageDisabled: {
    screen: UsageDisabled,
  },
  CustomRipple: {
    screen: CustomRipple,
  },
  UsageWithOverflow: {
    screen: UsageWithOverflow,
  },
});
