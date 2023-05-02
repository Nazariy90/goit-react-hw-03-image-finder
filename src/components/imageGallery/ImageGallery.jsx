import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Modal from '../modal/Modal';

class ImageGallery extends Component {
  state = {
    isOpen: false,
    imageUrl: '',
  };

  handleOpenModal = imageUrl => {
    this.setState({ isOpen: true, imageUrl: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false, imageUrl: '' });
  };

  render() {
    const { hits } = this.props;

    return (
      <>
        <ul className={css.ImageGallery}>
          {hits.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onImageClick={this.handleOpenModal}
            />
          ))}
        </ul>

        <Modal isOpen={this.state.isOpen} closeModal={this.handleCloseModal}>
          <img
            style={{ width: 500, height: 400, objectFit: 'cover' }}
            src={this.state.imageUrl}
            alt=""
          />
        </Modal>
      </>
    );
  }
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
