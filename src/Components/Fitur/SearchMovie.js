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
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=8aced447ac0b69fe5ae000b735a3adef&language=en-US&query=${searchKey}&page=1&include_adult=false`)
        .then((response) => {
          setSearch(response.data.results);
        })
        .catch((error) => {
          console.log(error);
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
          {search.length > 1 &&
            search.map((movie, index) => {
              return <RendersMovie key={movie.id} movie={movie} />;
            })}
        </Slider>
      </div>
    </div>
  );
}
export default SearchMovie;
