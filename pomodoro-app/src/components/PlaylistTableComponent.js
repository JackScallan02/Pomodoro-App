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
        {this.state.playlistMap && Array.from(this.state.playlistMap.values()).map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row"></th>
              <td> <img src={item.imageUrl} alt="Playlist Image" width="50px"/> </td>
              <td>{ item.itemName }</td>
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