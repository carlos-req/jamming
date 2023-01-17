import React from 'react';
import './App.css';

import SearchResults  from '../SearchResults/SearchResults';
import SearchBar from'../SearchBar/SearchBar';
import Playlist from'../Playlist/Playlist';
import Spotify from '../../util/Spotify';

export default class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state= {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.search=this.search.bind(this);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist= this.savePlaylist.bind(this);
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }


  // Method to add a song to the playlist state
  addTrack(track) {
    //creating variable for current playlistracks state
    let savedTracks = this.state.playlistTracks;

    //checking if track pre-exists in playlist
    if(savedTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    savedTracks.push(track);
    //setting new state with updated tracks
    this.setState({playlistTracks : savedTracks})
  }

  removeTrack(track){
    //variable for current playlistTracks state
    let plTracks = this.state.playlistTracks;
    //filtering out matching track id from array
    const newPlTrack = plTracks.filter(pltrack=> pltrack.id !== track.id );
    //setting new state with removed track 
    this.setState({playlistTracks : newPlTrack});
  }

  updatePlaylistName(name){
    this.setState({playlistName : name});
  }

  savePlaylist(){
    const trackUris= this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }


  render() {
    return(
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <p>Search songs, Make Playlists & Upload them to Spotify</p>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} 
              onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName}
               playlistTracks={this.state.playlistTracks}
               onNameChange={this.updatePlaylistName}
                onRemove={this.removeTrack}
                onSave={this.savePlaylist}
                />
            </div>
          </div>
        </div>
    )
  }
}