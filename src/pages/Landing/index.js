import React, { Component } from 'react';

import './styles.css';
import api from '../../services/api';
import { Progress } from 'reactstrap';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

function Landing() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [loaded, setLoaded] = useState(0);

  function onChangeHandler(event) {
    var files = event.target.files
    // if return true allow to setState
    setSelectedFile(files);
  }

  function onClickHandler() {
    const data = new FormData()
    data.append('file', selectedFile)

    api.post("api/file/uploadFile", data, {
      onUploadProgress: ProgressEvent => {
        setLoaded((ProgressEvent.loaded / ProgressEvent.total * 100));
      },
    })
      .then(res => { // then print response status
        console.log(res);
        //toast.success('upload success')
      })
      .catch(err => { // then print response status
        //toast.error('upload fail')
      })
  }

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
              <input type="file" class="form-control" onChange={onChangeHandler} />
            </div>
            <div class="form-group">
              {/* <ToastContainer /> */}
              <Progress max="100" color="success" value={loaded} >{Math.round(loaded, 2)}%</Progress>
            </div>
            <button type="button" class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Landing;