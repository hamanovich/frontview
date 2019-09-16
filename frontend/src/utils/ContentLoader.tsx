import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import shortid from 'shortid';
import ContentPlaceholder from './ContentPlaceholder';

const WithContentLoader = (
  WrappedComponent: any,
  propName: string,
  count: number = 1,
) => (props: any) => {
  const WithLoaderComponent: FunctionComponent = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [nothingFound, setNothingFound] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (Array.isArray(props[propName]) && props[propName].length === 0) {
          setNothingFound(true);
        }

        if (props[propName] && Object.keys(props[propName]).length === 0) {
          setIsEmpty(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line
    }, [props[propName]]);

    const _props = propName.split(' ');
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
        {[...Array(count)].map(() => (
          <ListGroup.Item key={shortid.generate()}>
            <ContentPlaceholder />
          </ListGroup.Item>
        ))}
      </ListGroup>
    ) : (
      <WrappedComponent {...props} />
    );
  };

  return <WithLoaderComponent />;
};

export default WithContentLoader;
