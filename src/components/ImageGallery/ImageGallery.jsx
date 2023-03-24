import React, { Component } from 'react';
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={css.gallery}>
          {this.props.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              imageURL={image.webformatURL}
              alt={image.tags}
              largeIMG={image.largeImageURL}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
