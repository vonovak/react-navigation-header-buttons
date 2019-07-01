// @flow
import * as React from 'react';
import { type HeaderButtonProps } from './HeaderButton';

const SHOW_ALWAYS: 'always' = 'always';
const SHOW_NEVER: 'never' = 'never';

export type ItemProps = {
  title: string,
  show: typeof SHOW_ALWAYS | typeof SHOW_NEVER,
  ...$Exact<HeaderButtonProps>,
};

// TODO check RTL
export class Item extends React.Component<ItemProps> {
  static SHOW_ALWAYS = SHOW_ALWAYS;
  static SHOW_NEVER = SHOW_NEVER;

  static defaultProps = {
    show: SHOW_ALWAYS,
  };

  render() {
    return null;
  }
}

export class HiddenItem extends React.Component<ItemProps> {
  static SHOW_NEVER = SHOW_NEVER;

  static defaultProps = {
    show: SHOW_NEVER,
  };

  static getDerivedStateFromProps(props: ItemProps) {
    if (__DEV__ && props.show !== SHOW_NEVER) {
      throw new Error('HiddenItem does not support "show" prop other than "SHOW_NEVER"');
    }
  }

  render() {
    return null;
  }
}
