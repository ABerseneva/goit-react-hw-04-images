import React, { Component } from 'react';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { imageURL, alt, largeIMG } = this.props;
    const { showModal } = this.state;
    return (
      <li className={css.gallery_item}>
        <img
          src={imageURL}
          alt={alt}
          className={css.item_image}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img className={css.modal_image} src={largeIMG} alt={alt} />
          </Modal>
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
  largeIMG: PropTypes.string.isRequired,
};
