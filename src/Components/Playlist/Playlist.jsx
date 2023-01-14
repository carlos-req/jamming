import React from "react";
import "./Playlist.css";

import Tracklist from "../Tracklist/Tracklist";

export default class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  render(){
    return(
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={'New Playlist'}/>
        <Tracklist onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks}/>
        <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}