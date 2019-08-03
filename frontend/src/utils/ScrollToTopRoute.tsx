import { useEffect, FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ScrollToTopRouteProps } from './models';

const ScrollToTopRoute: FC<ScrollToTopRouteProps & RouteComponentProps> = ({
  history,
}) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

export default withRouter(ScrollToTopRoute);
