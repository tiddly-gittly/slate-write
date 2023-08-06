/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { PlatePluginComponent } from '@udecode/plate-core';
import { createNodeHOC, createNodesHOC, PlaceholderProps, usePlaceholderState } from '@udecode/plate-utils';
import { Children, cloneElement } from 'react';
import { cn } from 'src/slate-write/editor/lib/utils';
import { DefaultPlatePluginKey, placeHoldersComponents } from '../../config';

export const Placeholder = (props: PlaceholderProps) => {
  const { children, placeholder, nodeProps } = props;

  const { enabled } = usePlaceholderState(props);

  return Children.map(children, (child) => {
    return cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            'before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]',
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: any): Record<DefaultPlatePluginKey, PlatePluginComponent<any>> => withPlaceholdersPrimitive(components, placeHoldersComponents);
