import { Component, ComponentType, ReactNode } from 'react'
import { TextStyle, ViewStyle } from 'react-native'

interface RippleOptions {
  pressColor: string;
  borderless?: boolean;
  useForeground?: boolean;
}

interface HeaderItemProps {
  IconElement?: ReactNode
  buttonStyle?: TextStyle | ViewStyle
  buttonWrapperStyle?: ViewStyle
  color?: string
  iconName?: string
  iconSize?: number
  onPress?: () => void
  show?: string
  title: string
  ripple?: RippleOptions
}

interface HeaderButtonsProps {
  IconComponent?: ComponentType<any>
  OverflowIcon?: ReactNode
  cancelButtonLabel?: string
  children: ReactNode
  color?: string
  iconSize?: number
  left?: boolean
  overflowButtonWrapperStyle?: ViewStyle
  ripple?: RippleOptions
}

declare class HeaderButtons extends Component<HeaderButtonsProps> {
  static Item: ComponentType<HeaderItemProps>
}

export default HeaderButtons
