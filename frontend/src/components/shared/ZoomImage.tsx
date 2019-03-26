import React, { Component } from 'react';

import { ZoomImageProps } from './models';

class ZoomImage extends Component<ZoomImageProps> {
  private zoom = this.props.zoom.clone({
    background: this.props.background,
  });

  private attachZoom = (image: HTMLImageElement) => {
    this.zoom.attach(image);
  };

  render() {
    const { src, alt } = this.props;

    return <img src={src} alt={alt} ref={(img: HTMLImageElement) => this.attachZoom(img)} />;
  }
}

export default ZoomImage;
