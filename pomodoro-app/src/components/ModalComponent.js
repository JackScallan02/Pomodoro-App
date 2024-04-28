import {React, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import AvailPlaylistTable from './AvailPlaylistTableComponent.js'


class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      show:false,
      playLists: []
    }
  }
  handleModal() {
    this.setState({show:!this.state.show})
  }
  getPlaylists() {

    const apiUrl = 'https://api.spotify.com/v1/users/22acukbvk3tk5p3puyd76zxdq/playlists';
    const api_key = ''; //replace with key
    
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Bearer ${api_key}'
      }
    };

    fetch(apiUrl, requestOptions).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      this.setState({playLists:data.items}, () => {
        console.log(this.state.playLists);
      })
      
    }).catch(error=>{
      console.log('Error: ', error);
    });
  }
  
  render() {
    return (
      <>
      <Button onClick={()=>{this.handleModal(); this.getPlaylists()}}>{this.props.buttonText}</Button>
      <Modal show={this.state.show} onHide={()=>{this.handleModal()}}>
        <Modal.Header closeButton>{this.props.modalHeader}</Modal.Header>
        <Modal.Body>
          <AvailPlaylistTable playLists={this.state.playLists}/>
        </Modal.Body>
        <Modal.Footer><Button onClick={()=>{this.handleModal()}}>Add playlist</Button></Modal.Footer>
      </Modal>
      </>
    )
  }
}

export default ModalComponent;