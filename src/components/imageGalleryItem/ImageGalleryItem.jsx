import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => onImageClick(image.largeImageURL)}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={image.webformatURL}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
