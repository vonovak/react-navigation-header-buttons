## react-navigation-header-buttons

This package will help you render buttons in the navigation bar and handle the styling so you don't have to.

This package tries to mimic the appearance of native navbar buttons. The outcome may not always be the same as in a native app but should be close. `NavHeader.Item` accepts `buttonWrapperStyle` prop which you may use to modify item alignment in case the default outcome does not fit your needs.

#### Demo app

Available via expo [here](https://expo.io/@vonovak/navbar-buttons-demo)

#### Install

`yarn add https://github.com/vonovak/react-navigation-header-buttons.git`

#### Import

`import NavHeader from 'react-navigation-header-buttons`

#### Basic Usage with Icons from react-native-vector-icons

```
import Icon from 'react-native-vector-icons/Ionicons';

headerRight: (
  <NavHeader IconComponent={Ionicons} size={23} color="blue">
    <NavHeader.Item label="add" iconName="ios-search" onPress={() => console.warn('add')} />
    <NavHeader.Item label="select" onPress={() => console.warn('edit')} />
  </NavHeader>
),
```

#### Custom Usage

```
headerRight: (
  <NavHeader>
    <NavHeader.Item
      label="add"
      buttonWrapperStyle={{ marginTop: 10 }}
      IconElement={<VeryCustomComponent />}
      onPress={() => console.warn('add')}
    />
    <NavHeader.Item
      label="edit"
      buttonWrapperStyle={{ marginTop: -10 }}
      onPress={() => console.warn('edit')}
    />
  </NavHeader>
),
```
