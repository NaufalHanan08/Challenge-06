import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import RendersMovie from '../Movie/RendersMovie';
import Slider from 'react-slick';
import { searchMovies, clearSearchResults } from '../../redux/actions/searchMovieActions';

const SearchMovie = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchResults);

  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    if (searchKey.length >= 3) {
      dispatch(searchMovies(searchKey));
    } else {
      dispatch(clearSearchResults());
    }
  }, [searchKey, dispatch]);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log('before change', currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log('after change', currentSlide);
    },
  };

  return (
    <div style={{ justifyContent: 'center', textAlign: 'center' }}>
      <form className="formSearchPage">
        <input
          className="inputSearch"
          style={{ color: 'red', fontWeight: 'bold' }}
          placeholder="What do you want to watch"
          type="text"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <Tooltip title="Search">
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon
              color="primary"
              onClick={() => {
                if (searchKey.length >= 3) {
                  dispatch(searchMovies(searchKey));
                }
              }}
            />
          </IconButton>
        </Tooltip>
      </form>

      <div>
        <Slider {...settings}>
          {search.length > 0 &&
            search.map((movie, index) => {
              return <RendersMovie key={movie.id} movie={movie} />;
            })}
        </Slider>
      </div>
    </div>
  );
};

export default SearchMovie;
