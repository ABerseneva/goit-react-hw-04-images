import axios from 'axios';

export const getImages = (searchQuery, cuurentPage) => {
  const API = 'https://pixabay.com/api/';
  // const KEY = '34530075-32e11ccb96bcec05435981';

  return axios.get(
    `${API}?key=34530075-32e11ccb96bcec05435981ba8&q=${searchQuery}&image_type=photo&per_page=12&page=${cuurentPage}`
  );
};

export default getImages;
