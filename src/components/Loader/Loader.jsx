import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader_wrap}>
      <p>Loading...</p>
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default Loader;
