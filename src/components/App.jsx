import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import css from '../components/App.module.css';
import getImages from '../api/imagesApi';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

const Status = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    getImages(searchQuery, currentPage)
      .then(response => {
        setImages(prev => [...prev, ...response.data.hits]);
        setStatus(Status.resolved);
      })
      .catch(error => {
        setError(error.message);
        setStatus(Status.rejected);
      });
  }, [searchQuery, currentPage, error]);

  const handleSubmit = str => {
    setSearchQuery(str);
    setImages([]);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  if (status === Status.idle) {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleSubmit} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }

  if (status === Status.pending) {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleSubmit} />
        <ToastContainer autoClose={3000} />
        <Loader />
      </div>
    );
  }

  if (status === Status.rejected || images.length === 0) {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleSubmit} />
        <ToastContainer autoClose={3000} />
        <p>Enter the image you want to search</p>
      </div>
    );
  }
  if (status === Status.resolved) {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleSubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery images={images} />
        {images.length !== 0 && <Button onHandleClick={loadMore} />}
      </div>
    );
  }
}
