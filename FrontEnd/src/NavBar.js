import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NavBar({genre, setTracks, setCurrentTracks, accessToken, setShowPlayer, setGenre, setGenres}) {
   
    useEffect(() => {    
        fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then(response => response.json())
        .then(data => { 
          setGenres(data.genres)
        })
    }, [accessToken, setGenres])
   
    async function fetchSongs(e) {
        const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_genres=${e}&min_popularity=0`, {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
        const data = await response.json();
        const { tracks } = data;
        setTracks(tracks);
        setCurrentTracks(data.tracks.map(x => x.uri))
    }
    return (
    
            <nav
                style={{
                    display: 'flex',
                    justifyContent:"space-between",
                    alignItems: 'center',
                    backgroundColor: "rgba(0, 15, 25, 0.9)",
                    padding: '10px 50px',
                    borderBottom: '2px solid rgba(0, 255, 255, 0.486)',
                    // margin: '0 0 40px 0'

                }}
            >
                <div
                    className="dropdown"
                    style={{
                        fontSize: '1.5vw',
                    }}
                >
                    <div
                        className="dropbtn"
                        style={{
                            display: 'flex',
                            position: 'relative',
                            margin: '0 20px',
                            textTransform:'capitalize',
                            color: 'rgba(0, 255, 255, 1)',
                            left: '0',
                            fontSize: '2rem',
                            animation: 'none',
                            zIndex: 'auto',
                        }}
                    >Profile</div>

                    <div className="dropdown-content-profile">

                        <Link to='/login'>About</Link>
                        <div onClick={()=> {sessionStorage.clear(); window.location.reload(false)}}>LOGOUT</div>
                        {/* <Link to='/searchArtists'>Logout</Link> */}
                    </div>

                </div>

                <div
                    id="landingHeader"
                    style={{
                        display: 'flex',
                        position: 'relative',
                        margin: '0 20px',
                        textTransform:'capitalize',
                        color: 'rgba(0, 255, 255, 1)',
                        left: '0',
                        fontSize: '4rem',
                        animation: 'none',
                        zIndex: 'auto',
                    }}
                >
                    <Link to='/'>Melodient</Link>
                    <Link to={`/genre/:${genre}`}>
                        <div
                            style={{
                                padding: '0 40px'
                            }}
                            onClick={() => {
                                fetchSongs(genre);
                                setGenre(genre)
                                setShowPlayer(true);
                            }}>

                          { genre}  
                        </div>   
                    </Link>
                </div>

                <div
                    className="dropdown"
                    style={{
                        fontSize: '1.5vw',
                    }}
                >
                    <div
                        className="dropbtn"
                        style={{
                            display: 'flex',
                            position: 'relative',
                            margin: '0 20px',
                            textTransform:'capitalize',
                            color: 'rgba(0, 255, 255, 1)',
                            left: '0',
                            fontSize: '2rem',
                            animation: 'none',
                            zIndex: 'auto',
                        }}
                    >Search</div>

                    <div className="dropdown-content">

                        <Link to='/searchTracks'>Tracks</Link>

                        <Link to='/searchArtists'>Artists</Link>
                    </div>

                </div>
                
            </nav>
       
    )
}

export default NavBar
