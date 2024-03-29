import Tippy, { TippyProps } from '@tippyjs/react';
import React from 'react';

/** from https://gist.github.com/atomiks/520f4b0c7b537202a23a3059d4eec908 */
export const LazyTippy = (props: TippyProps): JSX.Element => {
  const [mounted, setMounted] = React.useState(false);

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  const computedProps = { ...props };

  computedProps.plugins = [lazyPlugin, ...(props.plugins ?? [])];

  if (props.render === undefined) {
    computedProps.content = mounted ? props.content : '';
  } else {
    const render = props.render; // let TypeScript safely derive that render is not undefined
    computedProps.render = (...arguments_) => (mounted ? render(...arguments_) : '');
  }

  return <Tippy {...computedProps} />;
};
