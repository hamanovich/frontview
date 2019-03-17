import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert';

export const FlashItem = styled(Alert)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  align-items: center;
  min-width: 290px;
  max-width: 90%;

  button {
    margin-left: 1.5rem;
  }

  + .alert {
    margin-top: 4rem;

    + .alert {
      margin-top: 8rem;

      + .alert {
        margin-top: 12rem;
      }
    }
  }
`;
