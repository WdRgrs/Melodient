import React from 'react';
import axios from 'axios';

function Artist({accessToken, albumTracks, setAlbumTracks, artistAlbums, artist, setCurrentTracks, currentTracks, setShowPlayer, showPlayer, uris, play, setPlay, setUris}) {

    let newAlbums = []

    const uniqueAlbums = [...new Set(artistAlbums.map(x => x.name))]

    for (let i = 0; i < uniqueAlbums.length; i++) {
        for (let j =0; j < artistAlbums.length; j++) {
            if (uniqueAlbums[i] === artistAlbums[j].name) {
                newAlbums.push(artistAlbums[j]);
                break;
            }
        }
    }

    async function fetchAlbumSongs(e) {
        const response = await fetch(`https://api.spotify.com/v1/albums/${e}/tracks`, {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
        const data = await response.json();
        // const { tracks } = data;
        // console.log(data.items)
        setAlbumTracks(data.items);
        setCurrentTracks(data.items.map(x => x.uri))
        setPlay(true);
    }

    const post = (song) => { 
        axios.post('https://dry-bayou-47591.herokuapp.com/song', song)
    }

    return (
        <div>
            <div>
                <h1 
                    style={{
                        width: "100vw",
                        padding: "20px 0 ",
                        fontSize: "4em",
                        color: 'aqua'
                    }}
                >{artist}'s Album{newAlbums.length > 1 ?  's' : ''} :</h1>
            </div>

        <div
            style={{
                display: "block",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
                flexDirection: "row",
                width: "80vw",
                height: '65vh',
                margin: 'auto',
                overflow: "auto",
                padding: '0 5%',
                color: 'aqua'
            }}
        >
            
            <div>
                {newAlbums.map(album => 
                    <div
                        style={{
                            display: "inline-block",
                            justifyContent: 'space-around',
                            alignContent: 'center',
                            overflow: 'auto'
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignContent: 'center',
                                padding: '1vh 5vw',
                                textAlign: 'center',
                            }}
                        >
                            <img 
                                src={album.images.length > 0 ? album.images[0].url : 'https://restorixhealth.com/wp-content/uploads/2018/08/No-Image.png' } 
                                alt=''
                                key={album.name}
                                style={{
                                    maxHeight: "100px",
                                    height: "5%",
                                    minHeight: '40px',
                                    width: 'auto',
                                    borderRadius: '0px',
                                }}
                                onClick={() => {
                                    fetchAlbumSongs(album.id);
                                    setShowPlayer(true);
                                    setCurrentTracks(uris);
                                }}
                            />

                            <div
                                style={{
                                    display: 'flex',
                                    width: "100px",
                                    padding: '10px 0',
                                    justifyContent: 'center'
                                }}
                                onClick={()=>{
                                    fetchAlbumSongs(album.id);
                                    setShowPlayer(true);
                                    setCurrentTracks(uris);
                                }} 
                            >
                                {album.name}
                            </div>

                        </div>

                    </div>
                )}
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    height: '60vh',
                    overflow: 'auto',
                    scrollbarColor: 'red'
                }}
            >


                <ol>
                {albumTracks.map((x, i) => 
                    <li 
                        id="scroll"
                        style={{

                            width: '100px',
                            color: 'white',
                        }}
                        onClick={() => {
                            post(x)
                            setCurrentTracks(x.uri); 
                            currentTracks === x.uri ? 
                            setShowPlayer(!showPlayer) 
                            : setShowPlayer(true)

                        }} 
                        key={i}
                    >
                        {x.name} <br /><br />
                    </li>
                )}
                    </ol>
            </div>
        </div>

     </div>
    )
}

export default Artist
