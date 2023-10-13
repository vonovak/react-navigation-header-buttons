import * as React from 'react';
import {
  StyleSheet,
  Platform,
  ColorValue,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import type { ComponentProps, ReactNode } from 'react';

// for renderVisibleButton() function
export type VisibleButtonProps = {
  title: string;

  IconComponent?: React.ComponentType<{
    name: any; // TODO generify to support icon names
    style?: any;
    color?: ColorValue;
    size?: number;
  }>;
  iconName?: string;
  iconSize?: number;
  color?: ColorValue;
  buttonStyle?: ViewStyle | TextStyle;
};

type PlatformPressableProps = ComponentProps<typeof PlatformPressable>;

export type RenderButtonCallbackParams = Omit<VisibleButtonProps, 'color'> & {
  // color is always available, either from user or from react-navigation theme
  color: ColorValue;
};
type RenderButtonType = {
  renderButton: <T extends RenderButtonCallbackParams>(params: T) => ReactNode;
};

type BaseProps = Omit<PlatformPressableProps, 'children'> & VisibleButtonProps;

// for <Item />, some things are optional while they are required for HeaderButton
export type ItemProps = BaseProps & Partial<RenderButtonType>;

export type HeaderButtonProps = BaseProps & RenderButtonType;

export function HeaderButton(props: HeaderButtonProps) {
  const { colors } = useTheme();
  const themeColor = Platform.select({
    ios: colors.primary,
    default: colors.text,
  });

  const { renderButton, style, color, ...other } = props;

  const ButtonElement = renderButton({
    color: color || themeColor,
    ...other,
  });

  return (
    <PlatformPressable
      hitSlop={buttonHitSlop}
      // @ts-expect-error typings too strict
      style={StyleSheet.compose(styles.buttonContainer, style)}
      android_ripple={rippleConfig}
      {...other}
    >
      {ButtonElement}
    </PlatformPressable>
  );
}

export function defaultRenderVisibleButton(
  visibleButtonProps: VisibleButtonProps
): React.ReactElement {
  const { IconComponent, iconSize, color, iconName, title, buttonStyle } =
    visibleButtonProps;

  return IconComponent && iconName ? (
    <IconComponent
      name={iconName}
      color={color}
      size={iconSize}
      style={buttonStyle}
    />
  ) : (
    <Text style={[styles.text, { color }, buttonStyle]}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
        textTransform: 'uppercase',
      },
      default: {
        fontSize: 17,
        textTransform: 'capitalize',
      },
    }),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const rippleConfig = {
  foreground: true,
  borderless: true,
  radius: 20,
};

const buttonHitSlop = { top: 5, bottom: 5, left: 5, right: 5 };
