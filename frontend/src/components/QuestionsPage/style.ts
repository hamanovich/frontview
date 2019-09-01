import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export const BadgeStyled = styled(Badge)`
  margin-left: 6px;
`;

export const ApproveBar = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  h5 {
    margin: 0 1rem 0 0;
  }
`;

export const BadgeGroup = styled.span`
  .label {
    margin: 0 3px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const LabelVoted = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const Remove = styled(Button)`
  margin-top: 32px;
`;
