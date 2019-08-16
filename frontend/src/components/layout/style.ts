import styled from 'styled-components';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

export const Menu = styled(Navbar)`
  border-radius: 0;
`;

export const MediaImage = styled(Image)`
  width: 25px;
  height: 25px;
  max-width: 25px;
  margin: -10px 5px -10px 0;
`;

export const SForm = styled(Form)`
  .form-control.is-invalid,
  .form-control.is-valid {
    background-image: none;
    padding-right: 0.75rem;
  }

  .form-group {
    margin-bottom: 0;
    padding-right: 1rem;
  }

  @media (max-width: 767px) {
    display: flex;
    width: 100%;
    padding-top: 1rem;

    .form-group {
      flex-grow: 1;

      input {
        width: 100%;
      }
    }
  }
`;
