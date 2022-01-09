
import axios from './Axios';
import React, { useState, useEffect } from 'react'
import './Row.css'
import  YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
function Row({ title, fetchUrl, isLargerow = false }) {
    const [movies, setmovies] = useState([]);
    const[trailerUrl, setTrailerUrl]=useState("")
    const base_url = "https://image.tmdb.org/t/p/original/"
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setmovies(request.data.results)
        }
        fetchData();
    }, [fetchUrl]);
    console.log(movies)
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      const handleClick =(movie)=>{
          if (trailerUrl){
              setTrailerUrl('');
          }else{
              movieTrailer(movie ?.name || "")
              .then(url=>{
                  const urlParms =new URLSearchParams( new URL(url).search);
                 setTrailerUrl( urlParms.get('v'));

              }).catch(error=>console.log(error))
          }
      }
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {movies.map((movie) => (
                    <img onClick={()=>handleClick(movie)}
                        className={`row_poster ${isLargerow && "row__posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${isLargerow ? movie.poster_path : movie.backdrop_path
                            }`} alt={movie.name} />
                ))}

            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}

        </div>
    )
}

export default Row
