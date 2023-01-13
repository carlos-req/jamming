import React from 'react';
import './App.css';

import SearchResults  from '../SearchResults/SearchResults';
import SearchBar from'../SearchBar/SearchBar';
import Playlist from'../Playlist/Playlist';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      searchResults: [{name: 'Role Modelz', artist: 'JCole', album: '2014 Forrest Hills Dr', id: 1}
      ,{name: 'Humble', artist: 'Kendrick Lamar', album: 'DAMN', id: 2}]
    }
  }
  render() {
    return(
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} />
              <Playlist />
            </div>
          </div>
        </div>
    )
  }
}