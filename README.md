## react-navigation-header-buttons

This package will help you render buttons in the navigation bar and handle the styling so you don't have to.

#### Install

`yarn add https://github.com/vonovak/react-navigation-header-buttons.git`

#### Import

`import NavHeader from 'react-navigation-header-buttons`

#### Basic Usage

```
import Icon from 'react-native-vector-icons/Ionicons';

headerRight: (
        <NavHeader>
          <NavHeader.Item label="one" onPress={() => console.log('one')} />
          <NavHeader.Item
            label="two"
            IconElement={<Icon name='ios-add' size={23} />}
            onPress={() => console.log('two')}
          />
        </NavHeader>
      )
```
