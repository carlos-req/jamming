let accessToken;
const clientID = '6f43c7be14c44e42bbfb38feb071e948'
const redirectURI= 'https://carlos-req.github.io/jamming/'
const Spotify ={
  getAccessToken(){
    if(accessToken) {
      return accessToken;
    }

    // check for an access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); 
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn= Number(expiresInMatch[1]);

      //This clears the parameters allowing us to grab a new access token when it expires
      window.setTimeout(()=> accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }else{
      const accessURL =`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      window.location= accessURL
    }
  },

  search(term){
    const accessToken = Spotify.getAccessToken();
    const url = `https://api.spotify.com/v1/search?type=track&q= ${term}`
    return fetch(url, { headers: {
        Authorization: `Bearer ${accessToken}`
    }}).then(response =>{
      return response.json();
    }).then(jsonResponse =>{
      if (!jsonResponse.tracks){
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if(!name || !trackUris.length ){
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers ={ Authorization: `Bearer ${accessToken}`};
    let userId;
    const url = `https://api.spotify.com/v1/me`

    return fetch(url, { headers: headers }
      ).then(response =>response.json()
      ).then(jsonResponse =>{
        userId = jsonResponse.id;
        return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers : headers,
          method : 'POST',
          body : JSON.stringify({ name : name })
        }).then(response  => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers : headers,
            method : 'POST',
            body: JSON.stringify({uris: trackUris})
          }).then(response => response.json()
          ).then(jsonResponse =>{

          })
        })
      })
      
  }



}


export default Spotify;