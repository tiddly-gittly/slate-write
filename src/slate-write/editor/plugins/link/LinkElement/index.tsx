/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TLinkElement } from '@udecode/plate-link';
import { getRootProps, PlateElementProps } from '@udecode/plate-utils';
import type { Value } from '@udecode/slate';
import React, { useCallback, useContext, useMemo } from 'react';
import { ParentWidgetContext } from 'tw-react';
import type { ISlateAstExtraTwMarkers } from 'wikiast-utils';

export const LinkElement = <V extends Value>(props: PlateElementProps<V, TLinkElement & ISlateAstExtraTwMarkers>): JSX.Element => {
  const { attributes, children, nodeProps, element } = props;

  const rootProps = getRootProps(props);
  const parentWidget = useContext(ParentWidgetContext);

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (parentWidget === undefined) return;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const domNode = attributes.ref.current as HTMLLinkElement | undefined;
      if (domNode === undefined) return;
      event.stopPropagation();
      if (element.attributes?.to?.value) {
        const bounds = domNode.getBoundingClientRect();
        const twNavigateEvent = {
          type: 'tm-navigate',
          navigateTo: element.attributes?.to?.value,
          navigateFromTitle: parentWidget.getVariable('storyTiddler'),
          navigateFromNode: parentWidget,
          navigateFromClientRect: {
            top: bounds.top,
            left: bounds.left,
            width: bounds.width,
            right: bounds.right,
            bottom: bounds.bottom,
            height: bounds.height,
          },
          navigateFromClientTop: bounds.top,
          navigateFromClientLeft: bounds.left,
          navigateFromClientWidth: bounds.width,
          navigateFromClientRight: bounds.right,
          navigateFromClientBottom: bounds.bottom,
          navigateFromClientHeight: bounds.height,
          navigateSuppressNavigation: event.metaKey || event.ctrlKey || event.button === 1,
          metaKey: event.metaKey,
          ctrlKey: event.ctrlKey,
          altKey: event.altKey,
          shiftKey: event.shiftKey,
          event: event.nativeEvent,
        };
        parentWidget.dispatchEvent(twNavigateEvent);
        return;
      }
      if (domNode.hasAttribute('href')) {
        event.preventDefault();
        window.open(domNode.href, '_blank', 'noopener,noreferrer');
      }
    },
    [parentWidget],
  );

  const isMissing = useMemo(
    () => !(parentWidget?.wiki?.tiddlerExists(element.attributes?.to?.value as string ?? '') ?? false),
    [element.attributes?.to?.value, parentWidget?.wiki],
  );
  const isShadow = useMemo(() => parentWidget?.wiki?.isShadowTiddler(element.attributes?.to?.value as string ?? ''), [element.attributes?.to?.value, parentWidget?.wiki]);

  const attributesFromTw = useMemo(() => {
    const results: Record<string, unknown> = {};
    Object.keys(element.attributes ?? {}).forEach((key) => {
      results[key] = element.attributes![key].value;
    });
    return results;
  }, [element.attributes]);
  const classesFromTw = useMemo(() => {
    const results: string[] = [];
    // logic copied from core/modules/widgets/link.js
    if (element.attributes?.overrideClasses?.value === undefined) {
      results.push('tc-tiddlylink');
      if (isShadow) {
        results.push('tc-tiddlylink-shadow');
      }
      if (isMissing && !isShadow) {
        results.push('tc-tiddlylink-missing');
      } else {
        if (!isMissing) {
          results.push('tc-tiddlylink-resolves');
        }
      }
      if (element.attributes?.class?.value) {
        results.push(element.attributes?.class?.value as string);
      }
    } else {
      results.push(element.attributes?.overrideClasses?.value as string);
    }
    return results.join(' ');
  }, [element.attributes, isShadow, isMissing]);

  return (
    <a
      onClick={onClick}
      {...attributes}
      href={element.url}
      {...rootProps}
      {...nodeProps}
      {...attributesFromTw}
      className={`${rootProps.className ?? ''} ${classesFromTw}`}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </a>
  );
};
