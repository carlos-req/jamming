import React from 'react';
import './App.css';

import SearchResults  from '../SearchResults/SearchResults';
import SearchBar from'../SearchBar/SearchBar';
import Playlist from'../Playlist/Playlist';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      searchResults: [
       {name: "name1", artist:"artist1", album: "album1", id: 1},
       {name: "name2", artist:"artist2", album: "album2", id: 2},
       {name: "name4", artist:"artist4", album: "album4", id: 4}
    ],
      playlistName: "Coding Playlist",
      playlistTracks: [
        {name: "name1", artist:"artist1", album: "album1", id: 1},
        {name: "name2", artist:"artist2", album: "album2", id: 2},
        {name: "name3", artist:"artist3", album: "album3", id: 3}
      ]
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
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
    this.setState({playlistTracks : newPlTrack})
  }

  render() {
    return(
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
            </div>
          </div>
        </div>
    )
  }
}