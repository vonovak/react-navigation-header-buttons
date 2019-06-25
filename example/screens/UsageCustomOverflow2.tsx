import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import ScreenProps from './index';
import { HeaderButtons, HeaderButton, HiddenItem } from 'react-navigation-header-buttons';
import { Menu, Divider, Provider, Appbar } from 'react-native-paper';

const MaterialHeaderButton = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

class PaperMenu extends React.Component {
  state = {
    visible: false,
  };

  _openMenu = () => {
    console.warn('open');
    this.setState({ visible: true });
  };

  _closeMenu = () => this.setState({ visible: false });

  //<MaterialIcons name="more-vert" size={23} color="blue" />
  render() {
    return (
      <Provider>
        <Menu
          visible={this.state.visible}
          onDismiss={this._closeMenu}
          anchor={<Text onPress={this._openMenu}>KK</Text>}
        >
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </Provider>
    );
  }
}

class PaperMenu2 extends React.Component {
  state = {
    visible1: false,
    visible2: false,
  };
  _openMenu1 = () => this.setState({ visible1: true });

  _closeMenu1 = () => this.setState({ visible1: false });
  render() {
    return (
      <Provider>
        <Appbar.Header>
          {/* <Appbar.BackAction onPress={() => {}} /> */}
          <Appbar.Content title="Menu2" />
          <Menu
            visible={this.state.visible1}
            onDismiss={this._closeMenu1}
            //   anchor={<Appbar.Action icon={'more-horiz'} color="black" onPress={this._openMenu1} />}
            anchor={<Text onPress={this._openMenu1}>AA</Text>}
          >
            <Menu.Item onPress={() => {}} title="Undo" />
            <Menu.Item onPress={() => {}} title="Redo" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Cut" disabled />
            <Menu.Item onPress={() => {}} title="Copy" disabled />
            <Menu.Item onPress={() => {}} title="Paste" />
          </Menu>
        </Appbar.Header>
      </Provider>
    );
  }
}

class RightHeaderButtons extends React.Component {
  render() {
    return (
      <HeaderButtons
        // HeaderButtonComponent={MaterialHeaderButton}
        OverflowIcon={<PaperMenu2 />}
        onOverflowMenuPress={() => {}}
      >
        {/* <Item title="person" onPress={() => alert('person')} ButtonElement={<PaperMenu />} /> */}
        <HiddenItem title="person2" iconName="person" onPress={() => alert('person')} />
        {/* <Item title="person3" iconName="person" onPress={() => alert('person')} /> */}
      </HeaderButtons>
    );
  }
}

export class UsageWithCustomOverflow2 extends React.Component<ScreenProps> {
  static navigationOptions = ({ navigation }) => ({
    // title: 'rn-paper',
    // header: (
    //   <View style={{ height: 100,  flexDirection: 'row-reverse', paddingTop: 55 }}>
    //     <PaperMenu2 />
    //   </View>
    // ),
    // header: <PaperMenu2 />,
    // headerRight: <RightHeaderButtons />,
    headerLeft: (
      <View style={{ marginRight: 20, marginTop: 20 }}>
        <PaperMenu />
      </View>
    ),
    headerRight: (
      <View style={{ marginRight: 300, marginTop: 20 }}>
        <PaperMenu />
      </View>
    ),
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PaperMenu2 />
        <PaperMenu2 />
        <PaperMenu2 />
      </View>
    );
  }
}
