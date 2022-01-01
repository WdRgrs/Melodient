import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Login({accessToken, genreClick, setGenreClick, setCurrentTracks, currentTracks, setShowPlayer, showPlayer }) {
  const [name, setName] = useState('Click Login!');
  const [id, setId] = useState('Unkown');
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
      })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      setName(data.display_name);
      setId(data.id);
      setEmail(data.email)
    })

  }, [accessToken])

  useEffect(() => {
    axios.get('https://dry-bayou-47591.herokuapp.com/song_return').then((response)=> {
      // console.log(response.data)
      setGenreClick(response.data)
    })
  }, [])
  
  return (
    <div id="user">
      <div>Welcome {name}!!</div>
      <div>Your ID is {id}. ({email})</div>

      10 Most Recently Clicked Songs (all accounts):


      <div id="songs">
        {genreClick.slice(genreClick.length - 10).reverse().map(song => {
          return (  
            <div
              style={{
                fontSize: '1.1rem',
                lineHeight: '2rem',
                padding: '1rem'
              }}
            > 
              <div 
                id="songNames"
                onClick={() => {
                  setCurrentTracks(song.songURI); 
                  currentTracks === song.songURI ? 
                  setShowPlayer(!showPlayer) 
                  : setShowPlayer(true)
                }}
              >
                { song.songName}
              </div>

              by:

              <div id="artists">
                {song.artists.map(x => <div> + {x.name} </div>)}
              </div>

            </div>
          )
        })} 
      
      </div>
      
    </div>
  )

}

export default Login
