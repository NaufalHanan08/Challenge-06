import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Col, Tooltip } from 'antd';
import { Paper } from '@mui/material';
import { Row } from 'react-bootstrap';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from 'react-router-dom';

const PopularMovie = () => {
  const getPoster = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterpath}`;
  };

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=44bb27216833398dd75c6b3cf00f51bd&language=en-US`)
      .then((response) => {
        setPopular(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    rows: 5,
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginTop: 100 }}>
        <Paper elevation={3} style={{ margin: 35, marginBottom: 50 }}>
          <Row md={2}>
            <Col>
              <h4 style={{ textAlign: 'start', marginLeft: 30, marginTop: 20 }}> Popular Movie</h4>
            </Col>
            <Col>
              <Link to="movie/popular" style={{ textDecoration: 'none' }}>
                <p style={{ textAlign: 'end', color: '#dc143c', cursor: 'pointer', marginRight: 30, marginTop: 20 }}>
                  See All Movie <ArrowForwardRoundedIcon />
                </p>
              </Link>
            </Col>
          </Row>
          <Slider {...settings}>
            {popular.map((movie) => {
              return (
                <Tooltip title={movie.title || movie.original_name}>
                  <Link to={`/details/${movie.id}${movie.title || movie.original_name}`}>
                    <img src={getPoster(movie.poster_path)} alt="name" style={{ margin: 20, width: 350, height: 500, borderRadius: 5, cursor: 'pointer' }} />
                  </Link>
                </Tooltip>
              );
            })}
          </Slider>
        </Paper>
      </div>
    </div>
  );
};

export default PopularMovie;
