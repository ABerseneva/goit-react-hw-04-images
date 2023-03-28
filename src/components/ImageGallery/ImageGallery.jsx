import React from 'react';
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={css.gallery}>
        {images.map(image => (
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
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
