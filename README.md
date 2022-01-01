# [Melodient](https://melodient.herokuapp.com/)

![](https://github.com/WdRgrs/Melodient/blob/main/FrontEnd/public/homescreen.jpg?raw=true)

Utilizing the MERN Stack..<br>

## An App :
### That visually represents Spotify's library and genres that users can navigate through.  
#### By visually representing this data
- users will more easily be able to identify artist/song affiliations.  
- users will have easier access to new genres and styles of music.

## GOALS (more Nice to Haves, less MVPs) :
#### User features:
- [x] Create an account **OR** Access an existing account
- [x] Login / Logout
- [x] **Navigate** through the visual Library of music
- [x] **Search** Library via input 
- [x] Save songs / albums / playlists
- [x] Typical Spotify interactions/playback/functionality (like, pause, play, next song, etc)
- [x] Track the last 10 songs played by any user, displayed for all users

#### App features:
* Breadcrumb navigation bar *(Genres -> Artists -> Albums -> Songs)*
* At each level of scope, only applicable data will be supplied
    - Genre: A visual display of music genres : 
    >Selecting a specific genre will then populate the screen with artists in that genre
    - Artists: A visual display of music artists from the selected genre (previous layer being genre)
    >Selecting a specific artist will then populate the screen with albums or songs from that artist
    - Albums: Albums specific to the user selected artist, with songs to sample
    - Songs: Songs specific to the user selected artist/album
* Intuitive button navigation to dive deeper into the library or back up to a previous layer
* Song size is dynamic based on popularity (i.e. - more popular songs take up more screen real estate)


## Future Features: 
   - Library data will be mapped visually (D3)
        * More popular artists/genre/songs will be represented with larger text, warmer colors or proximity to focal points 
