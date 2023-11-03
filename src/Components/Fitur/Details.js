import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import MenuHome from '../Menu/MenuHome';
import Button from '@mui/material/Button';
import { PlayCircleOutlined } from '@ant-design/icons';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../redux/actions/detailActions';

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movieDetails = useSelector((state) => state.detail.movieDetails);
  const isLoading = useSelector((state) => state.detail.isLoading);
  const error = useSelector((state) => state.detail.error);

  const getPoster = (posterPath) => {
    return `https://www.themoviedb.org/t/p/original${posterPath}`;
  };

  const getBg = (bgPath) => {
    return `https://www.themoviedb.org/t/p/original${bgPath}`;
  };

  const [trailerLink] = useState('');

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const whiteText = {
    color: 'white',
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <MenuHome />
      </div>
      <Paper
        elevation={3}
        style={{
          border: '1px solid gray',
          margin: 15,
          height: 650,
          justifyContent: 'center',
          textAlign: 'start',
          backgroundImage: `url(${getBg(movieDetails.backdrop_path)}`,
        }}
      >
        <Row>
          <Col md={3}>
            <img
              src={getPoster(movieDetails.poster_path)}
              alt={movieDetails.original_title}
              style={{
                marginLeft: 15,
                marginTop: 15,
                width: 400,
                height: 600,
                borderRadius: 5,
                cursor: 'pointer',
              }}
            />
          </Col>
          <Col>
            <h1 style={{ margin: 15, marginTop: 40, marginBottom: 25, fontWeight: 'bold', ...whiteText }}>{movieDetails.original_title}</h1>
            <p style={{ margin: 15, marginRight: 500, marginLeft: 15, ...whiteText }}>{movieDetails.overview}</p>
            <p style={{ margin: 15, ...whiteText }}>Popularity: {movieDetails.popularity}</p>
            <p style={{ margin: 15, ...whiteText }}>
              <small>Release Date: {movieDetails.release_date}</small>
            </p>
            <div style={{ margin: 15 }}>
              <h5 style={{ fontWeight: 'bold', marginBottom: 5, ...whiteText }}>Genre:</h5>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {movieDetails.genres &&
                  movieDetails.genres.map((genre) => (
                    <li
                      key={genre.id}
                      style={{
                        display: 'inline',
                        marginRight: 10,
                        background: '#007bff',
                        color: '#fff',
                        padding: '2px 10px',
                        borderRadius: 5,
                      }}
                    >
                      {genre.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div style={{ margin: 15 }}>
              <h5 style={{ fontWeight: 'bold', marginBottom: 5, ...whiteText }}>Rating:</h5>
              <Rating name="movie-rating" value={movieDetails.vote_average / 2} precision={0.5} readOnly />
            </div>
            {trailerLink && (
              <a href={trailerLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    marginTop: 5,
                    marginLeft: '15px',
                    width: '25ch',
                    borderRadius: '20px',
                    fontSize: 15,
                  }}
                  variant="contained"
                  size="small"
                >
                  <PlayCircleOutlined style={{ marginRight: '5px' }} />
                  WATCH TRAILER
                </Button>
              </a>
            )}
            <Link to={`/`}>
              <Button
                sx={{
                  marginTop: 5,
                  marginLeft: '15px',
                  borderRadius: '20px',
                  fontSize: 15,
                }}
                variant="contained"
                color="success"
              >
                Back to Home
              </Button>
            </Link>
          </Col>
        </Row>
      </Paper>
    </div>
  );
}

export default Detail;
