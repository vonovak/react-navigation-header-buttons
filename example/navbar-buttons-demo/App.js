import { UsageCustom, UsageWithIcons, UsageWithOverflow, UsageLeft } from './screens';
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
  UsageWithOverflow: {
    screen: UsageWithOverflow,
  },
});
