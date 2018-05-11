import { Component, ComponentType, ReactNode } from 'react'
import { ViewStyle } from 'react-native'

interface HeaderItemProps {
  IconElement?: ReactNode
  buttonStyle?: ViewStyle
  buttonWrapperStyle?: ViewStyle
  color?: string
  iconName?: string
  iconSize?: number
  onPress?: () => void
  show?: string
  title: string
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
}

declare class HeaderButtons extends Component<HeaderButtonsProps> {
  static Item: ComponentType<HeaderItemProps>
}

export default HeaderButtons
