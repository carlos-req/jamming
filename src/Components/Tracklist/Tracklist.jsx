import React from "react";
import "./Tracklist.css";

import Track from '../Track/Track'

export default class Tracklist extends React.Component {
  render(){
    return(
      <div className="TrackList">
        {this.props.tracks.map(track =>{
          return <Track onAdd={this.props.onAdd} track={track} key={track.id} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
        })}
      </div>
    )
  }
}