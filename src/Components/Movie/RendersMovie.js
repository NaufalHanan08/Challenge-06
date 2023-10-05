//menampilkan hasil search
import * as React from 'react';
import { Paper } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//menampilkan search
const RendersMovie = ({ movie }) => {
  const getPoster = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterpath}`;
  };

  return (
    <div className="detilSearchPage">
      <Paper elevation={2} style={{ marginTop: 15, width: 800, height: 180, justifyContent: 'center', textAlign: 'start' }}>
        <Row>
          <Col md={3}>
            <Link to={`/details/${movie.id}${movie.title || movie.original_name}`}>
              <img src={getPoster(movie.poster_path)} alt="name" style={{ marginLeft: 15, marginTop: 15, width: 100, height: 150, borderRadius: 5, cursor: 'pointer' }} />
            </Link>{' '}
          </Col>
          <Col>
            <h2 style={{ marginTop: 15, fontWeight: 'bold' }}>{movie.title} </h2>
            <p style={{ marginTop: 15, fontWeight: 'bold' }}>Realease: {movie.release_date}</p>
            <p style={{ marginTop: 15, fontWeight: 'bold' }}>watch: {movie.popularity}</p>
          </Col>
        </Row>
      </Paper>
    </div>
  );
};

export default RendersMovie;
