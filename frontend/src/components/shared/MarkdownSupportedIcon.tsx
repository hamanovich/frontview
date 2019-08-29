import React from 'react';

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const MarkdownSupportedIcon = () => (
  <OverlayTrigger
    placement="left"
    overlay={
      <Tooltip id="tooltip-top-md">Styling with Markdown is supported</Tooltip>
    }>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="#343a40">
      <path d="M22,4H2C0.897,4,0,4.897,0,6v12c0,1.103,0.897,2,2,2h20c1.103,0,2-0.897,2-2V6C24,4.897,23.103,4,22,4z M12,16h-2v-4.324 L9.375,13h-1.75L7,11.676V16H5V8h2l1.5,3.059L10,8h2V16z M17,16l-3-4h2V8h2v4h2L17,16z" />
    </svg>
  </OverlayTrigger>
);

export default MarkdownSupportedIcon;
