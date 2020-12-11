import React, { Component } from 'react';

import './styles.css';
import api from '../../services/api';
import { Progress } from 'reactstrap';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

function Landing() {

  this.state = {
    selectedFile: null,
    loaded: 0
  }

  onChangeHandler = event => {
    var files = event.target.files
    // if return true allow to setState
    this.setState({
      selectedFile: files,
      loaded: 0
    })
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)

    api.post("api/file/uploadFile", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      },
    })
      .then(res => { // then print response status
        console.log(res);
        //toast.success('upload success')
      })
      .catch(err => { // then print response status
        //toast.error('upload fail')
      })
  };

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">

        <div className="logo-container">

          <h2>Sua plataforma de doação de sangue</h2>
        </div>

        <div class="row">
          <div class="offset-md-3 col-md-6">
            <div class="form-group files">
              <label>Upload Your File </label>
              <input type="file" class="form-control" onChange={this.onChangeHandler} />
            </div>
            <div class="form-group">
              {/* <ToastContainer /> */}
              <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>

            </div>

            <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

          </div>

        </div>
      </div>
      </div>
  )
}

export default Landing;