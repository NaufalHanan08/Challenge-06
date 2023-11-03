import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Col, Row } from 'react-bootstrap';

const RendersMovie = ({ movie }) => {
  const getPoster = (posterPath) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterPath}`;
  };

  return (
    <div className="detilSearchPage">
      <Paper elevation={2} style={{ marginTop: 15, width: 800, height: 180, justifyContent: 'center', textAlign: 'start' }}>
        <Row>
          <Col md={3}>
            <Link to={`/details/${movie.id}`}>
              <img src={getPoster(movie.poster_path)} alt={movie.title} style={{ marginLeft: 15, marginTop: 15, width: 100, height: 150, borderRadius: 5, cursor: 'pointer' }} />
            </Link>
          </Col>
          <Col>
            <h2 style={{ marginTop: 15, fontWeight: 'bold' }}>{movie.title}</h2>
            <p style={{ marginTop: 15, fontWeight: 'bold' }}>Release: {movie.release_date}</p>
            <p style={{ marginTop: 15, fontWeight: 'bold' }}>Popularity: {movie.popularity}</p>
          </Col>
        </Row>
      </Paper>
    </div>
  );
};

export default RendersMovie;
