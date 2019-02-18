import styled from 'styled-components';

export const Timeline = styled.ul`
  list-style-type: none;
  position: relative;

  &:before {
    content: ' ';
    background: #d4d9df;
    display: inline-block;
    position: absolute;
    left: 29px;
    width: 2px;
    height: 100%;
  }
`;

export const TimelineItem = styled.li`
  margin: 20px 0;
  padding-left: 20px;

  &:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #007bff;
    left: 20px;
    width: 20px;
    height: 20px;
  }

  a {
    position: relative;
    top: -0.25rem;
  }
`;
