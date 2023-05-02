import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: 'rgba(0,0,0,.7)',
  },
};

ReactModal.setAppElement('#modal');

const Modal = ({ children, isOpen, closeModal }) => {
  return (
    <ReactModal
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      isOpen={isOpen}
      closeModal={closeModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
