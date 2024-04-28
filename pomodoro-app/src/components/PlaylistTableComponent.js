import React from 'react';

class PlaylistTable extends React.Component {
  render() {
    return (
      <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Playlist name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>data</td>
          </tr>
        </tbody>
      </table>
      </>
    )
  }
}

export default PlaylistTable;