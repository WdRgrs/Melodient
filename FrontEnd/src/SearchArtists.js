import React from 'react'
import { Link } from 'react-router-dom'

function SearchArtists({ accessToken, setArtist, setCurrentTracks, setArtistAlbums, searchArtist, setSearchArtist, searchListArtist, setSearchListArtist }) {

    async function testSearchArtist(searchArtist) {
        searchArtist =searchArtist.toLowerCase()
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchArtist}&type=artist`, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        const data = await response.json();
        setSearchListArtist(data.artists.items)
        // console.log(data.artists.items);
    }

    async function fetchArtist(id) {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
        const data = await response.json();
        
        const { items } = data;
        setArtistAlbums(items)
    }

    function handleDoubleClick(artistAlbums) {
        artistAlbums.map(x => console.log(x.name))
    }

    function handleSubmit(e) {      
            e.preventDefault();
            testSearchArtist(searchArtist);
            setSearchArtist('');
            // console.log(searchListArtist);
    }

    return (

        <div
            style={{
                padding: '50px',
                // border: '2px solid red',
                overflow: 'auto'
            }}
        >
            <form onSubmit={()=>handleSubmit}>
                <button
                    id="submt" 
                    onClick={handleSubmit}
                >
                    Search
                </button>
                <input 
                    placeholder='Artist' 
                    value={searchArtist} 
                    type='text'
                    onChange={e => 
                        setSearchArtist(e.target.value)
                    }
                ></input>

                <button
                    id="x"
                    onClick={(e) => {
                        e.preventDefault();
                        setSearchListArtist([]);
                        setSearchArtist('');
                    }}
                >
                    X
                </button>

            </form>

            <div
                style={{
                    overflow: 'auto',
                    height: '70vh',
                    color: 'aqua',
                    fontSize: '3em',
                    // border: '2px solid red',
                }}
            >
                <br />Artists: <br />

                {searchListArtist.length > 0 ? 
                    searchListArtist.map((artist, i) => 
                    <div    
                        key={artist + i}       
                        style={{
                            display: "inline-block",
                            justifyContent: 'space-around',
                            alignContent: 'center',
                            padding: '40px',
                            // border: '2px solid red'
                        }}
                    >

                        <Link to={`/artist/:${artist.name}`}>
                            <img 
                                src={artist.images.length > 0 ? artist.images[0].url : 'https://restorixhealth.com/wp-content/uploads/2018/08/No-Image.png'}
                                alt=''
                                key={artist}
                                style={{
                                height: "75px",
                                width: 'auto',
                                borderRadius: '15%',
                                border: '3px solid aqua',
                                opacity: '.7'
                                }}
                                onClick={() => {
                                    fetchArtist(artist.id);
                                    console.log(artist)
                                //   setCurrentTracks(x.uri); 
                                //   currentTracks === x.uri ? 
                                //     setShowPlayer(!showPlayer) 
                                //     : setShowPlayer(true)
                                }}
                            />
                        </Link> 

                        <Link to={`/artist/:${artist.name}`}>
                            <div 
                                style={{
                                    width: '100px',
                                    color: 'aqua', 
                                    overflow: 'auto',
                                    fontSize: '.4em',
                                }}

                                onClick={() => {
                                    console.log(artist.name);
                                    fetchArtist(artist.id);
                                    setArtist(artist.name);
                                    setCurrentTracks('')
                                }} 
                                onDoubleClick={handleDoubleClick}
                                key={i}>
                                    {artist.name}
                            </div>
                        </Link>

                    </div>
                    )
                    : <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            margin: 'auto',
                            fontSize: '.7em',
                            width: 'fit-content',
                            color: 'aqua',
                        }}
                    ><br />Search for albums by specific artists!</div>
                }

            </div>

        </div>
    )
}

export default SearchArtists

    
        // console.log(data)
        // console.log('all -')
        // console.log('artist -')
        // console.log(data.artists.items[0].artists[0].name); //only returns back the first artist so far
        // console.log('album -')
        // console.log(data.artists.items[0].album.name); //name of the album that song is on
        // console.log(data.artists.items[0].album.images[0]); //usually an array of 3 - first one might be album cover? would be cool to onclick change photo to back
