import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import './FilesUpload.scss';

function FilesUpload() {
  const [fileList, setFileList] = useState([]);
  const [previewFiles, setPreviewFiles] = useState(false);

  function handleUploadFile(event) {
    const list = event.target.files;
    const data = fileList;

    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        data.push(list[i]);
      }
      setPreviewFiles(true);
    }
  }

  useEffect(() => {
    setFileList(fileList);
    setPreviewFiles(previewFiles);
  },[fileList, previewFiles]);

  function onSubmit(e) {
    e.preventDefault()

    const formData = new FormData();
    fileList.map(file => {
      return (
        formData.append('uploadFile', file)
      )
    })

    axios.post(
      "http://localhost:4000/upload",
      formData
    ).then(res => {
      alert(res.data);
      if (res.data === 'Files upload') {
        setPreviewFiles(false);
        setFileList([]);
      }
    })
  }

  function deleteFile(file, e) {
    e.preventDefault();

    const name = file.name;
    setFileList(fileList.filter(file => {
      return file.name !== name
    }))

    fileList.length === 1 && setPreviewFiles(false);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <form onSubmit={onSubmit}>
          {!previewFiles ?
            <div className="form-group">
              <label className="btn btn-primary" htmlFor="upload">Upload</label>
              <input type="file" onChange={handleUploadFile} name="uploadFile" multiple id="upload"/>
            </div> :
            <div>
              <ul className="container__ul">
              {
                fileList.map(file => {
                  return (
                    <li key={file.name} className="container__list">
                        <div className="container__list-name">{file.name}</div>
                        <div className="container__list-size">{`${Math.floor(file.size / 1000)}kb`}</div>
                        <button className="container__list-button" onClick={(e) => deleteFile(file, e)}>X</button>
                    </li>
                  )
                })
              }
              </ul>
            </div>     
          }
          <div className="form-group">
            {
              previewFiles && <button className="btn btn-primary" type="submit">Upload</button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default FilesUpload;