import React, { Fragment, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ContentPlaceholder from './ContentPlaceholder';

// @ts-ignore
const WithContentLoader = (WrappedComponent, propName, count = 10) => props => {
  // @ts-ignore
  const WithLoaderComponent = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [nothingFound, setNothingFound] = useState(false);

    useEffect(() => {
      const timer = setInterval(() => {
        if (Array.isArray(props[propName]) && props[propName].length === 0) {
          setNothingFound(true);
        }

        if (props[propName] && Object.keys(props[propName]).length === 0) {
          setIsEmpty(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line
    }, [JSON.stringify(props[propName])]);

    const _props = propName.split(' ');
    // @ts-ignore
    const filtered = _props.filter(
      propOne => props[propOne] && Object.keys(props[propOne]).length !== 0,
    );

    if (nothingFound) {
      return (
        <Fragment>
          <h2 className="text-danger">
            We spent <strong>5</strong> seconds and nothing found
          </h2>
          <p>
            It may happen due to no data fetched by this request or some server
            issue. If you are sure this page/request should return any specific
            data, but it didn&apos;t, please{' '}
            <a href="mailto:hamanovich@gmail.com">contact admin</a> or create a
            ticket in{' '}
            <a
              href="https://github.com/hamanovich/frontview/issues"
              target="_blank"
              rel="noopener noreferrer">
              Github page
            </a>
          </p>
        </Fragment>
      );
    }

    if (isEmpty) {
      return (
        <Fragment>
          <h2 className="text-danger">
            After <strong>5</strong> seconds nothing found
          </h2>
          <p>Please specify your query or try again.</p>
        </Fragment>
      );
    }

    return filtered.length !== _props.length ? (
      <ListGroup>
        {[...Array(count)].map((_, index: number) => (
          <ListGroup.Item key={index}>
            <ContentPlaceholder />
          </ListGroup.Item>
        ))}
      </ListGroup>
    ) : (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <WrappedComponent {...props} />
    );
  };

  return <WithLoaderComponent />;
};

export default WithContentLoader;
