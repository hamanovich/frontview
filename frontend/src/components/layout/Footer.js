import React from 'react';
import styled from 'styled-components';

import Badge from 'react-bootstrap/lib/Badge';

const Foot = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding: 10px 0;
  background-color: #1a242f;
  text-align: center;
  color: #fff;
`;

const Footer = () => (
  <Foot>
    &copy; Front View <br />
    <Badge>v1.0.0</Badge>
    <br />
    <a href="mailto:hamanovich@gmail.com">hamanovich@gmail.com</a> <br />
    2017-{new Date().getFullYear()}
  </Foot>
);

export default Footer;
