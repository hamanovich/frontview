import styled from 'styled-components';

export const DropMe = styled.div`
  border-radius: 4px;
  border: 1px dashed #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  cursor: pointer;
  padding: 2rem 2rem 3rem;

  &:hover,
  &:focus-within {
    border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }

  &.dropzone--active {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
    border-color: #3c763d;
  }

  &.dropzone--reject {
    border-color: #a94442;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
  }

  &.dropzone--imgs {
    padding: 2rem;

    h3 {
      margin-top: 0;
    }
  }

  p {
    margin-bottom: 0;
  }
`;

export const DropThumbs = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: -0.5rem;
`;

export const DropThumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 1px solid #eaeaea;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  padding: 0.25rem;
  position: relative;

  .dropthumb__inner {
    display: flex;
    overflow: hidden;
    align-items: center;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
  }

  &:hover button {
    display: block;
  }

  img {
    display: block;
    width: auto;
    max-width: 100%;
  }
`;
