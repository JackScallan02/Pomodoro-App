import React from 'react';

class AvailPlaylistTable extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      selectedPlaylists: []
    }
  }
  
  radioButtonClicked() {
    //TODO: Set state of selectedPlaylists
    //Potentially remove this class and just put this inside of modal component
  }

  render() {
    return (
      <>
      <table className="table" style={{overflowY: 'scroll', height: '350px', display: 'block'}}>
        <tbody>
        {this.props.playLists && this.props.playLists.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row">
              <div>
                <input className="form-check-input" type="checkbox" id={index} value="" aria-label="..." onChange={this.radioButtonClicked}/>
              </div>
              </th>
              <td> <img src={item.images[0].url} alt="Playlist Image" width="50px"/> </td>
              <td>{ item.name }</td>
            </tr>
          );
        })}
        </tbody>
      </table>
      </>
    )
  }
}

export default AvailPlaylistTable;
