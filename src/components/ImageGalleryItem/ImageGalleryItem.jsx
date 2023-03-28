import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import { useToggle } from '../hooks/useToggle';

function ImageGalleryItem({ imageURL, alt, largeIMG }) {
  const { isOpen, open, close } = useToggle();

  return (
    <li className={css.gallery_item}>
      <img src={imageURL} alt={alt} className={css.item_image} onClick={open} />
      {isOpen && (
        <Modal isOpen={isOpen} onClose={close}>
          <img className={css.modal_image} src={largeIMG} alt={alt} />
        </Modal>
      )}
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
  largeIMG: PropTypes.string.isRequired,
};
