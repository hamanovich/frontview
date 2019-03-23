import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';

export const MediaImage = styled(Image)`
  width: 50px;
  height: 50px;
  margin-right: 16px;
`;

export const QuestionLink = styled(Link)`
  display: inline-block;
  margin-bottom: 5px;
  font-size: 24px;
`;
