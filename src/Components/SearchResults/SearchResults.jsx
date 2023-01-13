import React from "react";
import './SearchResults.css';
import { Tracklist } from './Components/Tracklist';

export default class SearchResults extends React.Component {
  render(){
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        {/*<Tracklist />*/}
      </div>
    )
  }
}