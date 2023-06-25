import { TippyProps } from '@tippyjs/react';
import React from 'react';

const GrabberTooltipContent = (): JSX.Element => (
  <div style={{ fontSize: 12 }}>
    <div>
      Drag <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>to move</span>
    </div>
  </div>
);
export const grabberTooltipProps: TippyProps = {
  content: <GrabberTooltipContent />,
  placement: 'bottom',
  arrow: false,
  offset: [0, 0],
  delay: [300, 0],
  duration: [0, 0],
  hideOnClick: true,
  theme: 'small',
};
