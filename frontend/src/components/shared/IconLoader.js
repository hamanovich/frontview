import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const FontIcon = styled(FontAwesome)`
  position: fixed;
  top: calc(50% - 6rem);
  left: calc(50% - 28px);
`;

const IconLoader = () => <FontIcon name="spinner" size="4x" pulse spin />;

export default IconLoader;
