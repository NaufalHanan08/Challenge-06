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
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // Ubah logika di sini, cek apakah token ada di localStorage
      const apiUrl = 'https://shy-cloud-3319.fly.dev/api/v1/movie/popular';

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPopular(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPopular([]);
    }
  }, [token]); // Hanya perlu memantau perubahan token

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
        {popular.length > 0 ? (
          <Paper elevation={3} style={{ margin: 35, marginBottom: 50 }}>
            <Row md={2}>
              <Col>
                <h4 style={{ textAlign: 'start', marginLeft: 30, marginTop: 20 }}>Popular Movie</h4>
              </Col>
              <Col>
                <Link to="movie/popular" style={{ textDecoration: 'none' }}>
                  <p
                    style={{
                      textAlign: 'end',
                      color: '#dc143c',
                      cursor: 'pointer',
                      marginRight: 30,
                      marginTop: 20,
                    }}
                  >
                    See All Movie <ArrowForwardRoundedIcon />
                  </p>
                </Link>
              </Col>
            </Row>
            <Slider {...settings}>
              {popular.map((movie) => {
                return (
                  <Tooltip title={movie.title || movie.original_title}>
                    <Link to={`/details/${movie.id}`}>
                      <img src={getPoster(movie.poster_path)} alt={movie.title || movie.original_title} style={{ margin: 20, width: 350, height: 500, borderRadius: 5, cursor: 'pointer' }} />
                    </Link>
                  </Tooltip>
                );
              })}
            </Slider>
          </Paper>
        ) : null}{' '}
        {/* Hapus pesan "Silakan login untuk melihat Popular Movies" */}
      </div>
    </div>
  );
};

export default PopularMovie;
