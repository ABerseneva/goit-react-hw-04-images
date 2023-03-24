import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import css from '../components/App.module.css';
import getImages from '../api/imagesApi';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    status: 'idle',
    cuurentPage: 1,
  };

  handleGetImages = () => {
    this.setState({ status: 'pending' });
    getImages(this.state.searchQuery)
      .then(response =>
        this.setState({ images: response.data.hits, status: 'resolved' })
      )
      .catch(error =>
        this.setState({ error: error.message, status: 'rejected' })
      );
  };

  componentDidMount() {
    this.handleGetImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handleGetImages();
    }
    if (prevState.cuurentPage !== this.state.cuurentPage) {
      getImages(this.state.searchQuery, this.state.cuurentPage)
        .then(response =>
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            status: 'resolved',
          }))
        )
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }
  }

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  loadMore = () => {
    this.setState(prevState => ({ cuurentPage: prevState.cuurentPage + 1 }));
  };

  render() {
    const { status, images } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ToastContainer autoClose={3000} />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ToastContainer autoClose={3000} />
          <Loader />
        </div>
      );
    }

    if (status === 'rejected' || images.length === 0) {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ToastContainer autoClose={3000} />
          <p>Unfortunately there is no such image</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ToastContainer autoClose={3000} />
          <ImageGallery images={this.state.images} />
          {this.state.images.length !== 0 && (
            <Button onHandleClick={this.loadMore} />
          )}
        </div>
      );
    }
  }
}
