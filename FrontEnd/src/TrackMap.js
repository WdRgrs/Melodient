import React from 'react'
import axios from 'axios'

function TrackMap({ tracks, currentTracks, setCurrentTracks, showPlayer, setShowPlayer }) {

    const post = (song) => { 
        axios.post('https://dry-bayou-47591.herokuapp.com/song', song)
}

    return (
        <div>

            <div className="tracks"
                style={{
                    padding: '38px 0 0 0',
                    overflow: 'auto',
                    height: '87vh'
                }}
            >
        
                {tracks.map((x, key) => 
                    <div    
                        key={key}       
                        style={{
                            display: "inline-block",
                            justifyContent:'center',
                            alignContent: 'center',
                            textAlign: 'center',
                            padding: '5px',
                            margin: '-1vh 1.5vw',
                        }}
                    >
                        <img 
                            src={x.album.images[0].url} 
                            alt=''
                            style={{
                                display: "inline-flex",
                                justifyContent: 'center',
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
                            style={{
                                textAlign: 'center',
                                justifyContent: 'center',
                                width: '100px',
                                color: 'aqua',
                                maxHeight: '140px',
                                overflow: 'hidden',
                                margin: 'auto',
                            }}
                            onClick={() => {
                                post(x)
                                setCurrentTracks(x.uri); 
                                currentTracks === x.uri ? 
                                setShowPlayer(!showPlayer) 
                                : setShowPlayer(true)
                            }} 
                        >
                            {x.name}
                            <br /><br />
                            {x.artists.map(x => <div>* {x.name}</div>)} <br /> 
                        </div>

                    </div>

                )}

            </div>
        </div>
    )
}

export default TrackMap
