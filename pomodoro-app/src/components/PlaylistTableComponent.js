import React from 'react';

class PlaylistTable extends React.Component {
  
  constructor(props) {
    super(props);
    var playlistMap = new Map();
    if (props.playlistType == 'break')
      playlistMap = new Map(JSON.parse(localStorage.getItem("breakMap")));
    else {
      playlistMap = new Map(JSON.parse(localStorage.getItem("studyMap")));
    }
    this.state = {
      playlistMap: playlistMap ?? new Map()
    }
  }
  render() {
    console.log("map: ", this.playlistMap);
    return (
      <>
      <br/>
      {this.state.playlistMap.size ? (<table className="table">
      <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
        {this.state.playlistMap && Array.from(this.state.playlistMap.entries()).map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row" style={{width: '15px'}}></th>
              <td> <img src={item[1].imageUrl} alt="Playlist Image" width="50px"/> </td>
              <td>{ item[1].itemName }</td>
              <td>
              <button type="button" class="btn btn-outline-danger" onClick={()=>{
                this.state.playlistMap.delete(item[0]);
                console.log(this.state.playlistMap);
                if (this.props.playlistType=='break') {
                  localStorage.breakMap = JSON.stringify(Array.from(this.state.playlistMap.entries()));
                } else {
                  localStorage.studyMap = JSON.stringify(Array.from(this.state.playlistMap.entries()));
                }
                window.location.reload();
              }}>
              
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                </svg> Remove playlist
                </button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>) : (<p>You currently have no playlists in your break playlist</p>)}
      
      </>
    )
  }
}

export default PlaylistTable;