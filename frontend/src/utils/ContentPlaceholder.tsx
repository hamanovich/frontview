import React from 'react';
import ContentLoader from 'react-content-loader';

const ContentPlaceholder = () => (
  <ContentLoader
    height={60}
    width={690}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    style={{ maxHeight: '60px' }}>
    <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
    <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
    <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />
    <rect x="15" y="20" rx="3" ry="3" width="130" height="10" />
    <rect x="155" y="20" rx="3" ry="3" width="130" height="10" />
    <rect x="15" y="40" rx="3" ry="3" width="90" height="10" />
    <rect x="115" y="40" rx="3" ry="3" width="60" height="10" />
    <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />
  </ContentLoader>
);

export default ContentPlaceholder;
