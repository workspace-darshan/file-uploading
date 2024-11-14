import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [fileName, setFileName] = useState("");
  const [btnVisible, setBtnVisible] = useState(false);
  const [image, setImage] = useState();
  console.log("🚀 ~ App ~ image:", image)

  const handleFile = (e) => {
    setBtnVisible(true);
    setFileName(e.target.files[0]);
  };

  const handleCancel = () => {
    setFileName("");
    setBtnVisible(false);
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      if (fileName) {
        formData.append('userProfile', fileName);
      }
      await axios.post('http://localhost:5000/upload', formData);
      getData(); // Refresh image after uploading
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/uploaded-img');
      const firstImage = `http://localhost:5000/uploaded-img/uploads/userProfile/${response.data.images[0].userProfile}`;
      setImage(firstImage);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => { getData(); }, []);

  return (
    <div className="App">
      <h1>Uploaded Picture</h1>
      <div style={{ border: "1px solid", width: "200px", height: "200px" }}>
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={image}
          alt='Uploaded'
        />
      </div>
      <input onChange={handleFile} type="file" alt="upload file" />
      {btnVisible && (
        <>
          <button onClick={handleSubmit}>Upload</button>
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: "red",
              outline: "none",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default App;
