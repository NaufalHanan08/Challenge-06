import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import RendersMovie from '../Movie/RendersMovie';
import Slider from 'react-slick';

function SearchMovie() {
  const [search, setSearch] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const searchMovies = () => {
      // Ganti "{{TOKEN}}" dengan cara yang sesuai untuk mengambil token otorisasi dari local storage
      const token = localStorage.getItem('token');

      axios
        .get(`https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${searchKey}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSearch(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (searchKey === '') {
      setSearch([]);
      return;
    }
    searchMovies();
  }, [searchKey]);

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
    <div>
      <div>
        <form style={{ justifyContent: 'center', textAlign: 'center' }} className="formSearchPage">
          <input
            className="inputSearch"
            style={{ color: 'red', fontWeight: 'bold' }}
            placeholder="What do you want to watch"
            type="text"
            onChange={(e) => {
              if (e.target.value === '') setSearch([]);
              setSearchKey(e.target.value);
            }}
          />
          <Tooltip title="Search">
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon color="primary" onClick={searchKey} />
            </IconButton>
          </Tooltip>
        </form>
      </div>
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
}

export default SearchMovie;
