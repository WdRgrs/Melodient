import { useEffect } from 'react'
import {Link} from 'react-router-dom'

function GenreMap({ accessToken, setShowPlayer, setCurrentTracks, genres, setGenres, setTracks, setGenre, value, setValue }) {

    useEffect(() => {    
        fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then(response => response.json())
        .then(data => { 
          setGenres(data.genres);
        })
        // console.log('fetch')
    }, [accessToken, setGenres])
    
    async function fetchSongs(e) {

        const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_genres=${e}&min_popularity=0`, {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
        const data = await response.json();
        const { tracks } = data;
        setTracks(()=>tracks);
        setCurrentTracks(()=>[])
        setCurrentTracks(()=>data.tracks.map(x => x.uri))
    }

    return (

        <div
            style={{
                display: 'block',
            }}
        >
            <div>
                <input
                    autoComplete="off"
                    id="input"
                    style={{
                        margin: '20px 0 0 0',
                    }}
                    type="text"
                    value={value}
                    placeholder="Filter"
                    onChange={e=> setValue(e.target.value)}
                ></input>

                <button
                    id="x"
                    onClick={(e) => {
                        setValue('')
                    }}
                >
                    X
                </button>
            </div>

            <div className='container'
            style={{
                overflow: 'scroll',
                height: '75vh',
            }}>
                {genres
                .filter(genres => {
                    if (!value.toLowerCase()) return true;
                    if (genres.includes(value.toLowerCase())) {
                        return true
                    }
                })
                .map((x, i) => (
                    <div 
                        key={i}
                        className="genres" 
                        onClick={() => {
                            fetchSongs(x);
                            setGenre(x)
                            setShowPlayer(true);
                        }}
                        style={{
                            display: 'inline-flex',
                            minHeight: "1em",
                            padding: '0 1.5em 0 1em',
                            height: 'auto',
                            fontSize: ((Math.random()*70 + 16)) +'px',
                            width: 'auto',
                        }}
                    >
                        <Link to={`/genre/:${x}`}>
                            {x}
                        </Link>  
                    </div>
                ))} 
            </div> 

        </div> 

    )

}

export default GenreMap
