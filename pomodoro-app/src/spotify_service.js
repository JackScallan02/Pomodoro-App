export function GetPlaylists() {

  const apiUrl = 'https://api.spotify.com/v1/users/22acukbvk3tk5p3puyd76zxdq/playlists';
  const api_key = 'BQBQD6wmDNrk7a7Z2rnlyWEm_EZ08XoAfyZdZZj2fyGFG4LSnk8quALEb3poIt5dqQQBTsg5NFQPgvZ4QNeFEIE2nJb-fmtMqc-zTwXsDuCR4sMb6IY'; //replace with key
  
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : `Bearer ${api_key}`
    }
  };

  fetch(apiUrl, requestOptions).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(data => {
    this.setState({playLists:data.items}, () => {
    })
    
  }).catch(error=>{
    console.log('Error: ', error);
  });
}