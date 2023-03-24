import React from 'react';
import css from '../Button/Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onHandleClick }) => {
  return (
    <button
      className={css.button}
      type="button"
      onClick={() => onHandleClick()}
    >
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onHandleClick: PropTypes.func.isRequired,
};
