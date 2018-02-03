## react-navigation-header-buttons

This package will help you render buttons in the navigation bar and handle the styling so you don't have to.

This package tries to mimic the appearance of native navbar buttons. `HeaderButtons.Item` accepts `buttonWrapperStyle` prop which you may use to modify item alignment in case the default outcome does not fit your needs.

#### Demo app with code samples

Available via expo [here](https://expo.io/@vonovak/navbar-buttons-demo)

#### Install

`yarn add react-navigation-header-buttons`

#### Quick example

```
import HeaderButtons from 'react-navigation-header-buttons
import Icon from 'react-native-vector-icons/Ionicons';

static navigationOptions = {
  title: 'Usage With Icons',
  headerRight: (
    <HeaderButtons IconComponent={Ionicons} iconSize={23} color="blue">
      <HeaderButtons.Item title="add" iconName="ios-search" onPress={() => console.warn('add')} />
      <HeaderButtons.Item title="select" onPress={() => console.warn('edit')} />
    </HeaderButtons>
  ),
};
```

#### Props of HeaderButtons

`HeaderButtons` accepts:

 
|prop and type | description | note |
|--|--|--|
| left: boolean | whether this HeaderButtons are on the left from header title   | false by default |
| IconComponent?: React.ComponentType<*> | component to use for the icons |   |
|iconSize?: number| iconSize |  |
|color?: string| color of icons and buttons |  |
|OverflowIcon?: React.Node| React element for the overflow icon | will render android-styled overflow icon by default |
|cancelButtonLabel?: string | ios only, the cancel button label for overflow menu actions | 'Cancel' by default |



`HeaderButtons.Item` accepts:

|prop and type | description | note |
|--|--|--|
| onPress: () => void | function to call on press ||
| title: string | title for the button, required |  |
| show: "always" or "never" |  string specifying if the icon should be shown or hidden in overflow menu | "always" by default |
| IconElement?: React.Node | optional React element to show as icon. This will override the `IconComponent` if you specified it | if neither `IconComponent` nor this is defined, will render text with the `title`|
|  iconName?: string | icon name, used together with the `IconComponent` prop |  |
| buttonStyle?: Object | style to apply to the button | you may use this to eg. change the button alignment |



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

