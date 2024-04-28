import React from 'react';
import ReactDOM from 'react-dom/client';
import {Button, Modal} from 'react-bootstrap';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      show:false
    }
  }
  handleModal() {
    this.setState({show:!this.state.show})
  }
  render() {
    return (
      <>
      <Button onClick={()=>{this.handleModal()}}>{this.props.buttonText}</Button>
      <Modal show={this.state.show} onHide={()=>{this.handleModal()}}>
        <Modal.Header closeButton>{this.props.modalHeader}</Modal.Header>
        <Modal.Body>List of playlists goes here</Modal.Body>
        <Modal.Footer><Button onClick={()=>{this.handleModal()}}>Add playlist</Button></Modal.Footer>
      </Modal>
      </>
    )
  }
}

export default ModalComponent