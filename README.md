## react-navigation-header-buttons

This package will help you render buttons in the navigation bar and handle the styling so you don't have to. It tries to mimic the appearance of native navbar buttons and attempts to offer simple and flexible interface for you to interact with. Typed with Flow and ships with TS typings.

#### Demo App

Contains many examples and is [available via expo](https://expo.io/@vonovak/navbar-buttons-demo). Sources are in the [example folder](https://github.com/vonovak/react-navigation-header-buttons/tree/master/example).

#### Install

`yarn add react-navigation-header-buttons`

#### Quick Example

Please see also [how to integrate in your project](#how-to-integrate-in-your-project).

```js
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={23} color="blue" />
);

static navigationOptions = {
  title: 'Vector Icons',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
      <Item title="select" onPress={() => alert('select')} />
      <HiddenItem title="hidden in overflow menu" onPress={() => alert('hidden in overflow')} />
    </HeaderButtons>
  ),
};
```

### Props

`HeaderButtons` accepts:

| prop and type                                                                                        | description                                                   | note                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| left: boolean                                                                                        | whether the `HeaderButtons` are on the left from header title | false by default                                                                                                                                                                                                                     |
| HeaderButtonComponent: React.ComponentType<any>                                                      | component that renders the buttons                            | Typically, you'll want to provide a component that wraps `HeaderButton` provided by this package, as seen in the [quick example](#quick-example). However, you're free to use your own component (see `HeaderButton` for reference). |
| OverflowIcon?: React.Element<any>                                                                    | React element for the overflow icon                           | you need to provide this only if you need an overflow icon                                                                                                                                                                           |
| overflowButtonWrapperStyle?: ViewStyleProp                                                           | optional styles for overflow button                           | there are some default styles set, as seen in `OverflowButton.js`                                                                                                                                                                    |
| onOverflowMenuPress?: ({ hiddenButtons: Array<React.Element<any>>, overflowButtonRef: View }) => any | function that is called when overflow menu is pressed.        | This will override the default handler. Note the default handler offers (limited) customization. See more below.                                                                                                                     |
| overflowButtonTestID?: string                                                                        | testID to locate the overflow button in e2e tests             | the default is available under `import { OVERFLOW_BUTTON_TEST_ID } from 'react-navigation-header-buttons/e2e'`                                                                                                                       |

`Item` accepts:

| prop and type                      | description                                                                       | note                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| onPress: ?() => any                | function to call on press                                                         | if this is a falsy value, the button won't react to touches (will be disabled)                 |
| title: string                      | title for the button, required                                                    |                                                                                                |
| show: "always" or "never"          | string specifying if the icon should be shown or hidden in overflow menu          | the strings are accessible under `Item.SHOW_ALWAYS` and `Item.SHOW_NEVER`. "always" by default |
| ButtonElement?: React.Node         | optional React element to show as button. Use this for completely custom buttons. | if neither `IconComponent` nor `ButtonElement` is defined, will render text with the `title`   |
| iconName?: string                  | icon name, used together with the `IconComponent` prop                            |                                                                                                |
| buttonStyle?: ViewStyleProp        | style to apply to the button                                                      | applies to both icon and text                                                                  |
| buttonWrapperStyle?: ViewStyleProp | style to apply to the touchable element that wraps the button                     |                                                                                                |
| testID?: string                    | ID to locate the view in e2e tests                                                |                                                                                                |

Note - as an alternative to `<Item title="edit" show={Item.SHOW_NEVER} onPress={...} />` you can also use `<HiddenItem title="edit" onPress={...} />`

`HeaderButton` accepts:

| prop and type                           | description                                                                  | note |
| --------------------------------------- | ---------------------------------------------------------------------------- | ---- |
| IconComponent?: React.ComponentType<\*> | component to use for the icons, for example from `react-native-vector-icons` |      |
| iconSize?: number                       | iconSize                                                                     |      |
| color?: string                          | color of icons and buttons                                                   |      |

You may also pass other props that will be passed to the underlying `react-native-platform-touchable`. For example, pass [`background`](https://github.com/react-community/react-native-platform-touchable#additional-props-used-by-touchablenativefeedback--default-android) prop for different ripple effects.

Please note that `HeaderButton` also requires other props to function correctly. Some of these props are passed from `<Item .. />` (such as `iconName`) and also `<HeaderButtons ... />`. When wrapping `HeaderButton` it is thus important to not forget to pass down all props the wrapping component receives (this is easy using the spread operator), as documented in the [quick example](#quick-example).

#### Customize the cancel button label of overflow menu on iOS

The default handler for overflow menu is exported as `defaultOnOverflowMenuPress`. On iOS, it uses `ActionSheetIOS` and on Android, it uses `UIManager.showPopupMenu`. One of the usual things you may want to do is override the cancel button label on iOS - see [example](example/screens/UsageWithOverflow.tsx).

#### How to integrate in your project

This sections covers how you should use the library in your project. Please note that there are numerous [example screens](https://github.com/vonovak/react-navigation-header-buttons/tree/master/example/screens).

1 . Define one file where the styling of header buttons is taken care of.

```js
// MyHeaderButtons.js

import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';

// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

export const MaterialHeaderButtons = props => {
  return (
    <HeaderButtons
      HeaderButtonComponent={MaterialHeaderButton}
      OverflowIcon={<MaterialIcons name="more-vert" size={23} color="white" />}
      {...props}
    />
  );
};
export { Item } from 'react-navigation-header-buttons';
```

2 . Import header buttons from the file defined previously.

```js
// SomeScreen.js
import { MaterialHeaderButtons, Item } from './MyHeaderButtons'

static navigationOptions = {
  title: 'Screen with header buttons',
  // use MaterialHeaderButtons with consistent styling across your app
  headerRight: (
    <MaterialHeaderButtons>
      <Item title="add" iconName="search" onPress={() => console.warn('add')} />
      <Item title="edit" onPress={() => console.warn('edit')} />
    </MaterialHeaderButtons>
  ),
};
```
