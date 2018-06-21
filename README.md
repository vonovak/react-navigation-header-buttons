## react-navigation-header-buttons

This package will help you render buttons in the navigation bar and handle the styling so you don't have to. It tries to mimic the appearance of native navbar buttons. `HeaderButtons.Item` accepts `buttonWrapperStyle` prop which you may use to modify item alignment in case the default outcome does not fit your needs.

#### Demo App with Code Samples

Available via expo [here](https://expo.io/@vonovak/navbar-buttons-demo)

#### Install

`yarn add react-navigation-header-buttons`

#### Quick Example

```
import HeaderButtons from 'react-navigation-header-buttons'
import Icon from 'react-native-vector-icons/Ionicons';

static navigationOptions = {
  title: 'Usage With Icons',
  headerRight: (
    <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color="blue" />} iconSize={23} color="blue">
      <HeaderButtons.Item title="add" iconName="ios-search" onPress={() => console.warn('add')} />
      <HeaderButtons.Item title="select" onPress={() => console.warn('edit')} />
    </HeaderButtons>
  ),
};
```

#### Props of HeaderButtons

`HeaderButtons` accepts:

| prop and type                                                            | description                                                  | note                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| left: boolean                                                            | whether this HeaderButtons are on the left from header title | false by default                                                  |
| IconComponent?: React.ComponentType<\*>                                  | component to use for the icons                               |                                                                   |
| iconSize?: number                                                        | iconSize                                                     |                                                                   |
| color?: string                                                           | color of icons and buttons                                   |                                                                   |
| OverflowIcon?: React.Element<\*>                                         | React element for the overflow icon                          | you need to provide this only if you need overflow icon           |
| overflowButtonWrapperStyle?: StyleObj                                    | optional styles for overflow button                          | there are some default styles set, as seen in `OverflowButton.js` |
| cancelButtonLabel?: string                                               | ios only, the cancel button label for overflow menu actions  | 'Cancel' by default                                               |
| onOverflowMenuPress?: ({ hiddenButtons: Array<React.Element<\*>> })=>any | function that is called when overflow menu is pressed.       | this will override the default handler                            |

`HeaderButtons.Item` accepts:

| prop and type             | description                                                                                        | note                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| onPress: ?() => any       | function to call on press                                                                          | if this is a falsy value, the button won't react to touches                        |
| title: string             | title for the button, required                                                                     |                                                                                    |
| show: "always" or "never" | string specifying if the icon should be shown or hidden in overflow menu                           | "always" by default                                                                |
| IconElement?: React.Node  | optional React element to show as icon. This will override the `IconComponent` if you specified it | if neither `IconComponent` nor this is defined, will render text with the `title`  |
| iconName?: string         | icon name, used together with the `IconComponent` prop                                             |                                                                                    |
| buttonStyle?: StyleObj    | style to apply to the button                                                                       | applies to both icon and text; you may use this to eg. change the button alignment |
| testID?: string           | ID to locate the view in e2e tests                                                                 | `headerOverflowButton` is the testID of the overflow button                        |

#### How to integrate in your project

1 . Define one file where the styling of header buttons is taken care of.

```
// MyHeaderButtons.js

import * as React from 'react';
import OrigHeaderButtons from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// define IconComponent, color, sizes and OverflowIcon in one place

export const MaterialHeaderButtons = (props) => {
  return <OrigHeaderButtons IconComponent={MaterialIcons} color="white" iconSize={23} OverflowIcon={<MaterialIcons name="more-vert" size={23} color="white" />} {...props} />;
};
export const Item = OrigHeaderButtons.Item;
```

2 . Import header buttons from the file defined previously.

```
// SomeScreen.js
import { MaterialHeaderButtons, Item } from './MyHeaderButtons'

static navigationOptions = {
  title: 'Screen with header buttons',
  // use MaterialHeaderButtons with consistent styling across your app
  headerRight: (
    <MaterialHeaderButtons>
      <Item title="add" iconName="ios-search" onPress={() => console.warn('add')} />
      <Item title="select" onPress={() => console.warn('edit')} />
    </MaterialHeaderButtons>
  ),
};
```

#### Custom Usage

```
static navigationOptions = {
  title: 'Custom Usage',
  headerRight: (
    <HeaderButtons>
      <HeaderButtons.Item
        title="add"
        buttonWrapperStyle={{ marginTop: 10 }}
        IconElement={<Ionicons name="ios-add" size={23} />}
        onPress={() => console.warn('add')}
      />
      <HeaderButtons.Item
        title="edit"
        buttonWrapperStyle={{ marginTop: -10 }}
        onPress={() => console.warn('edit')}
      />
    </HeaderButtons>
  ),
};
```
