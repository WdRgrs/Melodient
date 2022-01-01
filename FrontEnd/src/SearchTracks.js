import React from 'react'
import axios from 'axios'

function SearchTracks({ accessToken, currentTracks, setCurrentTracks, searchList, setSearchList, showPlayer, setShowPlayer, searchTrack, setSearchTrack }) {

    async function testSearch(searchTrack) {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTrack}&type=track`, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        const data = await response.json();
        setSearchList(data.tracks.items)
    }

    function handleSubmit(e) {
            e.preventDefault();
            testSearch(searchTrack);
            setSearchTrack('');
    }
    
    const post = (song) => { 
        axios.post('https://dry-bayou-47591.herokuapp.com/song', song)
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
                    placeholder='Track' 
                    value={searchTrack} 
                    type="text"
                    onChange={e => 
                        setSearchTrack(e.target.value)
                    }
                ></input>
                <button
                    id="x"
                    onClick={(e) => {
                        e.preventDefault();
                        setSearchList([]);
                        setSearchTrack('');
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
                <br />Tracks: <br />

                {searchList.length > 0 ? 
                    searchList.map((x, key) => 

                        <div    
                            key={key}       
                            style={{
                                display: "inline-block",
                                justifyContent: 'space-around',
                                alignContent: 'center',
                                padding: '40px'
                            }}
                        >

                            <img 
                                src={x.album.images[0].url} 
                                alt=''
                                key={x}
                                style={{
                                    height: x.popularity + 50,
                                    width: x.popularity + 50,
                                    borderRadius: '50%',
                                    border: '3px solid aqua',
                                    opacity: '.7'
                                }}
                                onClick={() => {
                                    post(x);
                                    setCurrentTracks(x.uri); 
                                    currentTracks === x.uri ? 
                                    setShowPlayer(!showPlayer) 
                                    : setShowPlayer(true)
                                }}
                            />

                            <div 
                                key={key} 
                                style={{
                                    width: '150px',
                                    color: 'aqua',
                                    overflow: 'auto',
                                    fontSize: '.4em',
                                }}
                                onClick={() => {
                                    post(x);
                                    setCurrentTracks(x.uri); 
                                    currentTracks === x.uri ? 
                                    setShowPlayer(!showPlayer) 
                                    : setShowPlayer(true)
                                }} 
                            >
                                {x.name} <br /><br />
                                {x.artists.map(x => <div>* {x.name}</div>)} <br />            
                            </div>
                            
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
                    ><br />Search for Tracks ( with or without Artists )</div>
                }
                
            </div>
                
        </div>
    )
}

export default SearchTracks


        
        // console.log('all -')
        // console.log(data.tracks.items);
        // console.log('artist -')
        // console.log(data.tracks.items[0].artists[0].name); //only returns back the first artist so far
        // console.log('album -')
        // console.log(data.tracks.items[0].album.name); //name of the album that song is on
        // console.log(data.tracks.items[0].album.images[0]); //usually an array of 3 - first one might be album cover? would be cool to onclick change photo to back