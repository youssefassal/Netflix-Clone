import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTUxMzQzYzM1ZjBiZTY4YjFlMWQ2MzhkY2Y4ODBhNSIsIm5iZiI6MTc1NjE0MDA5Ny40LCJzdWIiOiI2OGFjOTI0MWE3ODZlMzg3ZjcxZTU2MmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JL-Z97dxIhay-jXwILbh6kgXwky4cVHdWr2WJfQ6REs'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      if (res.results && res.results.length > 0) {
        setApiData(res.results[0]);
      }
    })
    .catch(err => console.error(err));
  }, [id])

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-1)}} />
      {apiData.key && (
        <iframe 
          width="90%" 
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer' 
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      )}
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
