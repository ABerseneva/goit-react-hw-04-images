import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchString: '',
  };

  handleChange = event => {
    this.setState({
      searchString: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.searchString) {
      toast.warn('Fill in the field!');
      return;
    }
    this.props.onSubmit(this.state.searchString);
    this.setState({ searchString: '' });
  };

  render() {
    const { searchString } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={searchString}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
