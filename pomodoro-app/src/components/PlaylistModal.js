import React from 'react';
import {Button, Modal} from 'react-bootstrap';

class PlaylistModal extends React.Component {
  constructor(props) {
    super(props);
    var breakMap;
    var studyMap;
    
    if (!localStorage.getItem("breakMap")) {
      breakMap = new Map();
    } else {
      breakMap = new Map(JSON.parse(localStorage.getItem("breakMap")));
    }
    
    if (!localStorage.getItem("studyMap")) {
      studyMap = new Map();
    } else {
      studyMap = new Map(JSON.parse(localStorage.getItem("studyMap")));
    }
    
    this.state={
      show:false,
      playLists: [],
      breakMap: breakMap,
      studyMap: studyMap,
    }
  }
  handleModal() {
    this.setState({show:!this.state.show})
  }
  getPlaylists() {

    const apiUrl = 'https://api.spotify.com/v1/users/22acukbvk3tk5p3puyd76zxdq/playlists';
    const api_key = 'BQDFyJdvtaesmQwpXIC92HXLB-qurDs7jltskqhUMZf8gonED8rXhMqcFgtDECVq2E-neRKOrNIR17GBX59yhD5lAFA0DFgNUSI3wtu5ACDn0nWwVv4'; //replace with key
    
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
  
  setPlaylistMap(map, index, imageUrl, itemName, playlistId) {
    if (map.has(playlistId)) {
      map.delete(playlistId);
    } else {
      map.set(playlistId, {imageUrl: imageUrl, itemName: itemName});
    }
  }
  
  radioButtonClicked(imageUrl, itemName, index, playlistId) {
    if (this.props.playlistType == 'study') {
      this.setPlaylistMap(this.state.studyMap, index, imageUrl, itemName, playlistId);
    } else {
      this.setPlaylistMap(this.state.breakMap, index, imageUrl, itemName, playlistId);
    }
  }
  
  render() {
    return (
      <>
      <Button onClick={()=>{this.handleModal(); this.getPlaylists()}}>{this.props.buttonText}</Button>
      <Modal show={this.state.show} onHide={()=>{this.handleModal()}}>
        <Modal.Header closeButton>{this.props.modalHeader}</Modal.Header>
        <Modal.Body>
          <table className="table" style={{overflowY: 'scroll', height: '350px', display: 'block'}}>
            <tbody>
            {this.state.playLists && this.state.playLists.map((item, index) => {
              
                
              return (
                <>
                {((this.props.playlistType=='break' && !this.state.breakMap.has(item.id)) || (this.props.playlistType=='study' && !this.state.studyMap.has(item.id))) &&
                (      
                  <tr key={index}>
                  <th scope="row">
                  <div>
                    <input className="form-check-input" type="checkbox" id={index} value="" aria-label="..." onChange={()=>{this.radioButtonClicked(item.images[0].url, item.name, index, item.id)}}/>
                  </div>
                  </th>
                  <td> <img src={item.images[0].url} alt="Playlist Image" width="50px"/> </td>
                  <td>{ item.name }</td>
                </tr>
              )}
              </>
              );
            
            
            })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer><Button onClick={()=>{
          this.handleModal();
          if (this.props.playlistType == 'break') {
            localStorage.breakMap = JSON.stringify(Array.from(this.state.breakMap.entries()));
          } else {
            localStorage.studyMap = JSON.stringify(Array.from(this.state.studyMap.entries()));
          }
          
          window.location.reload();
        }}>Add playlist</Button></Modal.Footer>
      </Modal>
      </>
    )
  }
}

export default PlaylistModal;