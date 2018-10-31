import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 10px 0;
  background-color: #1a242f;
  text-align: center;
  color: #fff;
`;

const Footer = () => (
  <Foot>
    &copy; Front View <br /> 2017-2018
  </Foot>
);

export default Footer;
