import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Paper } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import MenuHome from '../Menu/MenuHome';
import Button from '@mui/material/Button';
import { PlayCircleOutlined } from '@ant-design/icons';
import Rating from '@mui/material/Rating';

function Detail() {
  const getPoster = (posterPath) => {
    return `https://www.themoviedb.org/t/p/original${posterPath}`;
  };

  const getBg = (bgPath) => {
    return `https://www.themoviedb.org/t/p/original${bgPath}`;
  };

  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams();
  const [trailerLink, setTrailerLink] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const apiUrl = `https://shy-cloud-3319.fly.dev/api/v1/movie/${id}`;

          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const movieData = response.data.data;

          if (movieData && movieData.id) {
            setMovieDetails(movieData);

            const videosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=5a1a8d073c4a8515a69dc7913d6f19ad`);
            const videosData = videosResponse.data.results;

            if (videosData.length > 0) {
              const trailerKey = videosData[0].key;
              setTrailerLink(`https://www.youtube.com/watch?v=${trailerKey}`);
            }
          } else {
            console.error('Invalid movie ID or data not found');
          }
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const whiteText = {
    color: 'white',
  };

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
              <Rating
                name="movie-rating"
                value={movieDetails.vote_average / 2} // Membagi nilai rating menjadi skala 0-5
                precision={0.5}
                readOnly
              />
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
