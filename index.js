// @flow
import HeaderButtonsBase from 'react-navigation-header-buttons-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
export default HeaderButtonsBase;

const DefaultOverflowIcon = ({ color }) => (
  <MaterialIcons name="more-vert" size={23} color={color} />
);

export const Item = HeaderButtonsBase.Item;

export const MaterialHeaderButtons = props => (
  <HeaderButtonsBase
    IconComponent={MaterialIcons}
    OverflowIcon={<DefaultOverflowIcon color={props.color} />}
    {...props}
  />
);

export const IoniconHeaderButtons = props => (
  <HeaderButtonsBase
    IconComponent={Ionicons}
    OverflowIcon={<DefaultOverflowIcon color={props.color} />}
    {...props}
  />
);
