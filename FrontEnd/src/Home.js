import { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Login from './Login';
import GenreMap from './GenreMap';
import SearchTracks from './SearchTracks';
import SearchArtists from './SearchArtists';
import TrackMap from './TrackMap';
import Artist from './Artist';
import Lists from './Lists';
import NavBar from './NavBar';

export default function Home({accessToken}) {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')
  const [tracks, setTracks] = useState([])
  const [value, setValue] = useState('')
  const [albumTracks, setAlbumTracks] = useState([])
  const [artist, setArtist] = useState('')
  const [currentTracks, setCurrentTracks] = useState('')
  const [showPlayer, setShowPlayer] = useState(false)
  const [searchList, setSearchList] = useState ([])
  const [searchListArtist, setSearchListArtist] = useState ([])
  const [searchTrack, setSearchTrack] = useState('')
  const [searchArtist, setSearchArtist] = useState('')
  const [artistAlbums, setArtistAlbums] = useState([])
  const [uris, setUris] = useState([])
  const [play, setPlay] = useState(true)
  const [genreClick, setGenreClick] = useState([])

  // console.log('render')

  return (
    <div className=''>

    <Router>

      <NavBar 
        genre={genre}
        accessToken={accessToken}
        setCurrentTracks={setCurrentTracks}
        setTracks={setTracks}
        setGenre={setGenre}
        setGenres={setGenres}
        setShowPlayer={setShowPlayer}
      />

      <div>
        
        <Switch>
          <Route path='/' exact>
              <GenreMap 
                accessToken={accessToken}
                setCurrentTracks={setCurrentTracks}
                setShowPlayer={setShowPlayer}
                genres={genres}
                setGenres={setGenres}
                value={value}
                setValue={setValue}
                setGenre={setGenre}
                setTracks={setTracks}
              />
          </Route>

          <Route path='/genre/:genre'>
            <TrackMap 
              tracks={tracks}
              currentTracks={currentTracks}
              setCurrentTracks={setCurrentTracks}
              showPlayer={showPlayer}
              setShowPlayer={setShowPlayer}
            />
          </Route>

          <Route path='/artist/:artist'>
            <Artist
              accessToken={accessToken}
              albumTracks={albumTracks}
              setAlbumTracks={setAlbumTracks}
              artistAlbums={artistAlbums}
              artist={artist} 
              setCurrentTracks={setCurrentTracks}     
              currentTracks={currentTracks}  
              setShowPlayer={setShowPlayer}    
              showPlayer={showPlayer}
              uris={uris}
              setUris={setUris}
              setPlay={setPlay}
              play={play}
            />
          </Route>

          <Route path='/login' exact>
            <Login 
              accessToken={accessToken}
              genreClick={genreClick}
              setGenreClick={setGenreClick}
              setCurrentTracks={setCurrentTracks}
              currentTracks={currentTracks}
              setShowPlayer={setShowPlayer}
              showPlayer={showPlayer}
            />
          </Route>

          <Route path='/searchTracks' exact>
            <SearchTracks
              accessToken={accessToken}
              currentTracks={currentTracks}
              setCurrentTracks={setCurrentTracks}
              searchList={searchList}
              setSearchList={setSearchList}
              showPlayer={showPlayer}
              setShowPlayer={setShowPlayer}
              searchTrack={searchTrack}
              setSearchTrack={setSearchTrack}
            />
          </Route>

          <Route path='/searchArtists' exact>
            <SearchArtists
              accessToken={accessToken}
              searchArtist={searchArtist}
              setSearchArtist={setSearchArtist}
              searchListArtist={searchListArtist}
              setSearchListArtist={setSearchListArtist}
              setArtistAlbums={setArtistAlbums}
              setArtist={setArtist}
              setCurrentTracks={setCurrentTracks}       
            />
          </Route>

          <Route path='/'  render={()=> <div>404 - Not found - But hey! At least there's a to-do list</div>}>
            <Lists />
          </Route>

        </Switch>
      </div>
    </Router> 
    
      <div 
        id="player"
        style={{
          display: 'flex',
          position: 'fixed',
          bottom: '25px',
          left: '33vw',
          justifyContent: 'center',
          justifySelf: 'center',
          alignItems: 'center',
          margin: 'auto',
          minWidth: '300px',
          width: '30vw',
          borderRadius: '7px',
          border: '2px solid aqua'
        }}
      >
        {showPlayer ? 
          <SpotifyPlayer
            token={accessToken}
            magnifySliderOnHover={true}
            showSaveIcon={true}
            initialVolume={.35}
            play={true}
            uris={currentTracks}

            styles={{
              activeColor: '#fff',
              altColor: '#ccc',
              bgColor: 'rgba(20, 120, 240, .5)',
              color: '#fff',
              errorColor: '#a60000',
              loaderColor: 'yellow',
              sliderColor: '#1cb954',
              sliderTrackColor: '#ccc',
              trackArtistColor: 'white',
              trackNameColor: 'white',
              sliderHandleBorderRadius: '50%',
              sliderTrackBorderRadius: 0,
              sliderHeight: 4,
              height: 40,
              loaderSize: 32,
            }}
          /> 
          : null
        }
      </div>

    </div>
    
  )

}

//TO DO:

// 1. On Track Click - active song becomes highlighted / maybe artist name and album pop up
//          -Click on Album/Artist from expnaded info sheet
//          -Set Size to popularity
//          -Click on Genre (turns into back-button), removes other genres

// 3. Add Database
//          generically what DB is going to be best for me?
//          how to connect a db to a server
//          how to store input from front end to database

// 4. AutoPlay Next song?
// switch fetch to axios ??? Not necessary as of right now 


// DONE DONE DONE WOOOO
// 2. Add Search

// https://fonts.google.com/specimen/Fredericka+the+Great?preview.text=Melodient&preview.text_type=custom&category=Display
// https://fonts.google.com/specimen/IM+Fell+Great+Primer+SC?preview.text=Melodient&preview.text_type=custom&category=Serif
// https://fonts.google.com/specimen/Emilys+Candy?preview.text=Melodient&preview.text_type=custom&category=Display
// https://fonts.google.com/specimen/Jacques+Francois+Shadow?preview.text=Melodient&preview.text_type=custom&category=Display
// https://fonts.google.com/specimen/Cinzel?preview.text=Melodient&preview.text_type=custom&category=Serif
// https://fonts.google.com/specimen/Jacques+Francois+Shadow?category=Display&preview.text=Folk&preview.text_type=custom
