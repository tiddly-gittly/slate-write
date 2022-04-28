import { TElement } from '@udecode/plate';
import React, { createRef } from 'react';
import { IParseTreeNode } from 'tiddlywiki';
import { useWidget } from 'tw-react';
import { StyledElementProps } from '@udecode/plate-styled-components';
import { getRootProps } from '@udecode/plate-styled-components';

export interface IWidgetBlockProps {
  element: TElement<{ node: IParseTreeNode }>;
}
export type WidgetBlockElementProps = StyledElementProps<IWidgetBlockProps, {}>;

export function WidgetBlock(props: WidgetBlockElementProps): JSX.Element {
  const { attributes, children, nodeProps, element, editor } = props;
  const widgetContainerRef = createRef<HTMLDivElement>();
  useWidget(element.node, widgetContainerRef);
  const rootProps = getRootProps(props);
  return (
    <div {...attributes} {...rootProps}>
      {children}
      <div style={{ userSelect: 'none' }} contentEditable={false} {...nodeProps} ref={widgetContainerRef} />
    </div>
  );
}
