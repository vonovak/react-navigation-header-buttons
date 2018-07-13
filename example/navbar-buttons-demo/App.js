import {
  UsageCustom,
  UsageWithIcons,
  UsageWithOverflow,
  UsageLeft,
  UsageDisabled,
  UsageCustomRipple,
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
  UsageCustomRipple: {
    screen: UsageCustomRipple,
  },
  UsageWithOverflow: {
    screen: UsageWithOverflow,
  },
});
