import React, { Component } from 'react';
import { shape, func, string } from 'prop-types';

class ZoomImage extends Component {
  static propTypes = {
    zoom: shape({
      clone: func.isRequired,
    }).isRequired,
    background: string.isRequired,
    src: string.isRequired,
    alt: string,
  };

  static defaultProps = {
    alt: '',
  };

  zoom = this.props.zoom.clone({
    background: this.props.background,
  });

  attachZoom = image => {
    this.zoom.attach(image);
  };

  render() {
    return <img src={this.props.src} alt={this.props.alt} ref={this.attachZoom} />;
  }
}

export default ZoomImage;
